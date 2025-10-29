/**
 * Book API Module for Bookhouse App
 * 
 * Fetches book data from multiple sources:
 * - Primary: Open Library API
 * - Fallback: Google Books API (for missing metadata/covers)
 * 
 * Supports searching by title, author, or ISBN.
 * Includes caching for efficient data fetching.
 * Designed for extensibility (NYT, ISBNdb, etc.).
 */

import { v4 as uuidv4 } from 'uuid';
import { Book } from './mockData';

// Extended book interface with additional metadata
export interface BookDetails extends Book {
  isbn?: string;
  publishedDate?: string;
  publisher?: string;
  description?: string;
}

// Search parameters
export interface SearchParams {
  query: string;
  searchType?: 'title' | 'author' | 'isbn' | 'general';
  limit?: number;
}

// Open Library API response types
interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  isbn?: string[];
  cover_i?: number;
  publisher?: string[];
  first_publish_year?: number;
  first_sentence?: string[];
  language?: string[];
}

interface OpenLibraryResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: OpenLibraryDoc[];
}

// Google Books API response types
interface GoogleBookVolumeInfo {
  title: string;
  authors?: string[];
  industryIdentifiers?: Array<{ type: string; identifier: string }>;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
    medium?: string;
    large?: string;
  };
  publisher?: string;
  publishedDate?: string;
  description?: string;
}

interface GoogleBookItem {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
}

interface GoogleBooksResponse {
  totalItems: number;
  items?: GoogleBookItem[];
}

// Provider interface for extensibility
interface BookProvider {
  name: string;
  search(params: SearchParams): Promise<BookDetails[]>;
}

// Helper function to create an abort signal with timeout
function createTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

// Cache implementation
class BookCache {
  private cache: Map<string, { data: BookDetails[]; timestamp: number }> = new Map();
  private readonly TTL = 60 * 60 * 1000; // 1 hour in milliseconds

  get(key: string): BookDetails[] | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  set(key: string, data: BookDetails[]): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Open Library Provider
class OpenLibraryProvider implements BookProvider {
  name = 'Open Library';

  private buildSearchQuery(params: SearchParams): string {
    const { query, searchType } = params;
    
    if (searchType === 'isbn') {
      return `isbn:${query}`;
    } else if (searchType === 'author') {
      return `author:${query}`;
    } else if (searchType === 'title') {
      return `title:${query}`;
    }
    
    // General search (default)
    return query;
  }

  private normalizeBook(doc: OpenLibraryDoc): BookDetails {
    const coverId = doc.cover_i;
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : undefined;

    // Use the first ISBN if available; fallback logic removed for clarity
    const isbn = doc.isbn?.[0];
    const author = doc.author_name?.[0] || 'Unknown Author';

    return {
      id: doc.key || `openlibrary_${doc.isbn?.[0] || uuidv4()}`,
      title: doc.title || 'Untitled',
      author,
      coverUrl: coverUrl || '',
      isbn,
      publisher: doc.publisher?.[0],
      publishedDate: doc.first_publish_year?.toString(),
      description: doc.first_sentence?.[0],
    };
  }

  async search(params: SearchParams): Promise<BookDetails[]> {
    const searchQuery = this.buildSearchQuery(params);
    const limit = params.limit || 20;
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=${limit}`;

    try {
      const response = await fetch(url, {
        // Add timeout to prevent hanging requests
        signal: createTimeoutSignal(5000), // 5 second timeout
      });

      // Handle different HTTP status codes gracefully
      if (!response.ok) {
        // Log warnings for server errors, but don't throw
        if (response.status >= 500) {
          console.warn(`Open Library API server error (${response.status}), will try fallback`);
          return [];
        }
        // For rate limiting (429), return empty and let fallback handle it
        if (response.status === 429) {
          console.warn('Open Library API rate limited, will try fallback');
          return [];
        }
        // For client errors (4xx except 429), return empty
        if (response.status >= 400) {
          console.warn(`Open Library API client error (${response.status})`);
          return [];
        }
        return [];
      }

      const data: OpenLibraryResponse = await response.json();
      
      if (!data.docs || data.docs.length === 0) {
        return [];
      }

      return data.docs.map(doc => this.normalizeBook(doc));
    } catch (error) {
      // Handle network errors, timeouts, and other fetch errors gracefully
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          console.warn('Open Library API request timeout, will try fallback');
        } else if (error.message.includes('fetch')) {
          console.warn('Open Library API network error, will try fallback');
        } else {
          console.warn('Open Library API error:', error.message);
        }
      }
      return [];
    }
  }
}

// Google Books Provider
class GoogleBooksProvider implements BookProvider {
  name = 'Google Books';

  private buildSearchQuery(params: SearchParams): string {
    const { query, searchType } = params;
    
    if (searchType === 'isbn') {
      return `isbn:${query}`;
    } else if (searchType === 'author') {
      return `inauthor:${query}`;
    } else if (searchType === 'title') {
      return `intitle:${query}`;
    }
    
    // General search (default)
    return query;
  }

  private normalizeBook(item: GoogleBookItem): BookDetails {
    const { volumeInfo } = item;
    
    const isbn13 = volumeInfo.industryIdentifiers?.find(
      id => id.type === 'ISBN_13'
    )?.identifier;
    const isbn10 = volumeInfo.industryIdentifiers?.find(
      id => id.type === 'ISBN_10'
    )?.identifier;
    const isbn = isbn13 || isbn10;

    // Prefer larger cover images, fallback to thumbnail
    const coverUrl = 
      volumeInfo.imageLinks?.large ||
      volumeInfo.imageLinks?.medium ||
      volumeInfo.imageLinks?.thumbnail ||
      volumeInfo.imageLinks?.smallThumbnail ||
      '';

    const author = volumeInfo.authors?.[0] || 'Unknown Author';

    return {
      id: item.id || `googlebooks_${isbn || uuidv4()}`,
      title: volumeInfo.title || 'Untitled',
      author,
      coverUrl,
      isbn,
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
    };
  }

  async search(params: SearchParams): Promise<BookDetails[]> {
    const searchQuery = this.buildSearchQuery(params);
    const maxResults = params.limit || 20;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}`;

    try {
      const response = await fetch(url, {
        // Add timeout to prevent hanging requests
        signal: createTimeoutSignal(5000), // 5 second timeout
      });

      // Handle different HTTP status codes gracefully
      if (!response.ok) {
        // Log warnings for server errors, but don't throw
        if (response.status >= 500) {
          console.warn(`Google Books API server error (${response.status})`);
          return [];
        }
        // For rate limiting (429), return empty
        if (response.status === 429) {
          console.warn('Google Books API rate limited');
          return [];
        }
        // For client errors (4xx except 429), return empty
        if (response.status >= 400) {
          console.warn(`Google Books API client error (${response.status})`);
          return [];
        }
        return [];
      }

      const data: GoogleBooksResponse = await response.json();
      
      if (!data.items || data.items.length === 0) {
        return [];
      }

      return data.items.map(item => this.normalizeBook(item));
    } catch (error) {
      // Handle network errors, timeouts, and other fetch errors gracefully
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          console.warn('Google Books API request timeout');
        } else if (error.message.includes('fetch')) {
          console.warn('Google Books API network error');
        } else {
          console.warn('Google Books API error:', error.message);
        }
      }
      return [];
    }
  }
}

// Main Book API class
class BookAPI {
  private cache: BookCache;
  private providers: BookProvider[];

  constructor() {
    this.cache = new BookCache();
    this.providers = [
      new OpenLibraryProvider(),
      new GoogleBooksProvider(),
    ];
  }

  /**
   * Add a new provider for extensibility
   */
  addProvider(provider: BookProvider): void {
    this.providers.push(provider);
  }

  /**
   * Generate cache key from search parameters
   */
  private getCacheKey(params: SearchParams): string {
    return `${params.searchType || 'general'}:${params.query}:${params.limit || 20}`;
  }

  /**
   * Enrich book with data from fallback providers
   */
  private async enrichBook(
    book: BookDetails,
    fallbackResults: BookDetails[]
  ): Promise<BookDetails> {
    // Find matching book in fallback results (by title and author)
    const match = fallbackResults.find(
      b => 
        b.title.toLowerCase() === book.title.toLowerCase() &&
        b.author.toLowerCase() === book.author.toLowerCase()
    );

    if (!match) return book;

    // Merge missing data
    return {
      ...book,
      coverUrl: book.coverUrl || match.coverUrl || '',
      isbn: book.isbn || match.isbn,
      publisher: book.publisher || match.publisher,
      publishedDate: book.publishedDate || match.publishedDate,
      description: book.description || match.description,
    };
  }

  /**
   * Search for books by title, author, or ISBN
   */
  async searchBooks(params: SearchParams): Promise<BookDetails[]> {
    const cacheKey = this.getCacheKey(params);
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Try primary provider (Open Library)
    const primaryResults = await this.providers[0].search(params);

    if (primaryResults.length === 0) {
      // If primary fails, try fallback providers
      for (let i = 1; i < this.providers.length; i++) {
        const results = await this.providers[i].search(params);
        if (results.length > 0) {
          this.cache.set(cacheKey, results);
          return results;
        }
      }
      return [];
    }

    // Skip automatic enrichment to avoid excessive API calls
    // Enrichment can be done on-demand when viewing book details
    // Only enrich if book has NO cover at all (not just missing description/isbn)
    const needsEnrichment = primaryResults.some(book => !book.coverUrl || book.coverUrl === '');
    
    if (needsEnrichment && this.providers.length > 1 && primaryResults.length <= 5) {
      // Only enrich if we have a small number of results (e.g., single book search)
      // For bulk searches, skip enrichment to improve performance
      const enrichedResults = await Promise.all(
        primaryResults.map(async (book) => {
          // Only enrich books with no cover
          if (!book.coverUrl || book.coverUrl === '') {
            const fallbackParams: SearchParams = {
              query: book.title,
              searchType: 'title',
              limit: 3,
            };

            const fallbackResults = await this.providers[1].search(fallbackParams);
            return this.enrichBook(book, fallbackResults);
          }

          return book;
        })
      );

      this.cache.set(cacheKey, enrichedResults);
      return enrichedResults;
    }

    // Cache and return results without enrichment for better performance
    this.cache.set(cacheKey, primaryResults);
    return primaryResults;
  }

  /**
   * Search by title
   */
  async searchByTitle(title: string, limit?: number): Promise<BookDetails[]> {
    return this.searchBooks({
      query: title,
      searchType: 'title',
      limit,
    });
  }

  /**
   * Search by author
   */
  async searchByAuthor(author: string, limit?: number): Promise<BookDetails[]> {
    return this.searchBooks({
      query: author,
      searchType: 'author',
      limit,
    });
  }

  /**
   * Search by ISBN
   */
  async searchByISBN(isbn: string): Promise<BookDetails | null> {
    const results = await this.searchBooks({
      query: isbn,
      searchType: 'isbn',
      limit: 1,
    });

    return results.length > 0 ? results[0] : null;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const bookAPI = new BookAPI();

// Export convenience functions
export const searchBooks = (params: SearchParams) => bookAPI.searchBooks(params);
export const searchByTitle = (title: string, limit?: number) => 
  bookAPI.searchByTitle(title, limit);
export const searchByAuthor = (author: string, limit?: number) => 
  bookAPI.searchByAuthor(author, limit);
export const searchByISBN = (isbn: string) => bookAPI.searchByISBN(isbn);


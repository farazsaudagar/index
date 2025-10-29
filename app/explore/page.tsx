"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import ShelfCard from "@/components/ShelfCard";
import { Typography } from "@/design-system/primitives";
import { Book } from "@/lib/mockData";
import { searchBooks, BookDetails } from "@/lib/bookApi";

export default function Explore() {
  const [forYouBooks, setForYouBooks] = useState<Book[]>([]);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);

      // Use broader category searches instead of individual book queries
      // This reduces API calls from 18 to just 3-4
      
      // Helper to normalize and filter books
      const normalizeBooks = (results: BookDetails[], max: number): Book[] => {
        return results
          .filter(book => book.coverUrl && book.coverUrl !== '')
          .slice(0, max)
          .map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            coverUrl: book.coverUrl || ''
          }));
      };

      // Create promise for "For You" section
      const forYouPromise = searchBooks({ query: "classic literature", searchType: 'general', limit: 15 })
        .then(results => {
          const books = normalizeBooks(results, 8);
          if (books.length > 0) {
            setForYouBooks(books);
          }
        })
        .catch(() => {
          // Fallback to specific classics if broad search fails
          return Promise.all([
            searchBooks({ query: "Ulysses", searchType: 'title', limit: 1 }),
            searchBooks({ query: "The Great Gatsby", searchType: 'title', limit: 1 }),
            searchBooks({ query: "1984", searchType: 'title', limit: 1 }),
            searchBooks({ query: "To Kill a Mockingbird", searchType: 'title', limit: 1 }),
            searchBooks({ query: "One Hundred Years of Solitude", searchType: 'title', limit: 1 }),
            searchBooks({ query: "The Brothers Karamazov", searchType: 'title', limit: 1 }),
            searchBooks({ query: "The Odyssey", searchType: 'title', limit: 1 }),
            searchBooks({ query: "In Search of Lost Time", searchType: 'title', limit: 1 }),
          ])
            .then(results => {
              const books = normalizeBooks(results.flat(), 8);
              if (books.length > 0) setForYouBooks(books);
            });
        });

      // Create promise for trending books
      const trendingPromise = searchBooks({ query: "bestseller 2023 2024", searchType: 'general', limit: 15 })
        .then(results => {
          const books = normalizeBooks(results, 5);
          if (books.length > 0) {
            setTrendingBooks(books);
          }
        })
        .catch(() => {
          // Fallback
          return searchBooks({ query: "popular fiction", searchType: 'general', limit: 5 })
            .then(results => {
              const books = normalizeBooks(results, 5);
              if (books.length > 0) setTrendingBooks(books);
            });
        });

      // Create promise for popular books
      const popularPromise = searchBooks({ query: "mystery thriller", searchType: 'general', limit: 15 })
        .then(results => {
          const books = normalizeBooks(results, 5);
          if (books.length > 0) {
            setPopularBooks(books);
          }
        })
        .catch(() => {
          // Fallback
          return searchBooks({ query: "popular books", searchType: 'general', limit: 5 })
            .then(results => {
              const books = normalizeBooks(results, 5);
              if (books.length > 0) setPopularBooks(books);
            });
        });

      // Wait for all promises to settle before turning off loading state
      Promise.allSettled([forYouPromise, trendingPromise, popularPromise])
        .then(() => {
          setIsLoading(false);
        });
    }

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="mx-auto px-4 py-8 max-width-main">
        {isLoading && (forYouBooks.length === 0 && trendingBooks.length === 0 && popularBooks.length === 0) ? (
          <div className="layout-loading">
            <Typography variant="h2">
              Loading books...
            </Typography>
          </div>
        ) : (
          <>
            {/* For You Section */}
            {forYouBooks.length > 0 && (
              <div className="mb-12">
                <Section title="recommended reads for you" items={forYouBooks} />
              </div>
            )}

            {/* Discover Shelves Heading */}
            {(trendingBooks.length > 0 || popularBooks.length > 0 || forYouBooks.length > 0) && (
              <Typography variant="h1" className="text-3xl mb-8 text-center">
                discover shelves that feel like you.
              </Typography>
            )}

            {/* Shelf Cards Grid */}
            {(trendingBooks.length > 0 || popularBooks.length > 0 || forYouBooks.length > 0) && (
              <div className="layout-grid-shelves">
                {trendingBooks.length > 0 && (
                  <ShelfCard name="Trending Now" books={trendingBooks} />
                )}
                {popularBooks.length > 0 && (
                  <ShelfCard name="Popular Reads" books={popularBooks} />
                )}
                {forYouBooks.length > 0 && (
                  <ShelfCard name="Classics" books={forYouBooks.slice(0, 4)} />
                )}
                {trendingBooks.length > 0 && (
                  <ShelfCard name="Editor's Picks" books={trendingBooks} />
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
}

export const forYouBooks: Book[] = [
  {
    id: "1",
    title: "JAMES JOYCE ULYSSES",
    author: "James Joyce",
    coverUrl: "https://covers.openlibrary.org/b/id/10609258-M.jpg"
  },
  {
    id: "2", 
    title: "IN SEARCH OF LOST TIME",
    author: "Marcel Proust",
    coverUrl: "https://covers.openlibrary.org/b/id/10609259-M.jpg"
  },
  {
    id: "3",
    title: "The GREAT GATSBY",
    author: "F. SCOTT FITZGERALD", 
    coverUrl: "https://covers.openlibrary.org/b/id/10609260-M.jpg"
  },
  {
    id: "4",
    title: "THE BROTHERS KARAMAZOV",
    author: "Fyodor Dostoevsky",
    coverUrl: "https://covers.openlibrary.org/b/id/10609261-M.jpg"
  },
  {
    id: "5",
    title: "THE ODYSSEY HOMER",
    author: "Homer",
    coverUrl: "https://covers.openlibrary.org/b/id/10609262-M.jpg"
  },
  {
    id: "6",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    coverUrl: "https://covers.openlibrary.org/b/id/10609263-M.jpg"
  },
  {
    id: "7",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://covers.openlibrary.org/b/id/10609264-M.jpg"
  },
  {
    id: "8",
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://covers.openlibrary.org/b/id/10609265-M.jpg"
  }
];

export const trendingBooks: Book[] = [
  {
    id: "9",
    title: "Trending Book 1",
    author: "Author 1",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  },
  {
    id: "10",
    title: "Trending Book 2",
    author: "Author 2",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  },
  {
    id: "11",
    title: "Trending Book 3",
    author: "Author 3",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  },
  {
    id: "12",
    title: "Trending Book 4",
    author: "Author 4",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  },
  {
    id: "13",
    title: "Trending Book 5",
    author: "Author 5",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  }
];

export const popularBooks: Book[] = [
  {
    id: "17",
    title: "Popular Book 1",
    author: "Author 1",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  },
  {
    id: "18",
    title: "Popular Book 2",
    author: "Author 2",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  },
  {
    id: "19",
    title: "Popular Book 3",
    author: "Author 3",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  },
  {
    id: "20",
    title: "Popular Book 4",
    author: "Author 4",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  },
  {
    id: "21",
    title: "Popular Book 5",
    author: "Author 5",
    coverUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE3OCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNzgiIGhlaWdodD0iMTkyIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPgo="
  }
];


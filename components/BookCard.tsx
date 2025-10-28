import { Book } from "@/lib/mockData";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="w-[176px] flex-shrink-0 snap-start">
      <div className="aspect-[2/3] rounded-xl bg-shelf shadow-[0_6px_20px_rgba(33,53,85,0.08)] hover:shadow-[0_8px_25px_rgba(33,53,85,0.12)] transition-shadow duration-200 focus-within:ring-2 focus-within:ring-sand/40 focus-within:ring-offset-2 focus-within:ring-offset-paper">
        <button className="w-full h-full rounded-xl overflow-hidden focus:outline-none">
          <img
            src={book.coverUrl}
            alt={`${book.title} by ${book.author}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      </div>
      <div className="mt-2 px-1">
        <h3 className="font-medium text-sm text-ink truncate">{book.title}</h3>
        <p className="text-xs text-navy/80 truncate">{book.author}</p>
      </div>
    </div>
  );
}


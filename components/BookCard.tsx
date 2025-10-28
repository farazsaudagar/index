import { Book } from "@/lib/mockData";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="w-[130px] flex-shrink-0 snap-start group relative">
      {/* Contact shadow ellipse under book */}
      <div 
        className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background: 'color-mix(in srgb, var(--accent-deep) 22%, transparent)',
          filter: 'blur(6px)',
          height: '8px',
          width: '70%',
          borderRadius: '9999px',
          zIndex: 0
        }}
      />
      
      <div 
        className="aspect-[2/3] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-sand/40 focus-within:ring-offset-2 relative"
        style={{
          boxShadow: '0 3px 6px color-mix(in srgb, var(--accent-deep) 18%, transparent)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          zIndex: 1
        }}
      >
        <button 
          className="w-full h-full overflow-hidden focus:outline-none"
          style={{
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.transform = 'translateY(-4px)';
              parent.style.boxShadow = '0 8px 12px color-mix(in srgb, var(--accent-deep) 24%, transparent)';
            }
          }}
          onMouseLeave={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.transform = 'translateY(0)';
              parent.style.boxShadow = '0 3px 6px color-mix(in srgb, var(--accent-deep) 18%, transparent)';
            }
          }}
        >
          <img
            src={book.coverUrl}
            alt={`${book.title} by ${book.author}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      </div>
      
      {/* Shadow below book */}
      <div 
        className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background: 'color-mix(in srgb, var(--accent-deep) 15%, transparent)',
          filter: 'blur(4px)',
          height: '6px',
          width: '80%',
          borderRadius: '9999px',
          zIndex: 0
        }}
      />
    </div>
  );
}


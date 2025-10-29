import { Book } from "@/lib/mockData";

interface BookFaceProps {
  book: Book;
  width: number; // px
  height: number; // px
  enableHover?: boolean; // Whether to enable hover effects
  className?: string; // Additional className for wrapper
}

const widthClassMap: Record<number, string> = {
  85: 'vars-book-small',
  130: 'vars-book-large',
};

const heightClassMap: Record<number, string> = {
  134: 'vars-book-small',
  195: 'vars-book-large',
};

export default function BookFace({ 
  book, 
  width, 
  height, 
  enableHover = true,
  className = ""
}: BookFaceProps) {
  const widthVarClass = widthClassMap[width] || '';
  const heightVarClass = heightClassMap[height] || '';
  
  return (
    <div 
      className={`relative style-dynamic-width ${widthVarClass} ${className}`}
      style={{ '--dynamic-width': `${width}px` } as React.CSSProperties}
    >
      {/* Contact shadow ellipse under book */}
      <div className="book-shadow-contact shadow-book-contact-bg" />
      
      <div 
        className={`
          book-face-container rounded-[8px] 
          style-dynamic-width style-dynamic-height 
          shadow-book-default z-[1]
          ${heightVarClass}
          ${enableHover ? 'book-hover-effect book-hover-effect-default' : ''}
        `}
        style={{ 
          '--dynamic-width': `${width}px`,
          '--dynamic-height': `${height}px`,
        } as React.CSSProperties}
      >
        {enableHover ? (
          <button className="book-button">
            <img
              src={book.coverUrl}
              alt={`${book.title} by ${book.author}`}
              className="book-image"
              loading="lazy"
            />
          </button>
        ) : (
          <img
            src={book.coverUrl}
            alt={`${book.title} by ${book.author}`}
            className="book-image"
            loading="lazy"
          />
        )}
      </div>
      
      {/* Shadow below book */}
      <div className="book-shadow-bottom shadow-book-bottom-bg z-0" />
    </div>
  );
}

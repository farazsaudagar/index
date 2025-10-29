import { ReactNode } from "react";

interface BookDeckProps {
  children: ReactNode;
  width?: number;
  marginRight?: number;
  className?: string;
}

export default function BookDeck({
  children,
  width,
  marginRight = 20,
  className = "",
}: BookDeckProps) {
  return (
    <div
      className={`
        book-deck-container 
        overflow-x-hidden-y-visible 
        ${width !== undefined ? 'style-dynamic-width' : ''}
        style-dynamic-margin-right 
        ${className}
      `}
      style={{
        ...(width !== undefined ? { '--dynamic-width': `${width}px` } : {}),
        '--dynamic-margin-right': `${marginRight}px`,
      } as React.CSSProperties}
    >
      <div className="book-deck-background shadow-book-deck" />
      <div className="relative">{children}</div>
    </div>
  );
}

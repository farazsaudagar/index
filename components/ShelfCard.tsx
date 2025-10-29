"use client";

import { Book } from "@/lib/mockData";
import { ChevronRight } from "lucide-react";
import { Avatar, IconButton, ShelfPlank, BookDeck, Typography } from "@/design-system/primitives";
import BookFace from "./BookFace";

interface ShelfCardProps {
  name: string;
  books: Book[];
  onArrowClick?: () => void;
  username?: string;
}

export default function ShelfCard({
  name,
  books,
  onArrowClick,
  username = "Reader",
}: ShelfCardProps) {
  const visible = books.slice(0, 4);
  const bookCount = visible.length;

  return (
    <div className="container-shelf-wrapper">
      <div className="container-shelf-responsive">
        <ShelfPlank hoverable>
          <div className="layout-flex-center">
            <div className="layout-flex-col-tall">
              <Avatar size="medium" username={username} showUsername />
              <Typography variant="h3" className="text-xl md:text-2xl leading-tight">
                {name}
              </Typography>
            </div>

            <div className="layout-book-deck">
              <BookDeck 
                width={0}
                marginRight={20}
                className="deck-width-calc vars-book-small vars-gap-small"
              >
                <div 
                  className="flex gap-dynamic"
                  style={{ 
                    '--dynamic-gap': '12px',
                    '--book-count': bookCount,
                  } as React.CSSProperties}
                >
                  {visible.map((book, index) => (
                    <div key={book.id} className="relative">
                      <BookFace
                        book={book}
                        width={85}
                        height={134}
                        enableHover={false}
                      />
                      {index === visible.length - 1 && (
                        <div className="fade-gradient-right fade-gradient-right-overlay" />
                      )}
                    </div>
                  ))}
                </div>
              </BookDeck>

              <IconButton
                icon={ChevronRight}
                onClick={onArrowClick}
                size="medium"
                variant="default"
                position="absolute"
                positionValue="position-right-calc"
                aria-label="More books"
                iconSize={18}
              />
            </div>
          </div>
        </ShelfPlank>
      </div>
    </div>
  );
}

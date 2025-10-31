"use client";

import { useRef, useState, useEffect } from "react";
import { Book } from "@/lib/mockData";
import { Typography } from "@/design-system/primitives";
import BookFace from "./BookFace";
import ChevronButton from "./ChevronButton";

interface SectionProps {
  title: string;
  items: Book[];
}

export default function Section({ title, items }: SectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(items.length);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const infiniteItems = [...items, ...items, ...items];

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => setCurrentIndex(items.length), 300);
    } else if (currentIndex === items.length * 2) {
      setTimeout(() => setCurrentIndex(items.length), 300);
    }
  }, [currentIndex, items.length]);

  const handleScrollLeft = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleScrollRight = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        handleScrollLeft();
        break;
      case "ArrowRight":
        e.preventDefault();
        handleScrollRight();
        break;
      case "Home":
        e.preventDefault();
        setCurrentIndex(items.length);
        break;
      case "End":
        e.preventDefault();
        setCurrentIndex(items.length + items.length - 1);
        break;
    }
  };

  return (
    <div className="mt-2">
      <Typography variant="h2" className="text-xl text-center mb-1">
        {title}
      </Typography>
      
      <div className="container-shelf-section max-width-section">
        <div className="section-wall-shadow shadow-wall z-index-negative section-wall-shadow-bg" />
        
        <div className="shelf-section-plank bg-shelf-plank section-shelf-shadow section-shelf-border">
          <div className="shelf-section-bevel bevel-gradient-section" />
          <div className="shelf-book-area bg-neutral-sand rounded-[8px] section-book-area-shadow" />
          
          <div className="section-content-wrapper">
            <div className="shelf-fade-overlay left-[40px] fade-gradient-left" />
            <div className="shelf-fade-overlay right-[40px] fade-gradient-right-inverse" />
            
            <div
              ref={trackRef}
              id={`track-${title.toLowerCase().replace(/\s+/g, '-')}`}
              className="overflow-hidden padding-section-track"
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="region"
              aria-label={`${title} books`}
            >
              <div
                className={`
                  section-track
                  calc-transform-x
                  track-width-calc
                  vars-book-large
                  vars-gap-large
                  vars-card-width
                  ${isTransitioning ? 'transition-transform-slow' : 'transition-none'}
                `}
                style={{
                  '--transform-x': `${currentIndex}`,
                  '--item-count': `${infiniteItems.length}`,
                } as React.CSSProperties}
              >
                {infiniteItems.map((book, index) => (
                  <BookFace 
                    key={`${book.id}-${index}`} 
                    book={book}
                    width={130}
                    height={195}
                    enableHover={true}
                    className="flex-shrink-0 snap-start"
                  />
                ))}
              </div>
            </div>

            <ChevronButton
              direction="left"
              onClick={handleScrollLeft}
              disabled={isTransitioning}
              ariaLabel={`Scroll ${title} left`}
            />

            <ChevronButton
              direction="right"
              onClick={handleScrollRight}
              disabled={isTransitioning}
              ariaLabel={`Scroll ${title} right`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

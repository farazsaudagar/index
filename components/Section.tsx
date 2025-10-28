"use client";

import { useRef, useState, useEffect } from "react";
import { Book } from "@/lib/mockData";
import BookCard from "./BookCard";
import ChevronButton from "./ChevronButton";

interface SectionProps {
  title: string;
  items: Book[];
}

export default function Section({ title, items }: SectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(items.length); // Start at the duplicate set
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Triple the items for seamless looping (original + duplicate + duplicate)
  const infiniteItems = [...items, ...items, ...items];

  const cardWidth = 130 + 24; // card width + gap

  // Reset position when reaching boundaries
  useEffect(() => {
    if (currentIndex === 0) {
      // Just moved to first item, jump to middle set without animation
      setTimeout(() => {
        setCurrentIndex(items.length);
      }, 300);
    } else if (currentIndex === items.length * 2) {
      // Just moved to last item, jump to middle set without animation
      setTimeout(() => {
        setCurrentIndex(items.length);
      }, 300);
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
      {/* Title above the shelf */}
      <h2 
        className="text-xl text-center mb-1"
        style={{ 
          color: 'var(--accent-deep)',
          fontFamily: 'var(--font-dm-serif)'
        }}
      >
        {title}
      </h2>
      
      {/* Shelf plank container */}
      <div 
        className="relative mx-auto"
        style={{ maxWidth: '1000px' }}
      >
        {/* Wall cast shadow */}
        <div 
          className="absolute inset-x-0 bottom-0 h-6 -bottom-4"
          style={{
            background: 'color-mix(in srgb, var(--accent-deep) 10%, transparent)',
            filter: 'blur(12px)',
            zIndex: -1
          }}
        />
        
        {/* Shelf plank - lighter outer frame */}
        <div 
          className="rounded-[12px] py-4 relative"
          style={{ 
            backgroundColor: 'var(--shelf-plank)',
            boxShadow: '0 10px 24px color-mix(in srgb, var(--accent-deep) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent-deep) 8%, transparent)'
          }}
        >
          {/* Top bevel - light catching edge */}
          <div 
            className="absolute top-0 left-0 right-0 h-[6px] rounded-t-[12px] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, color-mix(in srgb, var(--white) 55%, transparent), transparent)'
            }}
          />
          
          
          {/* Darker book area background with inner shadow */}
          <div 
            className="absolute top-[6px] bottom-[10px] left-[20px] right-[20px] pointer-events-none"
            style={{
              backgroundColor: 'var(--neutral-sand)',
              boxShadow: 'inset 0 2px 8px color-mix(in srgb, var(--accent-deep) 12%, transparent), inset 0 -2px 6px color-mix(in srgb, var(--accent-deep) 8%, transparent), inset 4px 0 8px color-mix(in srgb, var(--accent-deep) 10%, transparent), inset -4px 0 8px color-mix(in srgb, var(--accent-deep) 10%, transparent)'
            }}
          />
        <div className="relative px-[40px]">
          {/* Left fade overlay */}
          <div 
            className="absolute left-[40px] top-0 bottom-0 w-8 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, var(--neutral-sand), transparent)'
            }}
          />
          
          {/* Right fade overlay */}
          <div 
            className="absolute right-[40px] top-0 bottom-0 w-8 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to left, var(--neutral-sand), transparent)'
            }}
          />
          
          <div
            ref={trackRef}
            id={`track-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="overflow-hidden"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label={`${title} books`}
            style={{
              paddingLeft: '20px',
              paddingRight: '20px'
            }}
          >
            <div
              className="flex gap-6 px-8"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
                transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
                width: `${infiniteItems.length * cardWidth}px`
              }}
            >
              {infiniteItems.map((book, index) => (
                <BookCard key={`${book.id}-${index}`} book={book} />
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


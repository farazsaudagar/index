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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const track = trackRef.current;
    if (track) {
      track.addEventListener("scroll", checkScrollButtons);
      return () => track.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const scrollLeft = () => {
    if (trackRef.current) {
      const cardWidth = 176 + 24; // card width + gap
      trackRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      const cardWidth = 176 + 24; // card width + gap
      trackRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (trackRef.current) {
      const cardWidth = 176 + 24;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          trackRef.current.scrollBy({
            left: -cardWidth,
            behavior: "smooth",
          });
          break;
        case "ArrowRight":
          e.preventDefault();
          trackRef.current.scrollBy({
            left: cardWidth,
            behavior: "smooth",
          });
          break;
        case "Home":
          e.preventDefault();
          trackRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
          break;
        case "End":
          e.preventDefault();
          trackRef.current.scrollTo({
            left: trackRef.current.scrollWidth,
            behavior: "smooth",
          });
          break;
      }
    }
  };

  return (
    <div className="bg-shelf rounded-2xl px-6 py-5 mt-6">
      <h2 className="font-playfair text-sm uppercase tracking-[0.12em] text-navy/80 text-center mb-6">
        {title}
      </h2>
      
      <div className="relative">
        <div
          ref={trackRef}
          id={`track-${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 edge-fade"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label={`${title} books`}
          style={{
            scrollBehavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
          }}
        >
          {items.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <ChevronButton
          direction="left"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          ariaLabel={`Scroll ${title} left`}
        />

        <ChevronButton
          direction="right"
          onClick={scrollRight}
          disabled={!canScrollRight}
          ariaLabel={`Scroll ${title} right`}
        />
      </div>
    </div>
  );
}


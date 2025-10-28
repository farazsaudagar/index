"use client";

import { Book } from "@/lib/mockData";
import { User, ChevronRight } from "lucide-react";

interface ShelfCardProps {
  name: string;
  books: Book[];
  onArrowClick?: () => void;
  username?: string;
}

export default function ShelfCard({ name, books, onArrowClick, username = "Reader" }: ShelfCardProps) {
  const visible = books.slice(0, 4);

  const BOOK_W = 63;   // px
  const BOOK_H = 144;  // px
  const GAP = 12;      // px

  const deckWidth =
    visible.length > 0 ? visible.length * BOOK_W + (visible.length - 1) * GAP : 0;

  return (
    <div className="relative mt-6">
      {/* wall cast shadow */}
      <div
        className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 rounded-[20px]"
        style={{ background: "color-mix(in srgb, var(--accent-deep) 10%, transparent)", filter: "blur(12px)" }}
      />

      {/* plank */}
      <div
        className="relative rounded-[20px] px-6 py-2 transition-transform duration-200 ease-out hover:-translate-y-1"
        style={{
          backgroundColor: "var(--shelf-plank)",
          boxShadow: "0 10px 24px color-mix(in srgb, var(--accent-deep) 10%, transparent)",
          border: "1px solid color-mix(in srgb, var(--accent-deep) 8%, transparent)",
        }}
      >
        {/* thinner top bevel */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-[4px] rounded-t-[20px]"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--white) 50%, transparent), transparent)",
          }}
        />


        {/* content row */}
        <div className="relative flex items-center gap-5">
          {/* user profile section */}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: "var(--accent-deep)",
                boxShadow: "0 3px 8px color-mix(in srgb, var(--accent-deep) 20%, transparent)"
              }}
            >
              <User size={32} color="var(--base-light)" strokeWidth={2.5} />
            </div>
            <span 
              className="text-xs" 
              style={{ color: "var(--accent-deep)" }}
            >
              {username}
            </span>
          </div>

          {/* shelf name */}
          <div className="shrink-0 ml-4" style={{ width: 140 }}>
            <h3
              className="text-2xl leading-tight"
              style={{ color: "var(--accent-deep)", fontFamily: "var(--font-dm-serif)" }}
            >
              {name}
            </h3>
          </div>

          <div className="flex-1" />

          {/* right-aligned inner deck */}
          <div className="relative">
            {/* deck bg */}
            <div
              className="absolute inset-0 rounded-[12px] pointer-events-none"
              style={{
                backgroundColor: "var(--neutral-sand)",
                boxShadow:
                  "inset 0 2px 8px color-mix(in srgb, var(--accent-deep) 12%, transparent), inset 0 -2px 6px color-mix(in srgb, var(--accent-deep) 8%, transparent), inset 4px 0 8px color-mix(in srgb, var(--accent-deep) 10%, transparent), inset -4px 0 8px color-mix(in srgb, var(--accent-deep) 10%, transparent)",
              }}
            />
            <div className="relative rounded-[12px] px-3 py-4" style={{ width: deckWidth }}>
              <div className="flex" style={{ gap: GAP }}>
                {visible.map((book) => (
                  <div key={book.id} className="relative" style={{ width: BOOK_W }}>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      width={BOOK_W}
                      height={BOOK_H}
                      className="w-[63px] h-[144px] object-cover rounded-[8px]
                                 transition-transform duration-150
                                 hover:-translate-y-[4px]"
                      style={{
                        boxShadow: "0 3px 6px color-mix(in srgb, var(--accent-deep) 18%, transparent)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 10px 18px color-mix(in srgb, var(--accent-deep) 20%, transparent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 3px 6px color-mix(in srgb, var(--accent-deep) 18%, transparent)";
                      }}
                    />
                    {/* contact shadow */}
                    <div
                      className="pointer-events-none absolute left-1/2 -bottom-[4px] h-[8px] w-[70%] -translate-x-1/2 rounded-full"
                      style={{ background: "color-mix(in srgb, var(--accent-deep) 22%, transparent)", filter: "blur(6px)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* arrow */}
          <button
            type="button"
            onClick={onArrowClick}
            aria-label="More books"
            className="ml-3 grid place-items-center h-10 w-10 rounded-full hover:scale-105 transition"
            style={{
              backgroundColor: "color-mix(in srgb, var(--base-light) 85%, transparent)",
              border: "1px solid color-mix(in srgb, var(--neutral-sand) 50%, transparent)",
              color: "var(--accent-blue)",
              boxShadow: "0 2px 8px color-mix(in srgb, var(--accent-deep) 10%, transparent)"
            }}
          >
            <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("explore");
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { id: "explore", label: "explore" },
    { id: "shelves", label: "shelves" },
    { id: "community", label: "community" },
    { id: "profile", label: "profile" },
  ];

  return (
    <nav 
      className="sticky top-0 z-50" 
      style={{ backgroundColor: 'var(--gradient-top)' }}
    >
      <div className="container mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo and Navigation - Single Row */}
        <div className="flex items-center gap-6">
          <h1 
            className="text-2xl font-medium" 
            style={{ 
              color: 'var(--accent-deep)',
              fontFamily: 'var(--font-dm-serif)'
            }}
          >
            index
          </h1>
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveLink(link.id)}
                className="text-sm hover:opacity-70 transition-opacity duration-200"
                style={{ 
                  color: 'var(--accent-blue)',
                  fontFamily: 'var(--font-dm-serif)'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="search shelves, books, authors, users, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-[486px] h-[30px] px-4 pr-10 rounded-full
              bg-white text-sm
              focus:outline-none focus:ring-2 focus:ring-accent-blue/20
              transition-all duration-200
            "
            style={{ 
              color: 'var(--accent-deep)',
              fontFamily: 'var(--font-dm-serif)'
            }}
          />
          <Search 
            className="absolute right-3 top-1/2 -translate-y-1/2" 
            size={16}
            strokeWidth={2}
            style={{ color: 'var(--neutral-sand)' }}
          />
        </div>
      </div>
    </nav>
  );
}

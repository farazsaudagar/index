"use client";

import { useState } from "react";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("explore");
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { id: "index", label: "index" },
    { id: "explore", label: "explore" },
    { id: "shelves", label: "shelves" },
    { id: "community", label: "community" },
    { id: "profile", label: "profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-sand/20">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Title and Navigation */}
          <div className="flex flex-col">
            <h1 className="font-playfair text-lg font-medium text-ink mb-2">
              Home/Explore Page
            </h1>
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveLink(link.id)}
                  className={`
                    font-playfair text-sm text-ink relative
                    hover:text-navy transition-colors duration-200
                    ${activeLink === link.id 
                      ? 'text-navy after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-navy' 
                      : ''
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Search */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="search shelves, books, authors, users, etc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-80 px-4 py-2 pr-10 rounded-full
                  bg-paper border border-sand/50
                  text-sm text-ink placeholder:text-navy/60
                  focus:outline-none focus:ring-2 focus:ring-sand/40 focus:border-sand/60
                  transition-all duration-200
                "
              />
              <svg 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/60" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

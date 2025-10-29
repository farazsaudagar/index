"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Typography } from "@/design-system";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const navLinks = [
    { id: "explore", label: "explore" },
    { id: "shelves", label: "shelves" },
    { id: "community", label: "community" },
    { id: "profile", label: "profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-top">
      <div className="container mx-auto px-8 h-16 layout-flex-center">
        {/* Logo and Navigation - Single Row */}
        <div className="layout-flex-row">
          <Typography variant="h1" className="text-2xl font-medium">
            bookhouse
          </Typography>
          <div className="layout-flex-row">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveLink(link.id);
                  if (link.id === "explore") {
                    router.push("/explore");
                  }
                }}
                className="nav-link text-accent-blue font-primary"
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
            className="input-search text-accent-deep font-primary"
          />
          <Search className="icon-position-search text-neutral-sand" size={16} strokeWidth={2} />
        </div>
      </div>
    </nav>
  );
}

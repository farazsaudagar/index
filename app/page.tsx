import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import ShelfCard from "@/components/ShelfCard";
import { forYouBooks, trendingBooks, popularBooks } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="mx-auto px-4 py-8" style={{ maxWidth: '1400px' }}>
        {/* For You Section */}
        <div className="mb-12">
          <Section title="recommended reads for you" items={forYouBooks} />
        </div>

        {/* Discover Shelves Heading */}
        <h1 
          className="text-3xl mb-8 text-center"
          style={{ 
            color: 'var(--accent-deep)',
            fontFamily: 'var(--font-dm-serif)'
          }}
        >
          discover shelves that feel like you.
        </h1>

        {/* Shelf Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ShelfCard name="Shelf Name" books={trendingBooks} />
          <ShelfCard name="Shelf Name" books={popularBooks} />
          <ShelfCard name="Shelf Name" books={forYouBooks} />
          <ShelfCard name="Shelf Name" books={trendingBooks} />
        </div>
      </main>
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import { forYouBooks, trendingBooks, popularBooks } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-8 py-12">
        <h1 className="font-playfair text-xl md:text-2xl text-ink/80 mb-6 text-center">
          discover shelves that feel like you.
        </h1>
        
        <div className="space-y-16">
          <Section title="for you" items={forYouBooks} />
          <Section title="trending" items={trendingBooks} />
          <Section title="popular" items={popularBooks} />
        </div>
      </main>
    </div>
  );
}

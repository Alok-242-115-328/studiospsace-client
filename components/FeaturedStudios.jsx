"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import StudioCard from "./StudioCard";
import Link from "next/link";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("https://studiospsace-server.onrender.com/api/studios?limit=6");
        setStudios(res.data);
      } catch (error) {
        console.error("Error fetching featured studios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto mb-4 rounded-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
             {[1, 2, 3].map(n => <div key={n} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>)}
          </div>
        </div>
      </section>
    );
  }

  if (studios.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Featured Studios</h2>
            <p className="text-gray-600 dark:text-gray-400">Top rated spaces ready for your next shoot.</p>
          </div>
          <Link href="/studios" className="text-purple-700 dark:text-purple-400 font-bold hover:underline hidden md:block">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/studios" className="inline-block px-6 py-2.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold rounded-full">
            View All Studios
          </Link>
        </div>
      </div>
    </section>
  );
}
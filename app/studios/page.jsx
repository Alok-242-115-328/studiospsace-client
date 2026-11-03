"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import StudioCard from "../../components/StudioCard";
import Link from "next/link";

// useSearchParams ব্যবহার করার জন্য Suspense দিয়ে মুড়তে হয়
function ExploreStudiosContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category"); // URL থেকে ক্যাটাগরি নেওয়া

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      try {
        // URL-এ ক্যাটাগরি থাকলে সেই অনুযায়ী API কল হবে
        const url = categoryParam 
          ? `https://studiospsace-server.onrender.com/api/studios?category=${encodeURIComponent(categoryParam)}`
          : `https://studiospsace-server.onrender.com/api/studios`;
          
        const res = await axios.get(url);
        setStudios(res.data);
      } catch (error) {
        console.error("Error fetching studios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudios();
  }, [categoryParam]); // ক্যাটাগরি পরিবর্তন হলে আবার ফেচ হবে

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {categoryParam ? `${categoryParam} Studios` : "Explore Studios"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {categoryParam 
              ? `Browse our top-rated ${categoryParam} spaces.` 
              : "Find the perfect space for your creative project."}
          </p>
        </div>

        {/* Active Filter Badge (যদি ফিল্টার করা থাকে) */}
        {categoryParam && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800">
              <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                Showing: {categoryParam}
              </span>
              <Link 
                href="/studios" 
                className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
              >
                Clear Filter ✕
              </Link>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white dark:bg-gray-900 rounded-2xl h-80 animate-pulse border border-gray-100 dark:border-gray-800"></div>
            ))}
          </div>
        ) : studios.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Studios Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              We couldn't find any studios in this category yet.
            </p>
            <Link href="/studios" className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
              Show All Studios
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Export Component with Suspense
export default function ExploreStudios() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-600"></div></div>}>
      <ExploreStudiosContent />
    </Suspense>
  );
}
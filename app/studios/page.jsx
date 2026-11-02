"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import StudioCard from "../../components/StudioCard";

export default function ExploreStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const res = await axios.get("https://studiospsace-server.onrender.com/api/studios");
        setStudios(res.data);
      } catch (error) {
        console.error("Error fetching studios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudios();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Explore Studios</h1>
          <p className="text-gray-600 dark:text-gray-400">Find the perfect space for your creative project.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white dark:bg-gray-900 rounded-2xl h-80 animate-pulse border border-gray-100 dark:border-gray-800"></div>
            ))}
          </div>
        ) : studios.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Studios Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Be the first to host a space on StudioSpace!</p>
            <a href="/add-studio" className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
              Host Your Space
            </a>
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
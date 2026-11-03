"use client";

import { useAuth } from "../../context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // লগইন না থাকলে লগইন পেজে পাঠাবে
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Manage your studio listings and bookings from here.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/my-listings" className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors mb-2">My Studio Listings</h2>
            <p className="text-gray-500 dark:text-gray-400">View, edit, or delete the studios you have hosted.</p>
          </Link>

          <Link href="/my-bookings" className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors mb-2">My Bookings</h2>
            <p className="text-gray-500 dark:text-gray-400">Check your upcoming studio reservations and cancel if needed.</p>
          </Link>

          <Link href="/add-studio" className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors mb-2">Add New Studio</h2>
            <p className="text-gray-500 dark:text-gray-400">List a new creative space and start earning.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
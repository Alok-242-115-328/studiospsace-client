"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "sonner";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; 

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`https://studiospsace-server.onrender.com/api/bookings?email=${user.email}`);
        setBookings(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await axios.patch(`https://studiospsace-server.onrender.com/api/bookings/${id}`);
      toast.success("Booking cancelled successfully");
      setBookings(bookings.map(b => b._id === id ? { ...b, status: "Cancelled" } : b));
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

    const handleConfirm = async (id) => {
    try {
      await axios.patch(`https://studiospsace-server.onrender.com/api/bookings/${id}`, { status: "Confirmed" });
      toast.success("Booking confirmed successfully!");
      setBookings(bookings.map(b => b._id === id ? { ...b, status: "Confirmed" } : b));
    } catch (error) {
      // 👇 এরর মেসেজটি দেখানো হলো
      toast.error(error.response?.data?.message || "Failed to confirm booking");
      
      // 👇 যদি সার্ভার থেকে "cancelled" মেসেজ আসে, তবে UI-তেও Cancelled দেখানো হবে
      if (error.response?.data?.message.includes("cancelled")) {
        setBookings(bookings.map(b => b._id === id ? { ...b, status: "Cancelled" } : b));
      }
    }
  };





  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Please login to view your bookings</h2>
        <Link href="/login" className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700">Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">You have no bookings yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't booked any studio.</p>
            <Link href="/studios" className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700">Explore Studios</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-4 transition-colors duration-300">
                
                <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={booking.studioImage} alt={booking.studioTitle} fill className="object-cover" />
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{booking.studioTitle}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">📅 Date: {booking.date}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">⏰ Time: {booking.time}</p>
               

                  
                  {/* 👇 এই নতুন লাইনটি যোগ করুন (টোটাল প্রাইস দেখানোর জন্য) */}
                  <p className="text-purple-600 dark:text-purple-400 font-bold text-lg mt-2">
                    Total: ${booking.totalPrice}
                  </p>
                </div>


                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === "Pending" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                    booking.status === "Confirmed" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                    booking.status === "Cancelled" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}>
                    {booking.status}
                  </span>

                  {booking.status === "Pending" && (
                    <div className="flex flex-col gap-2">
                      <button onClick={() => handleConfirm(booking._id)} className="text-sm text-green-600 dark:text-green-400 font-semibold hover:underline">
                        Confirm (Host)
                      </button>
                      <button onClick={() => handleCancel(booking._id)} className="text-sm text-red-600 dark:text-red-400 font-semibold hover:underline">
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "../../../context/AuthProvider";
import { toast } from "sonner";

export default function StudioDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await axios.get(`https://studiospsace-server.onrender.com/api/studios/${id}`);
        setStudio(res.data);
      } catch (error) {
        toast.error("Studio not found!");
      } finally {
        setLoading(false);
      }
    };
    fetchStudio();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book a studio!");
      router.push("/login");
      return;
    }
    
    const bookingData = {
      studioId: studio._id,
      studioTitle: studio.title,
      studioImage: studio.image,
      userEmail: user.email,
      userName: user.name,
      date: bookingDate,
      time: bookingTime,
      totalPrice: studio.hourlyRate,
      status: "Pending"
    };

    try {
      await axios.post("https://studiospsace-server.onrender.com/api/bookings", bookingData);
      toast.success("Booking request sent successfully!");
      setIsBookingModalOpen(false);
      router.push("/my-bookings"); 
    } catch (error) {
      toast.error("Booking failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!studio) return <div className="text-center py-20 text-2xl font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-950 min-h-screen">Studio Not Found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Side: Image */}
        <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
          <Image src={studio.image} alt={studio.title} fill className="object-cover" />
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold text-sm rounded-full">
              {studio.category}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{studio.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-6">
            <p className="flex items-center gap-1"><span>📍</span> {studio.location}</p>
            <p className="flex items-center gap-1 text-yellow-500 font-bold"><span>⭐</span> {studio.rating}</p>
            <p className="flex items-center gap-1"><span>👥</span> Max {studio.maxCapacity} people</p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{studio.overview}</p>

          {/* Pricing Card */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 space-y-3 transition-colors duration-300">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Hourly Rate</span>
              <span className="text-2xl font-extrabold text-purple-700 dark:text-purple-400">${studio.hourlyRate} / hr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Security Deposit</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">${studio.securityDeposit}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
              <span className="text-gray-500 dark:text-gray-400">Host</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{studio.hostName}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-purple-500/30"
          >
            Book Workspace Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          {/* Modal Body */}
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Book this Studio</h3>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Date</label>
                <input 
                  type="date" 
                  required 
                  onChange={(e) => setBookingDate(e.target.value)} 
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Time (e.g., 10:00 AM - 02:00 PM)</label>
                <input 
                  type="text" 
                  required 
                  placeholder="10:00 AM - 12:00 PM" 
                  onChange={(e) => setBookingTime(e.target.value)} 
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 dark:placeholder-gray-500" 
                />
              </div>
              <div className="pt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                  <p className="text-xl font-bold text-purple-700 dark:text-purple-400">${studio.hourlyRate}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsBookingModalOpen(false)} 
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
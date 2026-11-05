"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "../../../context/AuthProvider";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function StudioDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);

  // বুকিং মডালের স্টেট
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("12:00 PM");

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

  // 👇 মোট ভাড়া হিসাব করার ফাংশন
  const calculateTotalPrice = () => {
    if (!studio) return 0;
    
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours + (minutes / 60);
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);
    
    if (end <= start) return studio.hourlyRate; // ভুল টাইম দিলে ১ ঘণ্টার ভাড়া
    
    const duration = end - start; 
    return (duration * studio.hourlyRate).toFixed(2); 
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book a studio!");
      router.push("/login");
      return;
    }
    
    const finalTime = `${startTime} - ${endTime}`;
    
    const bookingData = {
      studioId: studio._id,
      studioTitle: studio.title,
      studioImage: studio.image,
      userEmail: user.email,
      userName: user.name,
      date: bookingDate,
      time: finalTime,
      totalPrice: Number(calculateTotalPrice()), // 👈 ক্যালকুলেট করা প্রাইস
      status: "Pending"
    };

    try {
      await axios.post("https://studiospsace-server.onrender.com/api/bookings", bookingData);
      toast.success("Booking request sent successfully!");
      setIsBookingModalOpen(false);
      router.push("/my-bookings"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed. Try again.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950"><div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div></div>;
  }

  if (!studio) return <div className="text-center py-20 text-2xl font-bold dark:text-white bg-gray-50 dark:bg-gray-950 min-h-screen">Studio Not Found</div>;

  // গ্যালারির ছবি
  const galleryImages = [
    studio.image,
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1920&auto=format&fit=crop"
  ];


  // টাইম ড্রপডাউনের অপশন
    // 👇 ৫ মিনিট ও ৩০ মিনিটের সব অপশন
  const timeOptions = [];
  for (let h = 8; h <= 22; h++) {
    for (let m = 0; m < 60; m += 5) {  // 👈 ৫ মিনিট পর পর অপশন
      const period = h >= 12 ? "PM" : "AM";
      let displayHour = h > 12 ? h - 12 : h;
      const displayMinute = m.toString().padStart(2, "0");
      timeOptions.push(`${displayHour}:${displayMinute} ${period}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Gallery */}
        <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
          <Swiper spaceBetween={0} centeredSlides={true} autoplay={{ delay: 3000, disableOnInteraction: false }} pagination={{ clickable: true }} modules={[Autoplay, Pagination]} className="w-full h-full">
            {galleryImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image src={img} alt={`Gallery ${index}`} fill className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold text-sm rounded-full">{studio.category}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{studio.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-6">
            <p className="flex items-center gap-1"><span>📍</span> {studio.location}</p>
            <p className="flex items-center gap-1 text-yellow-500 font-bold"><span>⭐</span> {studio.rating}</p>
            <p className="flex items-center gap-1"><span>👥</span> Max {studio.maxCapacity} people</p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{studio.overview}</p>

          {/* Amenities */}
          {studio.amenities && studio.amenities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {studio.amenities.map((amenity, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-gray-700">✓ {amenity}</span>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Info */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 space-y-3 transition-colors">
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

          <button onClick={() => setIsBookingModalOpen(true)} className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-purple-500/30">
            Book Workspace Now
          </button>
        </div>
      </div>



      {/* 👇 Reviews Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reviews ({studio.rating})</h2>
        <div className="space-y-4">
          {[
            { name: "Raj Das", text: "Amazing studio! The lighting was perfect for my shoot.", rating: 5 },
            { name: "Sara Khan", text: "Great space, very clean and the host was super helpful.", rating: 4 }
          ].map((review, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                  <p className="text-yellow-500 text-sm">{"⭐".repeat(review.rating)}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{review.text}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Book this Studio</h3>
            <form onSubmit={handleBooking} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Date</label>
                <input type="date" required onChange={(e) => setBookingDate(e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                  <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                  <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                  {/* 👇 এখানে calculateTotalPrice() কল করা হলো */}
                  <p className="text-xl font-bold text-purple-700 dark:text-purple-400">
                    ${calculateTotalPrice()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsBookingModalOpen(false)} className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-semibold">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md">Confirm</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
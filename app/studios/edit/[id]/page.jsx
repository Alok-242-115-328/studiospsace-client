"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function EditStudioPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "", category: "Photo Studio", hourlyRate: "", securityDeposit: "", maxCapacity: "", location: "", image: "", overview: ""
  });

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await axios.get(`https://studiospsace-server.onrender.com/api/studios/${id}`);
        setFormData(res.data);
      } catch (error) {
        toast.error("Failed to load studio details");
      } finally {
        setLoading(false);
      }
    };
    fetchStudio();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formDataImg
      );
      setFormData((prev) => ({ ...prev, image: res.data.data.url }));
      toast.success("New image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        hourlyRate: Number(formData.hourlyRate),
        securityDeposit: Number(formData.securityDeposit),
        maxCapacity: Number(formData.maxCapacity),
      };
      
      await axios.put(`https://studiospsace-server.onrender.com/api/studios/${id}`, payload);
      toast.success("Studio updated successfully!");
      router.push("/my-listings");
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-950"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] auth-card shadow-xl transition-colors duration-300">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">Update Your Studio</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Studio Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="Photo Studio">Photo Studio</option>
                <option value="Sound Stage">Sound Stage</option>
                <option value="Podcast Lounge">Podcast Lounge</option>
                <option value="Music Suite">Music Suite</option>
                <option value="Art Workshop">Art Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hourly Rate ($)</label>
              <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} required className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Security Deposit ($)</label>
              <input type="number" name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} required className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Capacity</label>
              <input type="number" name="maxCapacity" value={formData.maxCapacity} onChange={handleChange} required className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>

            {/* 👇 Image URL (টেক্সট বক্স) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>

            {/* 👇 Image Upload (Browse) */}
            <div className="md:col-span-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Update Studio Image (ImgBB)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload} 
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" 
              />
              {uploading && <p className="text-sm text-purple-600 mt-2">Uploading image...</p>}
              
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                  <img src={formData.image} alt="Preview" className="h-32 w-auto rounded-lg object-cover border border-gray-200" />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detailed Overview</label>
              <textarea name="overview" value={formData.overview} onChange={handleChange} required rows="4" className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"></textarea>
            </div>
          </div>
          <button type="submit" disabled={uploading} className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors shadow-md disabled:opacity-50">
            {uploading ? "Waiting for image upload..." : "Update Studio"}
          </button>
        </form>
      </div>
    </div>
  );
}
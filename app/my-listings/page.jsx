"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "sonner";

export default function MyListingsPage() {
  const { user } = useAuth();
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studioToDelete, setStudioToDelete] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchMyStudios = async () => {
      try {
        const res = await axios.get(`https://studiospsace-server.onrender.com/api/my-studios?email=${user.email}`);
        setStudios(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyStudios();
  }, [user]);

  const confirmDelete = async () => {
    if (!studioToDelete) return;
    try {
      await axios.delete(`https://studiospsace-server.onrender.com/api/studios/${studioToDelete}`);
      toast.success("Studio deleted successfully!");
      setStudios(studios.filter(s => s._id !== studioToDelete));
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete studio");
    }
  };

  if (!user) return <div className="text-center py-20 text-xl font-bold dark:text-white">Please login to view your listings.</div>;
  if (loading) return <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-950"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Studio Listings</h1>
          <Link href="/add-studio" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">
            + Add New
          </Link>
        </div>

        {studios.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">You haven't listed any studios yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start earning by hosting your creative space.</p>
            <Link href="/add-studio" className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700">
              Add Your First Studio
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700">
                    <th className="p-4 font-semibold">Studio</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Rate</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studios.map((studio) => (
                    <tr key={studio._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={studio.image} alt={studio.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{studio.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{studio.location}</p>
                        </div>
                      </td>
                      <td className="p-4"><span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">{studio.category}</span></td>
                      <td className="p-4 font-bold text-gray-900 dark:text-white">${studio.hourlyRate}/hr</td>
                      <td className="p-4 text-center space-x-2">
                        <Link href={`/studios/edit/${studio._id}`} className="inline-block px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                          Edit
                        </Link>
                        <button 
                          onClick={() => { setStudioToDelete(studio._id); setIsDeleteModalOpen(true); }}
                          className="px-3 py-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center border border-gray-100 dark:border-gray-800">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Are you sure?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">This action cannot be undone. This will permanently delete your studio listing.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
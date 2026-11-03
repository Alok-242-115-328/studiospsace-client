"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google"; // 👈 গুগল লগইন ইম্পোর্ট

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass) => {
    return /[A-Z]/.test(pass) && /[a-z]/.test(pass) && pass.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      toast.error("Password must contain at least 1 uppercase, 1 lowercase, and be minimum 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://studiospsace-server.onrender.com/api/auth/register", formData);
      if (res.data.success) {
        toast.success("Registration successful! Please login.");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // 👇 গুগল রেজিস্ট্রেশন হ্যান্ডলার
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "https://studiospsace-server.onrender.com/api/auth/google",
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Google Signup & Login Successful!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      toast.error("Google Signup Failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] auth-card shadow-xl transition-colors duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Registration</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="John Doe" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
            <input type="url" value={formData.photoURL} onChange={(e) => setFormData({...formData, photoURL: e.target.value})} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="https://example.com/photo.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="••••••••" required />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must have 1 uppercase, 1 lowercase, min 6 chars.</p>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors shadow-md mt-2">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* 👇 গুগল বাটন সেকশন */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-full"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">Or continue with</span>
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-full"></div>
        </div>

        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Signup Failed")}
            theme="filled_black"
            shape="pill"
            text="signup_with"
            width="100%"
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link href="/login" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
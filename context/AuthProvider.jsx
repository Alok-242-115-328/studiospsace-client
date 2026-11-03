"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // পেজ লোড হলে চেক করবে কুকি আছে কি না
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://studiospsace-server.onrender.com/api/auth/me", { withCredentials: true });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        // লগইন করা নেই
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

    // আগের login ফাংশন মুছে এটি দিন
  const login = async (email, password) => {
    try {
      const res = await axios.post("https://studiospsace-server.onrender.com/api/auth/login", { email, password }, { withCredentials: true });
      if (res.data.success) {
        setUser(res.data.user);
      }
      return res.data;
    } catch (error) {
      // এরর হলে অ্যাপ ক্র্যাশ না করে মেসেজ রিটার্ন করবে
      return { 
        success: false, 
        message: error.response?.data?.message || "Login failed. Please check your credentials." 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post("https://studiospsace-server.onrender.com/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

    const updateUser = async (newName) => {
    try {
      const res = await axios.put("https://studiospsace-server.onrender.com/api/auth/profile", 
        { name: newName }, 
        { withCredentials: true }
      );
      if (res.data.success) {
        setUser({ ...user, name: newName }); // লোকাল স্টেট আপডেট
        toast.success("Name updated successfully!"); // যদি এখানে টোস্ট কল করা থাকে
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      // toast.error("Failed to update name");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
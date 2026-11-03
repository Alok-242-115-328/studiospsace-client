"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, updateUser } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

      const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    
    // updateUser ফাংশনটি কল করা হলো
    const success = await updateUser(newName);
    
    if (success) {
      toast.success("Name updated successfully!"); // 👈 এখানে টোস্ট যোগ করা হলো
      setIsModalOpen(false); 
    } else {
      toast.error("Failed to update name. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
  };






  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/studiospace_technology_logo.png" alt="Logo" width={48} height={48} className="rounded-xl object-cover" />
                <span className="text-xl md:text-2xl font-extrabold tracking-tight text-purple-900 dark:text-purple-400">
                  StudioSpace
                </span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    pathname === link.href 
                      ? "text-purple-700 dark:text-purple-400 border-b-2 border-purple-700 dark:border-purple-400 pb-1" 
                      : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side: Auth & Theme */}
            <div className="hidden md:flex items-center gap-4">
              
              <ThemeToggle /> 
              
              {user ? (
                // Authenticated State (Dropdown)
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 focus:outline-none">
                    
                    {/* Google Avatar or Initial */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-sm flex items-center justify-center bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-bold text-lg">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{user.name}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 flex flex-col">
                      <Link href="/dashboard" className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200">Dashboard</Link>
                      <Link href="/add-studio" className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200">Add New Studio</Link>
                      <Link href="/my-listings" className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200">My Studio Listings</Link>
                      <Link href="/my-bookings" className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200">My Bookings</Link>
                      
                      <button 
                        onClick={() => { setNewName(user.name); setIsModalOpen(true); setIsDropdownOpen(false); }} 
                        className="px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Rename Profile
                      </button>

                      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                     <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/30 text-sm font-bold text-red-600 dark:text-red-400">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                // Unauthenticated State (Buttons)
                <>
                  <Link href="/login" className="px-5 py-2.5 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="px-5 py-2.5 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <ThemeToggle />
               <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 focus:outline-none">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Rename Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] auth-card p-6 w-full max-w-sm shadow-2xl relative">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Update Your Name</h3>
            <form onSubmit={handleUpdateName}>
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none mb-6 text-gray-900 dark:text-white"
                placeholder="Enter new name"
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>

  );
}
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthProvider";
import { GoogleOAuthProvider } from '@react-oauth/google'; // 👈 ইম্পোর্ট নিশ্চিত করুন
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "StudioSpace — Peer-to-Peer Studio Booking",
  description: "Book creative workspaces, photography studios, and sound stages.",
};

// 👇 আপনার Client ID এখানে থাকতে হবে
const GOOGLE_CLIENT_ID = "276798488408-s6kvtma61rbess5c94kvc6k82k43eqmm.apps.googleusercontent.com";
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300`}>
        
        {/* 👇 GoogleOAuthProvider ঠিকমতো বন্ধ করা আছে কি না দেখুন */}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <Navbar />
            <main className="grow">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" richColors closeButton />
          </AuthProvider>
        </GoogleOAuthProvider>

      </body>
    </html>
  );
}
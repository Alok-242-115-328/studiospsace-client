/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // 👈 গুগলের ছবির জন্য নতুন যোগ করা হলো
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
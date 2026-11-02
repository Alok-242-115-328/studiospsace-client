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
        hostname: "ui-avatars.com", // 👈 এটি নতুন যোগ করা হলো
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
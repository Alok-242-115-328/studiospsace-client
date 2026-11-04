import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/studiospace_technology_logo.png"
                alt="StudioSpace Logo"
                width={40}
                height={40}
                className="rounded-xl object-cover"
              />
              <span className="text-2xl font-extrabold tracking-tight text-white">
                StudioSpace
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our mission is to empower creators by connecting them with the perfect creative spaces. From photography studios to sound stages, we make finding and booking your next workspace seamless.
            </p>
            <div className="pt-2">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} StudioSpace. All rights reserved.
                <br />
                <Link href="/terms" className="hover:text-white transition-colors underline decoration-gray-600 underline-offset-2">Terms of Service</Link> &bull; <Link href="/privacy" className="hover:text-white transition-colors underline decoration-gray-600 underline-offset-2">Privacy Policy</Link>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link href="/studios" className="hover:text-purple-400 transition-colors">Explore Studios</Link></li>
              <li><Link href="/how-it-works" className="hover:text-purple-400 transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link href="/add-studio" className="hover:text-purple-400 transition-colors">Host Your Space</Link></li>
            </ul>
          </div>

          {/* Column 3: Popular Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/studios?category=Photo Studio" className="hover:text-purple-400 transition-colors">Photo Studios</Link></li>
              <li><Link href="/studios?category=Sound Stage" className="hover:text-purple-400 transition-colors">Sound Stages</Link></li>
              <li><Link href="/studios?category=Podcast Lounge" className="hover:text-purple-400 transition-colors">Podcast Rooms</Link></li>
              <li><Link href="/studios?category=Music Suite" className="hover:text-purple-400 transition-colors">Music Suites</Link></li>
              <li><Link href="/studios?category=Art Workshop" className="hover:text-purple-400 transition-colors">Art Workshops</Link></li>
            </ul>
          </div>

                     {/* Newsletter Form */}
             <div>
            <form 
              className="flex flex-col gap-2 mb-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Subscribed to newsletter successfully!");
                e.target.reset();
              }}
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-sm text-white placeholder-gray-500"
                required
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold mb-3 uppercase tracking-wider text-sm">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/pngtree-facebook-icon.png" alt="Facebook" width={32} height={32} className="rounded-full object-cover" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/square-instagram-logo.png" alt="Instagram" width={32} height={32} className="rounded-full object-cover" />
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                  <Image src="/imagesxx.png" alt="X" width={32} height={32} className="rounded-full object-cover" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
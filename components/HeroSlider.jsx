"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920&auto=format&fit=crop",
    title: "Capture Your Vision",
    subtitle: "Book top-tier photography studios with professional cyclorama walls and state-of-the-art lighting equipment.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1920&auto=format&fit=crop",
    title: "Bring Stories to Life",
    subtitle: "Find massive sound stages equipped for your next big film production, complete with acoustic treatments.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1920&auto=format&fit=crop",
    title: "Broadcast Your Voice",
    subtitle: "Reserve quiet, acoustically treated podcast rooms and music suites for crystal clear audio recording.",
  },
  {
    id: 4,
    image: "/sizep1739172212_png.jpg", 
    title: "Capture Your Vision",
    subtitle: "Book top-tier photography studios with professional cyclorama walls and state-of-the-art lighting equipment.",
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full relative bg-gray-900 overflow-hidden" style={{ height: '700px' }}>
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/90 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md">
                  {slide.subtitle}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  
                  {/* Explore Studios Button with Running Border */}
                  <div className="striking-border-wrapper w-full sm:w-auto">
                    <Link href="/studios" className="striking-border-inner">
                      Explore Studios
                    </Link>
                  </div>

                  {/* Host Your Space Button */}
                  <Link
                    href="/add-studio"
                    className="px-8 py-3.5 w-full sm:w-auto rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-lg transition-all text-center"
                  >
                    Host Your Space
                  </Link>
                  
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
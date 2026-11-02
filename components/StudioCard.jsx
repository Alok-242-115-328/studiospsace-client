import Image from "next/image";
import Link from "next/link";

export default function StudioCard({ studio }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"} 
          alt={studio.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-700 dark:text-purple-300 shadow-sm">
          {studio.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{studio.title}</h3>
          <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
            <span>⭐</span> {studio.rating || 5.0}
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
          <span>📍</span> {studio.location}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-400">${studio.hourlyRate}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400"> / hr</span>
          </div>
          <Link 
            href={`/studios/${studio._id}`} 
            className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-bold rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
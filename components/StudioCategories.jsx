import Link from "next/link";

const categories = [
  { name: "Photo Studio", icon: "📸", desc: "Cyc walls & lighting" },
  { name: "Sound Stage", icon: "🎬", desc: "Massive film sets" },
  { name: "Podcast Lounge", icon: "🎙️", desc: "Acoustically treated" },
  { name: "Music Suite", icon: "🎵", desc: "Recording & mixing" },
  { name: "Art Workshop", icon: "🎨", desc: "Creative spaces" },
];

export default function StudioCategories() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Browse by Studio Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find the perfect space for your next creative project. Explore our specialized studio categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/studios?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
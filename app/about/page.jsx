export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        
        {/* About Section with Glowing Animation */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8">About StudioSpace</h1>
          {/* 👇 এখানে auth-card অ্যানিমেশনটি দেওয়া আছে */}
          <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2rem] auth-card shadow-lg">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 px-4">
              StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. 
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed px-4">
              Our mission is to empower creators by connecting them with the perfect creative spaces. From photography studios to sound stages, we make finding and booking your next workspace seamless.
            </p>
          </div>
        </div>

        {/* Developer Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Meet the Developer</h2>
          <div className="bg-white dark:bg-gray-900 p-10 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 inline-flex flex-col items-center">
            
            {/* 👇 কার্টুন অফিস ম্যান অ্যাভাটার */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 mb-5 shadow-lg bg-purple-100 dark:bg-purple-900">
              <img 
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alok&backgroundColor=9333ea&radius=50" 
                alt="Alok Talukder" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Alok Talukder</h3>
            <p className="text-purple-600 dark:text-purple-400 font-bold text-lg mb-4">Web Developer</p>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm text-center">
              Passionate web developer creating seamless digital experiences. Built with Next.js, Node.js, and MongoDB.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
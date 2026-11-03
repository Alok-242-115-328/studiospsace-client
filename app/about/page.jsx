export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">About StudioSpace</h1>
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] auth-card shadow-lg">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. 
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Our mission is to empower creators by connecting them with the perfect creative spaces. From photography studios to sound stages, we make finding and booking your next workspace seamless.
          </p>
        </div>
      </div>
    </div>
  );
}
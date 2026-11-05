export default function HowItWorks() {
  const steps = [
    { id: 1, title: "Discover Spaces", desc: "Browse through our curated list of premium creative studios.", icon: "🔍" },
    { id: 2, title: "Select Shoot Hours", desc: "Choose your desired dates and times for the booking.", icon: "📅" },
    { id: 3, title: "Book Instantly", desc: "Secure your slot with transparent pricing and instant confirmation.", icon: "⚡" },
    { id: 4, title: "Create & Produce", desc: "Show up, get creative, and bring your vision to life.", icon: "🎬" },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            How Booking Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get your creative space booked in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            // 👇 বাইরের র‍্যাপার (overflow hidden এর জন্য)
            <div key={step.id} className="relative mt-4">
              
              {/* 👇 স্টেপ নম্বর ব্যাজ (বর্ডারের বাইরে রাখা হলো) */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md z-30">
                {step.id}
              </div>

              {/* 👇 রানিং বর্ডার কন্টেইনার */}
              <div className="how-it-works-border shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                {/* 👇 ভেতরের কনটেন্ট (সাদা/কালো ব্যাকগ্রাউন্ড) */}
                <div className="how-it-works-inner p-8 text-center flex flex-col items-center justify-center h-full">
                  <div className="text-5xl mb-4 mt-2">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
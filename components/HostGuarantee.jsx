export default function HostGuarantee() {
  const guarantees = [
    { title: "Liability Protection", desc: "Comprehensive insurance coverage for your peace of mind.", icon: "🛡️" },
    { title: "Verified Profiles", desc: "Every host and creator goes through a strict verification process.", icon: "✅" },
    { title: "Equipment Safety", desc: "Strict guidelines to ensure your gear stays safe and secure.", icon: "🔒" },
    { title: "24/7 Support", desc: "Our dedicated support team is always here to help you.", icon: "🎧" },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Host Guarantee & Creator Support
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide a secure and reliable environment so you can focus on creating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guarantees.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all">
              <div className="text-4xl">{item.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
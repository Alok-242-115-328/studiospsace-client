import HowItWorks from "../../components/HowItWorks";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors duration-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">How It Works</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Simple steps to book your creative space.</p>
      </div>
      <HowItWorks />
    </div>
  );
}
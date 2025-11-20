import React from "react";
import { Leaf, Footprints, ShoppingBag, Activity, Sparkles } from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="min-h-screen px-6 py-20 bg-gradient-to-b from-white to-green-50
      dark:from-black dark:to-gray-900 transition-all"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold dark:text-white">
          Powerful Features for a Greener You 🌱
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
          Track your carbon footprint, discover eco-products, build green habits,  
          and get AI-powered sustainability insights.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {/* 🌍 Carbon Footprint Calculator */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-xl 
          border border-green-200 dark:border-gray-700 hover:scale-[1.02] transition">
          
          <div className="flex items-center gap-4 mb-4">
            <Footprints className="text-green-600" size={40} />
            <h3 className="text-2xl font-bold dark:text-white">Carbon Footprint Calculator</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            Enter your daily habits — energy use, travel, diet — and estimate  
            your total carbon emissions with visual charts & real-time analysis.
          </p>

          <button className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-xl">
            Try Calculator →
          </button>
        </div>

        {/* 🛒 Sustainable Products */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-xl 
          border border-green-200 dark:border-gray-700 hover:scale-[1.02] transition">
          
          <div className="flex items-center gap-4 mb-4">
            <ShoppingBag className="text-green-500" size={40} />
            <h3 className="text-2xl font-bold dark:text-white">Eco-Friendly Products</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            Browse curated collections of sustainable items—energy-saving appliances,
            reusable goods, organic & low-waste alternatives.
          </p>

          <button className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-xl">
            Explore Products →
          </button>
        </div>

        {/* 📊 Activity Tracking */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-xl 
          border border-green-200 dark:border-gray-700 hover:scale-[1.02] transition">
          
          <div className="flex items-center gap-4 mb-4">
            <Activity className="text-green-400" size={40} />
            <h3 className="text-2xl font-bold dark:text-white">Daily Activity Tracking</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            Track travel, electricity usage, recycling habits, water consumption,
            and get daily eco-scores based on your lifestyle.
          </p>

          <button className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-xl">
            Track Activities →
          </button>
        </div>

        {/* ⚡ Energy Optimization */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-xl 
          border border-green-200 dark:border-gray-700 hover:scale-[1.02] transition">
          
          <div className="flex items-center gap-4 mb-4">
            <Sparkles className="text-green-400" size={40} />
            <h3 className="text-2xl font-bold dark:text-white">Energy Saving Insights</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            AI analyzes your electricity patterns and suggests  
            low-cost, high-impact ways to save power & reduce bills.
          </p>

          <button className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-xl">
            See Recommendations →
          </button>
        </div>

        {/* 🌱 Eco Habit Score */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-xl 
          border border-green-200 dark:border-gray-700 hover:scale-[1.02] transition">
          
          <div className="flex items-center gap-4 mb-4">
            <Leaf className="text-green-600" size={40} />
            <h3 className="text-2xl font-bold dark:text-white">Eco Habit Score</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            Get personalized eco-score based on your recycling,  
            energy efficiency, transportation, and lifestyle patterns.
          </p>

          <button className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-xl">
            Check Your Score →
          </button>
        </div>

        {/* 🤖 AI Eco Advisor */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-xl 
          border border-green-200 dark:border-gray-700 hover:scale-[1.02] transition">
          
          <div className="flex items-center gap-4 mb-4">
            <Sparkles className="text-green-500" size={40} />
            <h3 className="text-2xl font-bold dark:text-white">AI Sustainability Guide</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            Ask anything related to climate, renewable energy, waste reduction,
            or smart sustainability habits — fully powered by AI.
          </p>

          <button className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-xl">
            Open Eco Advisor →
          </button>
        </div>

      </div>
    </section>
  );
}

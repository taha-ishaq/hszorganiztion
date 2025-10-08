"use client";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden"
      id="home"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Powering <span className="text-orange-500">Industrial Solutions</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
          Reliable engineering components and industrial supplies that keep your machines running.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/full-products"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Explore Products
          </a>
          <a
            href="#contact"
            className="border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-full font-semibold transition"
          >
            Contact Us
          </a>
        </div>
      </motion.div>

      {/* Decorative background image */}
     
    </section>
  );
};

export default Hero;

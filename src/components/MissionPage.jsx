"use client";
import { motion } from "framer-motion";

export default function MissionPage() {
  return (
    <section className="py-24 bg-gray-100 text-gray-800 min-h-screen" id="mission">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Title - Animated on desktop, static on mobile */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-16"
        >
          Our <span className="text-orange-500">Mission</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left: Text - Animated on desktop, static on mobile */}
          <div className="flex-1">
            {/* Paragraph - Static on mobile */}
            <p className="text-black text-lg leading-relaxed mb-8 md:hidden">
              Our <span className="text-orange-500">Mission</span> is to deliver high-quality products that meet and exceed customer expectations. We aim to provide exceptional service, transparent communication, and innovative solutions tailored to our customers' needs. Every product and service is crafted with care, precision, and a commitment to excellence.
            </p>
            
            {/* Paragraph - Animated on desktop */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-black text-lg leading-relaxed mb-8 hidden md:block"
            >
              Our <span className="text-orange-500">Mission</span> is to deliver high-quality products that meet and exceed customer expectations. We aim to provide exceptional service, transparent communication, and innovative solutions tailored to our customers' needs. Every product and service is crafted with care, precision, and a commitment to excellence.
            </motion.p>

            {/* Vision Box - Static on mobile */}
            <div className="bg-white/10 rounded-2xl p-6 md:hidden">
              <h3 className="text-orange-500 font-bold text-2xl mb-3">Vision</h3>
              <p className="text-black text-base leading-relaxed">
                To be the most trusted provider of industrial and consumer products, recognized for quality, reliability, and exceptional customer satisfaction.
              </p>
            </div>

            {/* Vision Box - Animated on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 rounded-2xl p-6 hidden md:block"
            >
              <h3 className="text-orange-500 font-bold text-2xl mb-3">Vision</h3>
              <p className="text-black text-base leading-relaxed">
                To be the most trusted provider of industrial and consumer products, recognized for quality, reliability, and exceptional customer satisfaction.
              </p>
            </motion.div>
          </div>

          {/* Right: Image Container - Static on mobile, animated on desktop */}
          <div className="flex-1 flex justify-center md:justify-end">
            {/* Mobile/Tablet: Completely Static Image */}
            <img
              src="/australia.png"
              alt="Map of Australia"
              className="w-full max-w-md rounded-xl border border-white/10 md:hidden"
            />
            
            {/* Desktop: Animated Container with Rotating Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:block"
            >
              <motion.img
                src="/australia.png"
                alt="Map of Australia"
                className="w-full max-w-md rounded-xl border border-white/10"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
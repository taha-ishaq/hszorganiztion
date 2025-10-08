"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MissionPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-24 bg-gray-100 text-gray-800 min-h-screen" id="mission">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Title */}
        {isDesktop ? (
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold text-center mb-16"
          >
            Our <span className="text-orange-500">Mission</span>
          </motion.h2>
        ) : (
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16">
            Our <span className="text-orange-500">Mission</span>
          </h2>
        )}

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="flex-1">
            {isDesktop ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-black text-lg leading-relaxed mb-8"
              >
                Our <span className="text-orange-500">Mission</span> is to deliver high-quality products that meet and exceed customer expectations. We aim to provide exceptional service, transparent communication, and innovative solutions tailored to our customers' needs. Every product and service is crafted with care, precision, and a commitment to excellence.
              </motion.p>
            ) : (
              <p className="text-black text-lg leading-relaxed mb-8">
                Our <span className="text-orange-500">Mission</span> is to deliver high-quality products that meet and exceed customer expectations. We aim to provide exceptional service, transparent communication, and innovative solutions tailored to our customers' needs. Every product and service is crafted with care, precision, and a commitment to excellence.
              </p>
            )}

            {/* Vision Box */}
            {isDesktop ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/10 rounded-2xl p-6"
              >
                <h3 className="text-orange-500 font-bold text-2xl mb-3">Vision</h3>
                <p className="text-black text-base leading-relaxed">
                  To be the most trusted provider of industrial and consumer products, recognized for quality, reliability, and exceptional customer satisfaction.
                </p>
              </motion.div>
            ) : (
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-orange-500 font-bold text-2xl mb-3">Vision</h3>
                <p className="text-black text-base leading-relaxed">
                  To be the most trusted provider of industrial and consumer products, recognized for quality, reliability, and exceptional customer satisfaction.
                </p>
              </div>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            {isDesktop ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.img
                  src="/australia.png"
                  alt="Map of Australia"
                  className="w-full max-w-md rounded-xl border border-white/10"
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                />
              </motion.div>
            ) : (
              <img
                src="/australia.png"
                alt="Map of Australia"
                className="w-full max-w-md rounded-xl border border-white/10"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

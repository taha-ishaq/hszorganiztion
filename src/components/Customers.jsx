"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Example testimonials with images
const testimonials = [
  {
    name: "Sarah Johnson",
    image: "/Customer1.jpg",
    feedback:
      "Amazing products! The quality exceeded my expectations and delivery was fast. The team also provided excellent guidance through the quote process. I will definitely order again!",
  },
  {
    name: "Michael Lee",
    image: "/Customer2.jpg",
    feedback:
      "The team was super helpful and professional. They answered all my questions and ensured my order arrived on time. Truly a seamless experience!",
  },
  {
    name: "Aisha Khan",
    image: "/Customer3.jpg",
    feedback:
      "Highly recommend! Customer service is top-notch, and the products are excellent. I appreciate the attention to detail and the consistent updates during the delivery process.",
  },
];

export default function TestimonialsPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-24 bg-gray-100 text-gray-800 min-h-screen" id="testimonial">
      {/* Background Neon Glowing Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400/40 blur-[120px] rounded-full animate-pulse-slow -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/30 blur-[120px] rounded-full animate-pulse-slow -z-10" />
      <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-purple-400/30 blur-[120px] rounded-full animate-pulse-slow -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        {isDesktop ? (
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold text-center mb-16"
          >
            What <span className="text-orange-500">Customers Say</span>
          </motion.h2>
        ) : (
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16">
            What <span className="text-orange-500">Customers Say</span>
          </h2>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) =>
            isDesktop ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg hover:shadow-orange-400/40 transition transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full border-2 border-orange-500 object-cover mr-4"
                  />
                  <h4 className="text-orange-500 font-semibold text-lg">{t.name}</h4>
                </div>
                <p className="text-black text-sm leading-relaxed">{t.feedback}</p>
              </motion.div>
            ) : (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full border-2 border-orange-500 object-cover mr-4"
                  />
                  <h4 className="text-orange-500 font-semibold text-lg">{t.name}</h4>
                </div>
                <p className="text-black text-sm leading-relaxed">{t.feedback}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

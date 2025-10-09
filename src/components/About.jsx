"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="about"
      className="relative py-20 bg-gray-100 text-gray-800 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {isDesktop ? (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-10"
          >
            About <span className="text-orange-500">HSZ Engineering</span>
          </motion.h2>
        ) : (
          <h2 className="text-4xl font-bold text-center mb-10">
            About <span className="text-orange-500">HSZ Engineering</span>
          </h2>
        )}

        {isDesktop ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl mx-auto text-center text-lg text-gray-600"
          >
            At HSZ Engineering Solutions, we specialize in providing premium
            industrial machine parts and engineering components. With years of
            experience and trusted suppliers, we ensure that your production line
            runs smoothly, efficiently, and reliably. Our mission is to deliver
            quality you can depend on — from precision tools to conveyor belts and
            heavy-duty machine accessories.
          </motion.p>
        ) : (
          <p className="max-w-3xl mx-auto text-center text-lg text-gray-600">
            At HSZ Engineering Solutions, we specialize in providing premium
            industrial machine parts and engineering components. With years of
            experience and trusted suppliers, we ensure that your production line
            runs smoothly, efficiently, and reliably. Our mission is to deliver
            quality you can depend on — from precision tools to conveyor belts and
            heavy-duty machine accessories.
          </p>
        )}

        <div className="mt-10 grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Quality Components",
              desc: "We only source from trusted manufacturers.",
            },
            {
              title: "Expert Support",
              desc: "Our team provides personalized technical guidance for every client.",
            },
            {
              title: "HSZ Engineering Solutions",
              desc: "A trusted Australian supplier of PTFE/Teflon® belts and industrial parts. We proudly supply Dunlop Flooring, where our belts have proven reliable and cost-effective in demanding production lines",
            },
            {
              title: "Fast Delivery",
              desc: "We ensure on-time delivery and logistics for your needs.",
            },
          ].map((item, i) =>
            isDesktop ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * i }}
                className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-orange-500">{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ) : (
              <div
                key={i}
                className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-orange-500">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default About;

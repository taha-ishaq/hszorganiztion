"use client";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-gray-100 text-gray-800 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          About <span className="text-orange-500">HSZ Engineering</span>
        </motion.h2>

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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-orange-500">
              Quality Components
            </h3>
            <p>We only source from trusted global manufacturers.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-orange-500">
              Expert Support
            </h3>
            <p>Our team provides personalized technical guidance for every client.</p>
          </div>
           <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-orange-500">
              HSZ Engineering Solutions
            </h3>
            <p>A trusted Australian supplier of PTFE/Teflon® belts and industrial parts. We proudly supply <span className="text-orange-500 font-bold">Dunlop Flooring</span>, where our belts have proven reliable and cost-effective in demanding production lines</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-orange-500">
              Fast Delivery
            </h3>
            <p>We ensure on-time delivery and logistics for your needs.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

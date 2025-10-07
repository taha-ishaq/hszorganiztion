"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      // Sends the form data to your backend API
      await axios.post("/api/contact", form);
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send. Try again!");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-gray-100 text-gray-800 overflow-hidden"
    >
      {/* Background Glowing Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400/50 rounded-full blur-[150px] animate-pulse-slow -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/40 rounded-full blur-[150px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-purple-400/40 rounded-full blur-[120px] animate-pulse-slow -z-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Get in <span className="text-orange-500">Touch</span>
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-4 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-4 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-md"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="md:col-span-2 p-4 rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-md"
            required
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition shadow-lg"
          >
            Send Message
          </button>
          {status && (
            <p className="md:col-span-2 text-center mt-2 font-medium">{status}</p>
          )}
        </motion.form>
      </div>

      {/* Tailwind custom animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;

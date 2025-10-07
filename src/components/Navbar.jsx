"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          HSZ<span className="text-orange-500">Engineering</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link href="#services" className="hover:text-orange-500 transition">Services</Link>
          <Link href="#products" className="hover:text-orange-500 transition">Products</Link>
          <Link href="#about" className="hover:text-orange-500 transition">About</Link>
          <Link href="#contact" className="hover:text-orange-500 transition">Contact</Link>
        </div>

        {/* CTA */}
        <Link
          href="#contact"
          className="hidden md:block bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Get a Quote
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
            <Link href="#services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="#products" onClick={() => setIsOpen(false)}>Products</Link>
            <Link href="#about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link
              href="#contact"
              className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

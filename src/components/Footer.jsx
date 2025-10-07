"use client";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand & Description */}
        <div className="flex flex-col items-start gap-2">
          <img
            src="/logo.svg"
            alt="HSZ Engineering Logo"
            className="w-40 md:w-48 object-contain"
          />
          <p className="text-gray-400 text-sm">
            High-quality industrial products for modern businesses. Browse our products and request a quote easily.
          </p>
          <div className="flex gap-4 mt-3 text-xl">
            <a href="#" className="hover:text-orange-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-400">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/full-products" className="hover:text-orange-500 transition">Products</a>
            </li>
            <li>
              <a href="/#about" className="hover:text-orange-500 transition">About Us</a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-orange-500 transition">Contact</a>
            </li>
            <li>
              <a href="/#faqs" className="hover:text-orange-500 transition">FAQ</a>
            </li>
            <li>
              <a href="/#mission" className="hover:text-orange-500 transition">Mission</a>
            </li>
            <li>
              <a href="/#testimonial" className="hover:text-orange-500 transition">Testimonials</a>
            </li>
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-400">Subscribe</h3>
          <p className="text-gray-400 text-sm">
            Get updates on latest products and promotions.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 flex-1"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} HSZ Engineering. All rights reserved.
      </div>
    </footer>
  );
}

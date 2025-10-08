'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
  ];
const fullWidthPages = [
  '/admin/orders',
  '/admin/products',
  '/admin',
];

const isFullWidthPage = fullWidthPages.includes(pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-extrabold text-orange-500 tracking-tight">
            Admin Panel
          </h1>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${
                  pathname === link.path
                    ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
                    : 'text-gray-700 hover:text-orange-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-lg shadow-md border-t border-gray-200"
            >
              <div className="flex flex-col items-center py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`font-medium text-base ${
                      pathname === link.path
                        ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
                        : 'text-gray-700 hover:text-orange-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content */}
      <main
        className={`flex-1 w-full ${
          isFullWidthPage
            ? 'p-0' // 🟢 orders page: full width, no padding or box
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12'
        }`}
      >
        {isFullWidthPage ? (
          // render directly for Orders
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        ) : (
          // default boxed layout
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100"
          >
            {children}
          </motion.div>
        )}
      </main>

      <footer className="bg-gray-900 text-gray-300 py-4 mt-auto text-center text-sm sm:text-base">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-orange-500 font-semibold">Industrial Admin</span> — All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
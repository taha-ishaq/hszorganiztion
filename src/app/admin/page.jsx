'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    async function loadStats() {
      const [pRes, oRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/orders'),
      ]);
      setStats({ products: pRes.data.length, orders: oRes.data.length });
    }
    loadStats();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
      {/* Background blur accent */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        style={{
          backgroundImage: 'url(/hero-industrial.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl mx-auto mb-14 px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Welcome, <span className="text-orange-500">Admin</span> 👋
        </h1>
        <p className="text-gray-300 text-base sm:text-lg">
          Manage your products, track your orders, and keep your business thriving.
        </p>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl mb-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {[
          { title: 'Total Products', value: stats.products, href: '/admin/products' },
          { title: 'Total Orders', value: stats.orders, href: '/admin/orders' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-5xl font-extrabold text-orange-500">{item.value}</h2>
            <p className="text-gray-300 mt-2 text-lg font-medium">{item.title}</p>

            {/* Animated button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <Link
                href={item.href}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
              >
                View {item.title.split(' ')[1]}
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative glow effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
    </section>
  );
}

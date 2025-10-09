"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function FullProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  // Load products
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get("/api/products");
        const data = res.data.products || res.data || [];
        setProducts(data);
        setFilteredProducts(data);

        const cats = Array.from(new Set(data.map((p) => p.category).filter(Boolean)));
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    loadProducts();
  }, []);

  // Filter products by category
  const filterByCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All Products") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === cat));
    }
  };

  const getImageSrc = (p) => {
    if (!p.image) return "/placeholder.jpg";
    if (typeof p.image === "string") return p.image;
    if (typeof p.image === "object") return p.image.url || "/placeholder.jpg";
    return "/placeholder.jpg";
  };

  return (
    <div>
      <section className="relative py-24 bg-gray-100 text-gray-800 min-h-screen">
        {/* Background accents */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full -z-10 animate-pulse" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-4xl sm:text-5xl font-extrabold mb-14 tracking-tight"
          >
            Browse <span className="text-orange-500">Products</span>
          </motion.h2>

          {/* Category Filter */}
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-orange-400">
              Browse by Category
            </h3>

            {/* Back Button: hide on small screens */}
            <button
              onClick={() => window.history.back()}
              className="mb-6 px-8 py-3 bg-gradient-to-r from-black via-gray-900 to-orange-600 hover:from-orange-700 hover:via-black hover:to-gray-900 text-white rounded-full text-base sm:text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_18px_rgba(255,120,0,0.5)] hidden sm:inline-block"
            >
              ← Back
            </button>

            {/* Mobile Dropdown */}
            <div className="sm:hidden mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => filterByCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-600 text-white focus:outline-none"
              >
                <option value="All Products">All Products</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex flex-wrap gap-4">
              <button
                onClick={() => filterByCategory("All Products")}
                className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition border ${
                  selectedCategory === "All Products"
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white/10 border-gray-300 hover:bg-white/20 text-gray-700"
                }`}
              >
                All Products
              </button>
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => filterByCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition border ${
                    selectedCategory === cat
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "bg-white/10 border-gray-300 hover:bg-white/20 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 6px 20px rgba(255,125,50,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 12 }}
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg flex flex-col hover:shadow-xl transition"
                >
                  <div className="w-full h-56 relative overflow-hidden">
                    <img
                      src={getImageSrc(p)}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-orange-500 mb-1">
                      {p.name}
                    </h3>
                    <p className="text-gray-500 text-sm italic mb-2">
                      Category: {p.category}
                    </p>
                    {p.description && (
                      <ul className="text-gray-600 text-sm mb-3 list-disc list-inside line-clamp-3">
                        {p.description.split(",").map((item, idx) => (
                          <li key={idx}>{item.trim()}</li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/product/${p._id}`}
                      className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-center transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-full py-10">
                {products.length === 0
                  ? "Loading products..."
                  : "No products found in this category."}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

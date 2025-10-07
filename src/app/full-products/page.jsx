"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FullProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load products
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get("/api/products");
        // If API returns { success: true, products: [...] }
        const data = res.data.products || res.data || [];
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories from products or hardcode them
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

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/orders", {
        productId: selected._id,
        productName: selected.name,
        customerName: form.name,
        contactMethod: "phone",
        contactInfo: form.phone,
        location: form.location,
        amount: form.quantity,
        size: "N/A",
        price: selected.price || 0,
        notes: form.message || "",
      });

      setMessage("✅ Quote request sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        quantity: 1,
        location: "",
        message: "",
      });
      setTimeout(() => {
        setSelected(null);
        setMessage("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to send quote. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Navbar/>
    <section className="relative py-24  bg-gray-100 text-gray-800 min-h-screen">
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
    className="mb-4 px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm sm:text-base font-semibold transition hidden sm:inline-block"
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
          ? "bg-orange-500 border-orange-500"
          : "bg-white/10 border-white/20 hover:bg-white/20"
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
            ? "bg-orange-500 border-orange-500"
            : "bg-white/10 border-white/20 hover:bg-white/20"
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
                className="bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="w-full h-56 relative overflow-hidden">
                  <img
                    src={getImageSrc(p)}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-orange-400 mb-1">{p.name}</h3>
                  <p className="text-orange-400 text-sm italic mb-2">{p.category}</p>
                  <p className="text-orange-400 text-sm line-clamp-2 mb-3">
                   {p.description && (
  <ul className="text-orange-400 text-sm mb-3 list-disc list-inside line-clamp-3">
    {p.description.split(",").map((item, idx) => (
      <li key={idx}>{item.trim()}</li>
    ))}
  </ul>
)}

                  </p>
                  {p.price && (
                    <p className="text-orange-500 font-bold mb-3">${p.price}</p>
                  )}
                  <button
                    onClick={() => setSelected(p)}
                    className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-all"
                  >
                    Request Quote
                  </button>
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

      {/* Quote Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-3xl p-6 md:p-10 w-full max-w-4xl relative border border-white/10 flex flex-col md:flex-row gap-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              {/* Left: Form */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-orange-400 mb-4 text-center md:text-left">
                  Request a Quote for {selected.name}
                </h3>
                <form onSubmit={handleQuoteSubmit} className="space-y-3 flex-1">
                  {/* form fields here */}
                </form>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-4 w-full bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition-all"
                >
                  Back
                </button>
              </div>

              {/* Right: Product Preview */}
              <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-white/5 rounded-2xl p-4 border border-white/10">
                <img
                  src={getImageSrc(selected)}
                  alt={selected.name}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <h4 className="text-lg font-semibold text-orange-400">{selected.name}</h4>
                <p className="text-gray-400 text-sm text-center mt-2">
              {selected.description ? (
  <ul className="text-gray-400 text-sm mt-2 list-disc list-inside">
    {selected.description.split(",").map((item, idx) => (
      <li key={idx}>{item.trim()}</li>
    ))}
  </ul>
) : (
  <p className="text-gray-400 text-sm text-center mt-2">
    Detailed specifications available upon request.
  </p>
)}

                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    <Footer/>
    </div>
  );
}

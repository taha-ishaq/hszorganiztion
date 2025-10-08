"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4); // For mobile "Load More"

  const productsPerSlide = 4;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get("/api/products");
        if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products.slice(0, 12));
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const totalSlides = Math.ceil(products.length / productsPerSlide);

  useEffect(() => {
    if (!isDesktop || totalSlides === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides, isDesktop]);

  const currentProducts = isDesktop
    ? products.slice(currentSlide * productsPerSlide, currentSlide * productsPerSlide + productsPerSlide)
    : products.slice(0, visibleCount);

  const getImageSrc = (p) => {
    if (!p.image) return "/placeholder.jpg";
    if (typeof p.image === "string") return p.image;
    if (typeof p.image === "object") return p.image.url || "/placeholder.jpg";
    return "/placeholder.jpg";
  };

  return (
    <section id="services" className="py-24 bg-gray-100 text-gray-800 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold mb-14 tracking-tight">
          Our <span className="text-orange-500">Products</span>
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center py-20">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No products found.</p>
        ) : (
          <>
            <div className="relative min-h-[320px]">
              {isDesktop ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
                  >
                    {currentProducts.map((p, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="group relative bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg flex flex-col transition-all duration-300"
                      >
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_20px_#f97316,0_0_40px_#f97316,0_0_60px_#f97316] transition-opacity duration-300"></div>
                        <div className="w-full h-56 relative overflow-hidden">
                          <img
                            src={getImageSrc(p)}
                            alt={p.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow relative z-10">
                          <h3 className="text-lg font-semibold text-orange-500 mb-1">Name:- {p.name}</h3>
                          <p className="text-orange-500 font-semibold text-sm mb-2">
                            Category: {p.category || "General"}
                          </p>
                          <p className="text-orange-500 font-bold">Descriptions:</p>
                          {p.description ? (
                            <ul className="text-black text-sm mt-2 list-disc list-inside">
                              {p.description.split(",").map((item, idx) => (
                                <li key={idx}>{item.trim()}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-400 text-sm text-center mt-2">
                              Detailed specifications available upon request.
                            </p>
                          )}
                          {p.price && (
                            <p className="text-orange-500 font-bold mb-3">Price: {p.price}$</p>
                          )}
                          <button
                            onClick={() => window.location.href = "/full-products"}
                            className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-all"
                          >
                            Get a Quote
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentProducts.map((p, i) => (
                    <div
                      key={i}
                      className="bg-white/10 border border-white/10 rounded-3xl p-5 shadow-lg flex flex-col"
                    >
                      <div className="w-full h-56 overflow-hidden rounded-xl mb-3">
                        <img
                          src={getImageSrc(p)}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-orange-500 mb-1">Name:- {p.name}</h3>
                      <p className="text-orange-500 font-semibold text-sm mb-2">
                        Category: {p.category || "General"}
                      </p>
                      <p className="text-orange-500 font-bold">Descriptions:</p>
                      {p.description ? (
                        <ul className="text-black text-sm mt-2 list-disc list-inside">
                          {p.description.split(",").map((item, idx) => (
                            <li key={idx}>{item.trim()}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 text-sm mt-2 text-center">
                          Detailed specifications available upon request.
                        </p>
                      )}
                      {p.price && <p className="text-orange-500 font-bold mb-3">Price: {p.price}$</p>}
                      <button
                        onClick={() => window.location.href = "/full-products"}
                        className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
                      >
                        Get a Quote
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isDesktop && visibleCount < products.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 4, products.length))}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition shadow-lg"
                >
                  Load More Products
                </button>
              </div>
            )}

            {isDesktop && (
              <>
                <div className="flex justify-center mt-8 gap-3">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === currentSlide
                          ? "bg-orange-500 scale-125 shadow-[0_0_10px_#f97316]"
                          : "bg-gray-500/50 hover:bg-orange-400/70"
                      }`}
                    ></button>
                  ))}
                </div>

                <div className="flex justify-center mt-10">
                  <a
                    href="/full-products"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition transform hover:scale-105 shadow-lg"
                  >
                    View All Products →
                  </a>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerName: "",
    contactMethod: "email",
    contactInfo: "",
    phone: "",
    customerLocation: "",
    amount: 1,
    notes: "",
  });

  // ✅ Safely get image source
  const getImageSrc = (p) => {
    if (!p) return "/placeholder.jpg";
    if (!p.image) return "/placeholder.jpg";
    if (typeof p.image === "string") return p.image;
    if (typeof p.image === "object") return p.image.url || "/placeholder.jpg";
    return "/placeholder.jpg";
  };

  // ✅ Fetch product data
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine email and phone into contactInfo for API
      const apiData = {
        productId: product._id,
        productName: product.name,
        customerName: formData.customerName,
        contactMethod: "email", // Fixed to email
        contactInfo: `${formData.contactInfo}${formData.phone ? ` | Phone: ${formData.phone}` : ''}`,
        customerLocation: formData.customerLocation,
        amount: formData.amount,
        notes: formData.notes,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });
      const result = await res.json();
      if (result.success) {
        alert("✅ Quote request sent successfully!");
        setFormData({
          customerName: "",
          contactMethod: "email",
          contactInfo: "",
          phone: "",
          customerLocation: "",
          amount: 1,
          notes: "",
        });
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  // ✅ Loading spinner
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <p className="text-center py-10 text-red-500 text-lg">
        Product not found
      </p>
    );

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-100 text-gray-800 overflow-hidden">
      {/* Back Button - Visible on all screens except extra small */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 sm:mb-6 px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-black via-gray-900 to-orange-600 hover:from-orange-700 hover:via-black hover:to-gray-900 text-white rounded-full text-sm xs:text-base sm:text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_18px_rgba(255,120,0,0.5)] w-auto self-start"
      >
        ← Back
      </button>

      {/* Background glow effects */}
      <div className="absolute top-5 sm:top-10 left-5 sm:left-10 md:left-20 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-orange-500/20 blur-2xl sm:blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 md:right-20 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gray-600/30 blur-2xl sm:blur-3xl rounded-full animate-pulse"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* 🖼️ Product Details Section */}
        <div className="flex flex-col items-start w-full">
          {/* Product Image */}
          <div className="relative w-full h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[400px] xl:h-[480px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(255,140,0,0.3)] sm:shadow-[0_0_25px_rgba(255,140,0,0.3)] border border-orange-600/30">
            <Image
              src={getImageSrc(product)}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>

          {/* Product Info */}
          <div className="w-full mt-4 sm:mt-6 md:mt-8">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-500 leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-700 mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg leading-relaxed">
              {product.description || "No description available for this product."}
            </p>
          </div>
        </div>

        {/* 🧾 Quote Form Section */}
        <div className="bg-white shadow-lg sm:shadow-xl md:shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-800">
            Request a Quote
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
            {/* Name Field */}
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black text-sm sm:text-base"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              required
            />

            {/* Email Field */}
            <input
              type="email"
              placeholder="Your Email (e.g., example@gmail.com)"
              className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black text-sm sm:text-base"
              value={formData.contactInfo}
              onChange={(e) =>
                setFormData({ ...formData, contactInfo: e.target.value })
              }
              required
            />

            {/* Phone Field */}
            <input
              type="text"
              placeholder="Your Phone Number"
              className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black text-sm sm:text-base"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            {/* Location Field */}
            <input
              type="text"
              placeholder="Your Location"
              className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black text-sm sm:text-base"
              value={formData.customerLocation}
              onChange={(e) =>
                setFormData({ ...formData, customerLocation: e.target.value })
              }
              required
            />

            {/* Quantity Field */}
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black text-sm sm:text-base"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseInt(e.target.value) || 1,
                })
              }
            />

            {/* Message Textarea */}
            <textarea
              placeholder="Additional Message"
              rows={3}
              className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black text-sm sm:text-base resize-none"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-gray-900 hover:from-orange-500 hover:to-gray-800 text-white py-2 sm:py-3 rounded-lg font-semibold tracking-wide text-sm sm:text-base shadow-[0_0_10px_rgba(255,140,0,0.3)] sm:shadow-[0_0_15px_rgba(255,140,0,0.3)] hover:shadow-[0_0_20px_rgba(255,140,0,0.6)] transition-all duration-300"
            >
              Submit Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
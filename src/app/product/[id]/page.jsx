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

    <section className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 sm:px-6 lg:px-10 py-20 bg-gray-100 text-gray-800 overflow-hidden">
     <button
    onClick={() => window.history.back()}
    className="mb-6 px-8 py-3 bg-gradient-to-r from-black via-gray-900 to-orange-600 hover:from-orange-700 hover:via-black hover:to-gray-900 text-white rounded-full text-base sm:text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_18px_rgba(255,120,0,0.5)] hidden sm:inline-block"
      >
    ← Back
       </button>
      {/* background glow */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-gray-600/30 blur-3xl rounded-full animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* 🖼️ Product Details */}
        <div className="flex flex-col items-start">
          <div className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,140,0,0.3)] border border-orange-600/30">
            <Image
              src={getImageSrc(product)}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-5xl font-extrabold mt-8 text-orange-500">
            {product.name}
          </h1>

          <p className="text-gray-700 mt-5 text-lg leading-relaxed">
            {product.description || "No description available for this product."}
          </p>
        </div>

        {/* 🧾 Quote Form */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Request a Quote
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Your Email (e.g., example@gmail.com)"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black"
              value={formData.contactInfo}
              onChange={(e) =>
                setFormData({ ...formData, contactInfo: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Your Phone Number"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Your Location"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black"
              value={formData.customerLocation}
              onChange={(e) =>
                setFormData({ ...formData, customerLocation: e.target.value })
              }
              required
            />

            <input
              type="number"
              min="1"
              placeholder="Quantity"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseInt(e.target.value) || 1,
                })
              }
            />

            <textarea
              placeholder="Additional Message"
              rows={4}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-black resize-none"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-gray-900 hover:from-orange-500 hover:to-gray-800 text-white py-3 rounded-lg font-semibold tracking-wide shadow-[0_0_15px_rgba(255,140,0,0.3)] hover:shadow-[0_0_25px_rgba(255,140,0,0.6)] transition-all duration-300"
            >
              Submit Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
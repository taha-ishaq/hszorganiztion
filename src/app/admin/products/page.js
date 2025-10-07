'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2, Edit2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Load products & categories
  const load = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.products || res.data); // support old response format
      setCategories(res.data.categories || [
        "cutters and blade",
        "belts",
        "teflon products",
        "metal belts",
        "dust collection",
      ]);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // File to base64
  const toBase64 = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = (err) => rej(err);
    });

  // Handle Upload
  const handleProductUpload = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.category)
      return alert("Please fill all required fields.");
    const base64 = await toBase64(newProduct.image);
    await axios.post("/api/products", {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      imageBase64: base64,
    });
    setNewProduct({ name: "", description: "", price: "", image: null, category: "" });
    load();
  };

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await axios.delete(`/api/products?id=${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Edit product (prefill form)
  const handleEdit = (product) => {
    setEditingId(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category || "",
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category)
      return alert("Please fill all required fields.");

    let payload = {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
    };

    if (newProduct.image) {
      payload.imageBase64 = await toBase64(newProduct.image);
    }

    try {
      await axios.patch(`/api/products?id=${editingId}`, payload);
      setEditingId(null);
      setNewProduct({ name: "", description: "", price: "", image: null, category: "" });
      load();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-4 sm:px-6 lg:px-10 py-16 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Manage <span className="text-orange-500">Products</span>
        </h1>
        <p className="text-gray-300 mt-2 text-base sm:text-lg max-w-xl mx-auto">
          Add, view, edit, or delete products easily.
        </p>
      </motion.div>

      {/* Add / Edit Product Form */}
      <motion.form
        onSubmit={editingId ? handleUpdate : handleProductUpload}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-semibold text-orange-400 mb-4 text-center">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition w-full text-sm sm:text-base"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition w-full text-sm sm:text-base"
          />
        </div>

        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition text-sm sm:text-base"
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition w-full h-24 sm:h-32 text-sm sm:text-base"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition text-sm sm:text-base"
        >
          {editingId ? "Update Product" : "Upload Product"}
        </motion.button>
      </motion.form>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-16"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {products.map((p) => (
          <motion.div
            key={p._id}
            className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          >
            {p.image?.url && (
              <img
                src={p.image.url}
                alt={p.name}
                className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover"
              />
            )}

            <div className="p-4 sm:p-5 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-bold text-orange-400 truncate">
                {p.name}
              </h3>
              <p className="text-gray-400 text-sm italic mb-2">{p.category}</p> {/* Show category */}
              <p className="text-gray-300 text-sm sm:text-base mt-1 line-clamp-3 flex-grow">
                {p.description}
              </p>
              <p className="text-orange-500 font-semibold mt-3 text-base sm:text-lg">
                ${p.price}
              </p>

              {/* Edit & Delete Buttons */}
              <div className="mt-4 flex space-x-3 justify-end">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-md text-white text-sm"
                >
                  <Edit2 className="w-4 h-4" /> <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  disabled={deletingId === p._id}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white text-sm disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" /> <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Soft glowing background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-10"
        style={{
          backgroundImage: 'url(/hero-industrial.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      />
    </section>
  );
}

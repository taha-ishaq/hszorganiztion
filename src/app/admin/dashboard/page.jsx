'use client'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", image: null });

  async function load() {
    const [pRes, oRes] = await Promise.all([axios.get("/api/products"), axios.get("/api/orders")]);
    setProducts(pRes.data);
    setOrders(oRes.data);
  }

  useEffect(() => { load(); }, []);

  async function handleProductUpload(e) {
    e.preventDefault();
    const base64 = await toBase64(newProduct.image);
    await axios.post("/api/products", { 
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      imageBase64: base64,
    });
    setNewProduct({ name: "", description: "", price: "", image: null });
    load();
  }

  const toBase64 = (file) => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = (err) => rej(err);
  });

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* 🔼 Add Product Form */}
      <form onSubmit={handleProductUpload} className="bg-white shadow p-4 rounded space-y-3">
        <h2 className="text-xl font-semibold">Add New Product</h2>
        <input type="text" placeholder="Name" value={newProduct.name}
          onChange={(e)=>setNewProduct({...newProduct, name:e.target.value})}
          className="border p-2 w-full"/>
        <textarea placeholder="Description" value={newProduct.description}
          onChange={(e)=>setNewProduct({...newProduct, description:e.target.value})}
          className="border p-2 w-full"/>
        <input type="number" placeholder="Price" value={newProduct.price}
          onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})}
          className="border p-2 w-full"/>
        <input type="file" accept="image/*"
          onChange={(e)=>setNewProduct({...newProduct, image:e.target.files[0]})}
          className="border p-2 w-full"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>

      {/* Existing products grid here */}
      ...
    </div>
  );
}

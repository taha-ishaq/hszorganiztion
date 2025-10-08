"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Load orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    }
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdating(id);
      await axios.patch("/api/orders", { id, status: newStatus });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdating(null);
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      setDeleting(id);
      await axios.delete(`/api/orders?id=${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(null);
    }
  };

  // Color mapping for statuses
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 border-yellow-500/30";
      case "approved":
        return "bg-blue-500/20 border-blue-500/30";
      case "in progress":
        return "bg-orange-500/20 border-orange-500/30";
      case "completed":
        return "bg-green-500/20 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 border-red-500/30";
      default:
        return "bg-gray-800/20 border-gray-700";
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 sm:px-6 lg:px-10 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden">
      {/* Background Blur */}
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

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
          Customer <span className="text-orange-500">Quotes / Orders</span> 📦
        </h1>
        <p className="text-gray-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Manage all quote requests, update order statuses, and track customer details easily.
        </p>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-[95rem] bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-orange-500/90 text-white uppercase text-sm tracking-wide">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Location</th>
                <th className="p-4">Product</th>
                <th className="p-4">Qty</th>
                {/* <th className="p-4">Price</th> */}
                <th className="p-4">Message / Specs</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o, i) => (
                  <motion.tr
                    key={o._id || i}
                    className={`border-b border-white/10 transition-all ${getStatusColor(o.status)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    layout
                  >
                    <td className="p-4 text-xs sm:text-sm">{o._id}</td>
                    <td className="p-4 text-sm font-semibold text-white">
                      {o.customerName || "N/A"}
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium text-orange-400 capitalize">
                          {o.contactMethod}
                        </span>
                        <span className="text-gray-300 text-sm break-all">
                          {o.contactInfo}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{o.customerLocation || "-"}</td>
                    <td className="p-4 text-sm">{o.productName || "-"}</td>
                    <td className="p-4 text-sm font-semibold text-orange-400">
                      {o.amount || 1}
                    </td>
                    {/* <td className="p-4 text-sm font-semibold text-green-400">
                      ${o.price || 0}
                    </td> */}
                    <td className="p-4 text-sm text-gray-300 max-w-[300px] break-words whitespace-pre-wrap">
                      {o.notes || o.message || "-"}
                    </td>
                    <td className="p-4 text-sm">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        disabled={updating === o._id}
                        className="bg-gray-800 border border-gray-700 text-gray-200 px-3 py-1 rounded-lg focus:border-orange-500 outline-none cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(o._id)}
                        disabled={deleting === o._id}
                        className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-500/10 disabled:opacity-50"
                        title="Delete order"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-6 text-gray-300">
                    No orders found 😔
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Floating Glow Decorations */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
    </section>
  );
}

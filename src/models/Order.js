import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String,
    customerName: { type: String, required: true },
    contactMethod: {
      type: String,
      enum: ["email", "phone", "whatsapp"], // ✅ phone is valid
      required: true,
    },
    contactInfo: { type: String, required: true },
    customerLocation: String,
    amount: { type: Number, default: 1 },
    size: String,
    price: { type: Number, default: 0 }, // ✅ make sure this is included
    notes: { type: String, default: "" }, // ✅ this will store message/specs
    status: {
      type: String,
      enum: ["pending", "approved", "in progress", "completed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  name: { type: String, required: true },
  image: {
    url: String,
    public_id: String,
  },
  description: String,
  price: { type: Number, default: 0 },
  sizes: [String],
  category: {
    type: String,
    enum: [
      "cutters and blade",
      "belts",
      "teflon products",
      "metal belts",
      "dust collection",
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// ✅ force delete old model cache if it exists
delete mongoose.models.Product;

export default mongoose.model("Product", ProductSchema);

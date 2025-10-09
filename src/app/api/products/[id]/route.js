import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, context) {
  try {
    const { id } = await context.params; // ✅ fixed "params should be awaited"
    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

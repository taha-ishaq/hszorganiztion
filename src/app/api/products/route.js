import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { uploadImage } from "@/lib/cloudinary";
import { deleteImage } from "@/lib/cloudinary";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  const categories = [
    "cutters and blade",
    "belts",
    "teflon products",
    "metal belts",
    "dust filter",
  ];
  return Response.json({ products, categories });
}

export async function POST(req) {
  try {
    await connectDB();
    const { name, description, imageBase64, price, category } = await req.json();

    if (!category) return Response.json({ success: false, message: "Category is required" }, { status: 400 });

    const uploaded = imageBase64 ? await uploadImage(imageBase64) : null;

    const product = await Product.create({
      name,
      description,
      price,
      category, // save category
      image: uploaded
        ? { url: uploaded.secure_url, public_id: uploaded.public_id }
        : undefined,
    });

    return Response.json({ success: true, product });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ success: false, message: "Missing id" }, { status: 400 });

  try {
    const body = await req.json();
    const product = await Product.findById(id);
    if (!product) return Response.json({ success: false, message: "Product not found" }, { status: 404 });

    // Update fields
    if (body.name) product.name = body.name;
    if (body.description) product.description = body.description;
    if (body.price) product.price = body.price;

    // If new image uploaded, delete old image and upload new one
    if (body.imageBase64) {
      if (product.image?.public_id) {
        await deleteImage(product.image.public_id);
      }
      const uploaded = await uploadImage(body.imageBase64);
      product.image = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    }

    await product.save();

    return Response.json({ success: true, product });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ success: false, message: "Missing id" }, { status: 400 });

  try {
    const product = await Product.findById(id);
    if (!product) return Response.json({ success: false, message: "Product not found" }, { status: 404 });

    // Delete product from DB
    await Product.findByIdAndDelete(id);

    // Optional: delete image from Cloudinary
    if (product.image?.public_id) {
      await deleteImage(product.image.public_id);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
// src/app/api/orders/route.js
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

// 🟢 GET all or filtered orders
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const filter = status ? { status } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

// 🟢 POST (create new order + send email)
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // Save order with location
    const order = await Order.create({
      ...data,
      status: "pending", // default
      customerLocation: data.customerLocation || "-", // fallback if not provided
    });

    // Prepare email message
    const message = `
      <h2>New Order Received!</h2>
      <p><strong>Customer:</strong> ${data.customerName}</p>
      <p><strong>Contact:</strong> ${data.contactMethod} - ${data.contactInfo}</p>
      <p><strong>Location:</strong> ${data.customerLocation || "-"}</p>
      <p><strong>Product:</strong> ${data.productName}</p>
      <p><strong>Qty:</strong> ${data.amount}</p>
      <p><strong>Price:</strong> $${data.price}</p>
      <p><strong>Notes:</strong> ${data.notes || "-"}</p>
      <p><strong>Status:</strong> Pending</p>
    `;

    // Send email to admin
    if (process.env.ADMIN_EMAIL) {
      await sendEmail(process.env.ADMIN_EMAIL, "New Order Received", message);
    }

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// 🟢 PATCH (update status)
export async function PATCH(req) {
  await connectDB();
  const data = await req.json();
  if (!data.id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const updated = await Order.findByIdAndUpdate(
    data.id,
    { status: data.status },
    { new: true }
  );
  return NextResponse.json(updated);
}

// 🟢 DELETE (remove an order)
export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
  }

  const deleted = await Order.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Order deleted successfully" });
}

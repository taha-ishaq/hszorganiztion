// src/app/api/admin/login/route.js
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // optional fallback

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  // 1) try find admin in DB
  let admin = await Admin.findOne({ email });

  // 2) fallback to env-admin (bootstrap)
  if (!admin && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // successful bootstrap login
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
    const res = new Response(JSON.stringify({ ok: true }), { status: 200 });
    res.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`);
    return res;
  }

  if (!admin) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

  // compare hash
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

  const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
  const res = new Response(JSON.stringify({ ok: true }), { status: 200 });
  res.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`);
  return res;
}

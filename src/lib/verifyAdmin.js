// src/lib/verifyAdmin.js
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export function verifyAdminFromReq(req) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const tokenMatch = cookie.split(";").map(s => s.trim()).find(s => s.startsWith("token="));
    if (!tokenMatch) return null;
    const token = tokenMatch.split("=")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}

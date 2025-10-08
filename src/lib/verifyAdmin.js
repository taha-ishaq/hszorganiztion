import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyAdminFromReq(req) {
  try {
    const cookie = req.headers.get("cookie") || "";
    // Look for the correct cookie name
    const tokenMatch = cookie
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith("admin_token="));

    if (!tokenMatch) return null;

    const token = tokenMatch.split("=")[1];
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}
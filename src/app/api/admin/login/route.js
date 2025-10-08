import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req) {
  const { email, password } = await req.json();

  // Check against environment variables
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }

  // Create token with jose
  const token = await new SignJWT({ 
    id: "admin", 
    email: ADMIN_EMAIL 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  const res = new Response(JSON.stringify({ ok: true }), { status: 200 });

  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.headers.set(
    "Set-Cookie",
    `admin_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}${secureFlag}; SameSite=Lax`
  );

  return res;
}
// src/app/api/upload/route.js
import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary"; // use v2 directly
import formidable from "formidable";
import fs from "fs";

// Node.js runtime required for formidable
export const runtime = "nodejs";

// Disable body parsing, Next.js must not parse multipart
export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req) {
  try {
    const { files } = await parseForm(req);
    const file = files?.file;
    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    // Upload to Cloudinary using a stream
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "hsz-products", resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      fs.createReadStream(file.filepath).pipe(stream);
    });

    return new Response(JSON.stringify({ url: result.secure_url, public_id: result.public_id }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

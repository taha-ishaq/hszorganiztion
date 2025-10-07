// src/app/api/upload/route.js
import connectDB from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";
import fs from "fs";

export const runtime = "edge" ? undefined : "nodejs"; // ensure node runtime for formidable

export const config = {
  api: {
    bodyParser: false, // next.js must not parse body
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
    if (!file) return new Response(JSON.stringify({ error: "No file" }), { status: 400 });

    // upload to Cloudinary using path
    const result = await new Promise((res, rej) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "hsz_products", resource_type: "image" },
        (error, result) => {
          if (error) return rej(error);
          res(result);
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

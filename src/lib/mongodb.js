// src/lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;
if (!MONGODB_URI) throw new Error("Missing MONGO_URI");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

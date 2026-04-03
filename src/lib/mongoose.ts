import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// We check this to avoid unnecessary warnings during local builds if not provided yet.
if (!MONGODB_URI) {
  console.warn("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is strictly missing');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

import mongoose from "mongoose";

let isConnected = false; // track connection state

export default async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "CRM",
    });

    isConnected = true;
    console.log(`Database connected successfully on ${conn.connection.host}.`);
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

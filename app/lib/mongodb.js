import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  // Check if connection is already established
  if (mongoose.connection.readyState >= 1) return;

  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables!");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed");
  }
};
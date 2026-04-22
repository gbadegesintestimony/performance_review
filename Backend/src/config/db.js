import mongoose from "mongoose";

// Cache the connection state
let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing in environment variables");
    return;
  }

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    // Check if the connection state is 'connected' (1)
    isConnected = db.connections[0].readyState === 1;

    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);

    throw error;
  }
};

export default connectDB;

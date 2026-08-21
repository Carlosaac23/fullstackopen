import mongoose from "mongoose";

export async function connectToDatabase(uri) {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("error connection to MongoDB:", error.message);
    process.exit(1);
  }
}

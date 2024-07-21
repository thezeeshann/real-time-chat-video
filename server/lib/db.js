import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected succesfully");
  } catch (error) {
    console.log("Someting went wrong while database", error);
    process.exit(1);
  }
};

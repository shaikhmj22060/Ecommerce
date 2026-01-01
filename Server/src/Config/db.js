/**
 * @description:Connects the database using Mongoose
 * @function used mongoose.connect
 */

import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connnected succesfully");
  } catch (e) {
    console.error("Connection failed", e.message);
  }
};

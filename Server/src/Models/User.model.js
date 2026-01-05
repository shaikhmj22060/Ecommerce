/**
 * @desc This file Contains UserSchema using mongoose Schema, Also contains the model
 */
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minLength: [3, "Minimum 3 chracters required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 Characters"],
    },
    Role: {
      type: String,
      required: true,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", UserSchema);

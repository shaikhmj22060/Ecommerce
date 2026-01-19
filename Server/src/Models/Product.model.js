/**
 * @description this contains Product Schema
 */

import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
});

export const Product = mongoose.model("product", productSchema);

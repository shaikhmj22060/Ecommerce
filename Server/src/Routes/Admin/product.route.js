import { Router } from "express";
import { cloudinarySignature } from "../../Config/cloudinary.config.js";
import {
  createProduct,
  getProducts,
} from "../../Controller/Admin/product.controller.js";

const product = Router();

product.get("/cloudinary/signature", cloudinarySignature);
product.post("/createProduct", createProduct);
product.get("/getProducts", getProducts);
export default product;

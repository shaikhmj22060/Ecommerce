import { Router } from "express";
import { cloudinarySignature } from "../../Config/cloudinary.config.js";
import {
  createProduct,
  deletProduct,
  getProducts,
} from "../../Controller/Admin/product.controller.js";

const product = Router();

product.get("/cloudinary/signature", cloudinarySignature);
product.post("/createProduct", createProduct);
product.get("/getProducts", getProducts);
product.delete("/delete/:id", deletProduct);
export default product;

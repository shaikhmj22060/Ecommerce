import { Router } from "express";
import { cloudinarySignature } from "../../Config/cloudinary.config.js";
import { createProduct } from "../../Controller/Admin/product.controller.js";

const product = Router();

product.get("/cloudinary/signature", cloudinarySignature);
product.post("/createProduct", createProduct);
export default product;

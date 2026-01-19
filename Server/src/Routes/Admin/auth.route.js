import { Router } from "express";
import {
  adminRegister,
  Login,
} from "../../Controller/Admin/auth.controller.js";
import product from "./product.route.js";

const admin = Router();

admin.post("/register", adminRegister);
admin.post("/login", Login);
admin.use(product);
export default admin;

import { Router } from "express";
import {
  adminRegister,
  Login,
} from "../../Controller/Admin/auth.controller.js";

const admin = Router();

admin.post("/register", adminRegister);
admin.post("/login", Login);

export default admin;

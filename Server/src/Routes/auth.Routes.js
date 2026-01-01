import { Router } from "express";
import { Login, Logout, Register } from "../Controller/auth.controller.js";

const auth = Router();

auth.post("/register", Register);
auth.get("/login", Login);
auth.post("/logout", Logout);
export default auth;

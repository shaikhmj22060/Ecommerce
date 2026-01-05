import { Router } from "express";
import { Login, Register } from "../Controller/auth.controller.js";

const auth = Router();

auth.post("/register", Register);
auth.get("/login", Login);

export default auth;

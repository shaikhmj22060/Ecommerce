import { Router } from "express";
import { test } from "../Controller/test.controller.js";
import auth from "./auth.Routes.js";
import admin from "./Admin/auth.route.js";
import { Logout } from "../Controller/auth.controller.js";

const router = Router();

router.get("/", test);
router.post("/logout", Logout);
router.use("/auth", auth);
router.use("/admin", admin);
export default router;

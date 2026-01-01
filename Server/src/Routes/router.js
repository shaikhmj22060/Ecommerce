import { Router } from "express";
import { test } from "../Controller/test.controller.js";
import auth from "./auth.Routes.js";

const router = Router();

router.get("/", test);
router.use("/auth",auth)

export default router;

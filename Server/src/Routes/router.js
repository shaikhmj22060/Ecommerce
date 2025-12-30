import { Router } from "express";
import { test } from "../Controller/test.controller.js";

const router = Router();

router.get("/", test);

export default router;

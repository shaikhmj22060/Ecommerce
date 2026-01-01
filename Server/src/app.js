import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./Routes/router.js";

dotenv.config();
connectDB();
const app = express();

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

export default app;

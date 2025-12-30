import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./Routes/router.js";
const app = express();

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

export default app;

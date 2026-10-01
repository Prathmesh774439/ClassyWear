import express from "express";
import cors from "cors";
import authRouter from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";
import productRouter from "../routes/product.routes.js";
import cartRouter from "../routes/cart.route.js";

const app = express();
const allowedOrigins = [
  "https://cartburster.netlify.app",
  "http://localhost:5173",
  ...(process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

export default app;
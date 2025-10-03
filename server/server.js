import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

mongoose
  .connect(
    process.env.MONGODB_URL,{useNewUrlParser: true,
    useUnifiedTopology: true,}
  )
  .then(() => console.log("✅ MongoDB connected!!"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if DB fails
  });


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.listen(port, () => console.log(`Servere started on Port:${port}`));

app.get("/", (req, res) => res.send("API working !!"));

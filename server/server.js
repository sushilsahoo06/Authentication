import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://sushilsahoo825:Sushil8260@cluster0.keenyyn.mongodb.net"
  )
  .then(() => console.log("MongoDB connected !!"))
  .catch((error) => console.log(error));

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.listen(port, () => console.log(`Servere started on Port:${port}`));

app.get("/", (req, res) => res.send("API working !!"));

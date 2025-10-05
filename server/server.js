import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from '../server/router/auth.js';
import userouter from '../server/router/userRoute.js';

import dotenv from 'dotenv'
dotenv.config()

mongoose
  .connect(
    process.env.MONGODB_URL,{useNewUrlParser: true,
    useUnifiedTopology: true,}
  )
  .then(() => console.log("MongoDB connected!!"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  });
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.listen(port, () => console.log(`Servere started on Port:${port}`));

app.get("/", (req, res) => res.send("API working !!"));
app.use('/api/auth',router);
app.use('/api/user',userouter)


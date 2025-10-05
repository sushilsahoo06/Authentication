import express from "express"
import userVerified from '../controller/userVerified.js';
import { authMiddleware } from "../controller/Auth.js";

const userouter=express.Router();

userouter.get("/data",authMiddleware,userVerified);

export default userouter;
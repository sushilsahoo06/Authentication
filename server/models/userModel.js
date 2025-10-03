import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOTP: { type: String, default: "" },
  verifyOTPExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: Number, default: "" },
  resetOtpExpireAt: { type: Number, default: "" },
});
 const User=mongoose.model("User",userSchema)
 exports.model=User;
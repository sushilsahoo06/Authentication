import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

// Register
export const register = async (req, res) => {
  console.log("Request body:", req.body);
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Some error occurred!" });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //send mail
    await nodemailer.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Welcome to WEBDEV",
      text: `Your account has been created with email id :${email}`,
    });

    return res.status(200).json({
      success: true,
      message: "Registration successful",
      user: {
        id: savedUser._id,
        userName: savedUser.userName,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password required!",
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //sending welcome email

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: checkUser._id,
        userName: checkUser.userName,
        email: checkUser.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Unauth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already verified" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOTP = otp;
    user.verifyOTPExpireAt = Date.now() + 60 * 1000;

    const verifyUser = await user.save();

    await nodemailer.sendMail({
      from: process.env.SMTP_MAIL,
      to: verifyUser.email,
      subject: "Account verify OTP",
      text: `Your OTP is ${otp}.Verify your account using this OTP.`,
    });
    return res.status(200).json({
      success: true,
      message: "Verification OTP",
      user: {
        id: verifyUser._id,
        userName: verifyUser.userName,
        email: verifyUser.email,
      },
    });
  } catch (error) {
    console.error("Unauth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.status(202).json({
      success: false,
      message: "Missing Details",
    });
  }
  try {
    const user = await User.findById({ userId });
    if(!user){
      return res.status(202).json({
        success:false,
        message:"User not found."
      })
    }

    if(!user.verifyOTP === '' || !user.verifyOTP !== otp){
      return res.status(202).json({
        success:false,
        message:"Invalid OTP"
      })
    }


    if(user.verifyOTPExpireAt < Date.now()){
       return res.status(202).json({
        success:false,
        message:"OTP Expired"
      })
    }
    user.isAccountVerified=true;
    user.verifyOTP='';
    user.verifyOTPExpireAt=''

    const verifyUser=await user.save()
  } catch (error) {
    console.error("Unauth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

//send password reset otp
export const resetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "user not found.",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    const resetOtpUser = await user.save();

    await nodemailer.sendMail({
      from: process.env.SMTP_MAIL,
      to: resetOtpUser.email,
      subject: "Reset OTP.",
      text: `Your OTP is ${otp}.Verify your account using this OTP.`,
    });
    return res.status(200).json({
      success: true,
      message: "Verification OTP",
      user: {
        id: resetOtpUser._id,
        userName: resetOtpUser.userName,
        email: resetOtpUser.email,
      },
    });
  } catch (error) {
    console.error("Unauth Error", error);
    return res.status(500).json({
      success: false,
      message: "Invalid or Expire token.",
    });
  }
};

//Reset password
export const ResetPassword = async (req, res) => {
  const { otp, email, newPassword } = req.body;
  if (!otp || !email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP, and new password are required.",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or OTP is invalid.",
      });
    }
    if (!user.resetOtpExpireAt || user.resetOtpExpireAt !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password=hashedPassword
    user.resetOtp=null
    user.resetOtpExpireAt=null

    const savedUser=await user.save();
    await nodemailer.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Welcome to WEBDEV",
      text: "Your password has been successfully changed. If you did not initiate this change, please contact support immediately.",
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in.",
      user: {
        id: savedUser._id,
        userName: savedUser.userName,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.log("Unauth Error", error);
    return res.status(500).json({
      success: false,
      message: "Invalid or Expire token.",
    });
  }
};

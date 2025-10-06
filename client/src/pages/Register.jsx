import { assets } from "@/assets/assets";
import CommonForm from "@/components/CommonForm";
import { Button } from "@/components/ui/button";
import { loginFromControls } from "@/config";
import { AppContent } from "@/context/AppContextProvider";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setformData] = useState(initialState);
  const navigate = useNavigate();
  const { backendURL, setisLoggedin } = useContext(AppContent);

  const handleLoginSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`${backendURL}/api/auth/login`, formData);
      if (data.success) {
        setisLoggedin(true);
        navigate("/");
        toast(data.message);
      } else {
        toast.error(data.message);
      }
      console.log("Login Data:", formData);
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm-px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="w-full max-w-sm p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <p className="text-center text-sm mb-3">Login to your account</p>

        <CommonForm
          formControls={loginFromControls}
          formData={formData}
          setFormData={setformData}
          onSubmit={handleLoginSubmit} // Passing the submission handler
          buttonText={"Login"}
        />
        <p
          className="cursor-pointer text-indigo-500 mt-1"
          onClick={() => navigate("/auth/reset-password")}
        >
          Forgate Password?
        </p>

        <div>
          <p className="text-xs mt-1 text-center text-gray-900">
            Already have an Account?{" "}
            <span className="cursor-pointer underline text-indigo-500">
              <Link to="/auth/Register">Register here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

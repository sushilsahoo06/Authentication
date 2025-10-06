import { assets } from "@/assets/assets";
import CommonForm from "@/components/CommonForm";
// import { Button } from "@/components/ui/button"; // Button is no longer needed here
import { registationFromControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setformData] = useState(initialState);

  const handleLoginSubmit = (event) => {
    event.preventDefault(); // This is called by the form's onSubmit event
    console.log("Register data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm-px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="w-full max-w-sm p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>
        <p className="text-center text-sm mb-3">Create Your Account</p>

        <CommonForm
          formControls={registationFromControls}
          formData={formData}
          setFormData={setformData}
          onSubmit={handleLoginSubmit} // Passing the submission handler
          buttonText={"SignUp"}
        />
        <p className="cursor-pointer text-indigo-500 mt-1">Forgate Password?</p>

        <div>
          <p className="text-xs mt-1 text-center text-gray-900">
            Already have an Account?{" "}
            <span className="cursor-pointer underline text-indigo-500">
              <Link to="/auth/login">Login here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
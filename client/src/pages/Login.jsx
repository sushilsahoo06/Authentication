import { assets } from "@/assets/assets";
import CommonForm from "@/components/CommonForm";
import { registationFromControls } from "@/config";
import { AppContent } from "@/context/AppContextProvider";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setformData] = useState(initialState);
  console.log(formData);

  const navigate = useNavigate();
  const { backendURL, setisLoggedin,getUserData } = useContext(AppContent);

  const handleLoginSubmit = async (event) => {
    try {
      event.preventDefault();
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendURL}/api/auth/register`,
        formData,
        {
          validateStatus: () => true,
        }
      );


      if (data.success) {
        setisLoggedin(true);
        navigate("/");
        
        console.log(data.message);
        toast(data.message);
      } else {
        console.log(data.message);

        toast.error(data.message);
      }
      console.log("Register data:", formData);
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.log("Server responded with:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }
      toast.error("An error occurred during registration.");
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
        <p
          className="cursor-pointer text-indigo-500 mt-1"
          onClick={() => navigate("/auth/reset-password")}
        >
          Forgot Password?
        </p>

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

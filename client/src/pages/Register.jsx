import { assets } from '@/assets/assets';
import CommonForm from '@/components/CommonForm';
import { Button } from '@/components/ui/button';
import { loginFromControls } from '@/config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const initialState = {
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setformData] = useState(initialState);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log("Login Data:", formData);
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
          Login
        </h2>
        <p className="text-center text-sm mb-3">
          Login to your account
        </p>

        <CommonForm
          formControls={loginFromControls}
          formData={formData}
          setFormData={setformData}
          onSubmit={handleLoginSubmit} // Passing the submission handler
        />
        <p className="cursor-pointer text-indigo-500">Forgate Password?</p>
        <Button
          className="mt-3 w-full bg-white text-[#33A5C0] font-semibold hover:bg-gray-200 transition"
          type="submit"
        >
          Login
        </Button>

        <div>
          <p className="text-xs mt-1 text-center text-gray-900">
            Already have an Account?{" "}
            <span className="cursor-pointer underline text-indigo-500">
              <Link to="/auth/Register">
                Register here
              </Link>
              
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

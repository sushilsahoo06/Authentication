import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { AppContent } from "@/context/AppContextProvider";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const {setuserData, setisLoggedin, backendURL}=useContext(AppContent);
  const handlesubmit=async(event)=>{
    event.preventDefault();
  }
  return (
    <div>
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex items-center justify-center min-h-screen px-6 sm-px-0 bg-gradient-to-br from-blue-200 to-purple-400">
        <div className="w-full max-w-sm p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Reset Password.
          </h2>
          <p className="text-center text-sm mb-3">Reset your password.</p>
          <form onSubmit={handlesubmit}>
            <div className="flex justify-between mb-4">
              <input
                placeholder="Reset your password"
                type="text"
                required
                className="w-full px-5 py-2.5 text-white rounded-full bg-[#33A5C0]
             border-none outline-none focus:ring-0 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-[#33A5C0] font-semibold hover:bg-gray-200 transition"
            >
              Reset
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

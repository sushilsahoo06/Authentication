import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate=useNavigate()
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} />
      <button onClick={()=>navigate('/login')} className="flex items-center gap-2 border broder-gray-500 rounded-full px-6 py-2 hover:bg-gray-100 transition-all ">
        Login <img src={assets.arrow_icon} />
      </button>
    </div>
  );
}

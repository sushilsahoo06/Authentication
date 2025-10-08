import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "@/context/AppContextProvider";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const { userData, setuserData, setisLoggedin, backendURL } =
    useContext(AppContent);
    const logout=async()=>{
      try {
        axios.defaults.withCredentials=false;
        const {data}=await axios.post(`${backendURL}/api/auth/logout`,{ validateStatus: () => false})
        if(data.success){
          setuserData(null)
          setisLoggedin(false)
          navigate("/")
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} />
      {userData ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className="h-10 w-10">
              <Avatar className="h-full w-full cursor-pointer">
                <AvatarFallback className="h-full w-full bg-black text-white flex items-center justify-center text-lg font-semibold rounded-full">
                  {userData?.name?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="cursor-pointer ">
            <DropdownMenuLabel className="text-xl">Verify Email</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuLabel className="text-xl" onClick={logout}>Logout</DropdownMenuLabel>
            <DropdownMenuSeparator/>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={() => navigate("/auth/Register")}
          className="flex items-center gap-2 border broder-gray-500 rounded-full px-6 py-2 hover:bg-gray-100 transition-all "
        >
          Login <img src={assets.arrow_icon} />
        </button>
      )}
    </div>
  );
}

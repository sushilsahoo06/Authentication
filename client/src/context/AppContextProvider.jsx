import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setisLoggedin] = useState(false);
  const [userData, setuserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/auth/is-auth`, {
        withCredentials: true,
      });

      if (data.success) {
        setisLoggedin(true);
        getUserdata();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);
  
  const getUserdata = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/data`, {
        withCredentials: true,
      });

      if (data.success) {
        setuserData(data.userData);
      } else {
        toast(data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch user data";
      toast.error(msg);
      console.error("GetUserData Error:", error);
    }
  };
  const value = {
    backendURL,
    isLoggedin,
    setisLoggedin,
    userData,
    setuserData,
    getUserdata,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

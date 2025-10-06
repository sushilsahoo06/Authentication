import { createContext, useState } from "react";
import React from 'react'

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setisLoggedin] = useState(false)
  const [userData, setuserData] = useState(null) 

  const value = {
    backendURL,
    isLoggedin, setisLoggedin,
    userData, setuserData
  }
  
  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  )
}

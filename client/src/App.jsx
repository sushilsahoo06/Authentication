
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./components/auth/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Emailverify from "./pages/Emailverify";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,

      },
      {
        path: "send-verify-otp",
        element: <Emailverify />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Layout />,
    children: [
      {
        path: "Register",
        element: <Login />,
      },
      {
        path: "login",
        element: <Register />,
      },
      {
        path: "send-verify-otp",
        element: <Emailverify />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      
      <RouterProvider router={router} />,
      <ToastContainer position="top-right" autoClose={3000} />{" "}
    </>
  );
}

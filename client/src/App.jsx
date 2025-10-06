// import React from 'react'
// // import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Emailverify from './pages/Emailverify'
// import ResetPassword from './pages/ResetPassword'
// import Layout from './components/auth/Layout'

// // export default function App() {
// //   return (
// //     <div>
// //       <Routes>
// //         <Route path='/' element={<Home/>}/>
// //       </Routes>
// //       <Routes path="/auth" element={<Layout/>}>
// //         <Route path='/login' element={<Login/>}/>
// //         <Route path='/Email-verify' element={<Emailverify/>}/>
// //         <Route path='/Reset-Password' element={<ResetPassword/>}/>
// //       </Routes>
// //     </div>
// //   )
// // }


// // Conceptual App.jsx (or wherever you define your router)
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from './components/Navbar'




// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />, // The Layout component
//     children: [
//       {
//         // This is your main page (e.g., your Landing Page with the Navbar)
//         index: true,
//         element: <Home />,
//       },
//       {
//         // **This is the critical missing route:**
//         path: "/auth",
//         element: <Login />, // This tells the router to show the Login component
//       },
//     ],
//   },
// ]);

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <RouterProvider router={router} />
//     </>
//   );
// }

import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Layout from './components/auth/Layout'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Emailverify from './pages/Emailverify';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';


const router = createBrowserRouter([
    {
        path: '/', 
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
        ]
    },
    {
        path: '/auth',
        element: <Layout />,
        children: [
            {
                path: 'Register', 
                element: <Login />,
            },
            {
              path:"login",
              element:<Register/>
            },
            {
                path: 'email-verify', 
                element: <Emailverify />,
            },
            {
                path: 'reset-password', 
                element: <ResetPassword />,
            },
        ],
    },
]);

export default function App() {
    // ONLY ONE ROUTERPROVIDER HERE. No other router tags.
    return <RouterProvider router={router} />;
}
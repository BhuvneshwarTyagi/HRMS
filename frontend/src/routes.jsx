import { createBrowserRouter } from "react-router-dom";
import Login from "./EmployeePanel/Login/Login.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
import React from "react";
import PrivateRoute from "./PrivateRoute.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  // {
  //   path: "/HR-Dashboard",
  //   element: (
  //     <PrivateRoute>
  //       <Dashboard />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       path: "",
  //       element: <Home />,
  //     },
  //     {
  //       path: "profile",
  //       element: <ProfileRoute />,
  //     },
  //     {
  //       path: "home",
  //       element: <Home />,
  //     },
  //     {
  //       path: "employees",
  //       element: <a />,
  //     },
  //     {
  //       path: "leave",
  //       element: <Leave />,
  //     },

  //   ]
  // },





]);

export default router;
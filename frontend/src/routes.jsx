import { createBrowserRouter } from "react-router-dom";
import Login from "./EmployeePanel/Login/Login.jsx";
import React, { Suspense,lazy } from "react";
import UserManagement from "./EmployeePanel/Employees/EmployeesList.jsx";
import History from "./EmployeePanel/EmployeeLeaves.jsx/History.jsx";


const EmployeeProfile = lazy(() => import("./EmployeePanel/EmployeeRegistration.jsx"));
const EmployeeDashboard = lazy(() => import("./app.jsx"));

const TakeLeave = lazy(() => import("./EmployeePanel/Leave/TakeLeave.jsx"));

const Loading = lazy(() => import("./LoadingScreen/Loading.jsx"));
const UserProfile = lazy(() => import("./EmployeePanel/Home.jsx"));


const SuspenseWrapper = ({ children }) => (
  <Suspense
    fallback={
      <Loading />
    }
  >
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseWrapper><Login /></SuspenseWrapper>,
  },
  {
    path: "/dashboard",
    element: (

      <SuspenseWrapper>
        <EmployeeDashboard />
      </SuspenseWrapper>
    ),
    children: [
      { path: "", element: <SuspenseWrapper><UserProfile /></SuspenseWrapper> },
      { path: "profile", element: <SuspenseWrapper><UserProfile /></SuspenseWrapper> },
      { path: "home", element: <SuspenseWrapper><UserProfile /></SuspenseWrapper> },
      { path: "Employee-Registration", element: <SuspenseWrapper><EmployeeProfile /></SuspenseWrapper> },
      { path: "leave", element: <SuspenseWrapper><TakeLeave /></SuspenseWrapper> },
      { path: "employees", element: <SuspenseWrapper><UserManagement /></SuspenseWrapper> },
      { path: "employeesLeaves", element: <SuspenseWrapper><History /></SuspenseWrapper> },


    ],
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
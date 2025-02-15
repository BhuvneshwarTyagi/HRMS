import { createBrowserRouter } from "react-router-dom";
import React, { Suspense,lazy } from "react";

const PayrollScreen = lazy(() => import("./EmployeePanel/Payroll/PayrollCreate.jsx"));
const PayrollDashboard = lazy(() => import("./EmployeePanel/Payroll/SelfPayroll.jsx"));

const AttendanceScreen = lazy(() => import("./EmployeePanel/AttendanceScreen.jsx"));
const Login = lazy(() => import("./EmployeePanel/Login/Login.jsx"));

const UserManagement = lazy(() => import("./EmployeePanel/Employees/EmployeesList.jsx"));
const History = lazy(() => import("./EmployeePanel/EmployeeLeaves.jsx/History.jsx"));

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
      { path: "attendance", element: <SuspenseWrapper><AttendanceScreen /></SuspenseWrapper> },
      { path: "employee-payroll", element: <SuspenseWrapper><PayrollScreen /></SuspenseWrapper> },
      { path: "payroll", element: <SuspenseWrapper><PayrollDashboard /></SuspenseWrapper> },
    ],
  },
  {
    path: "*",
    element: <SuspenseWrapper><UserProfile /></SuspenseWrapper>,
  },

]);

export default router;
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./EmployeePanel/Navbar/navbar.jsx";
import StaffDrawer from './EmployeePanel/Drawer/Drawer';


export default function EmployeeDashboard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    return (
        <div className="flex h-screen w-screen overflow-hidden">

            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar onDrawerToggle={toggleDrawer} />
                <main className={`flex flex-row flex-grow overflow-x-hidden overflow-y-auto bg-gradient-to-b from-blue-200  transition-all duration-300 `}>
                    <div className={`flex rounded-r-3xl border border-r-gray-400 mobile:max-laptop:absolute   z-20  overflow-auto  flex-shrink-0 transition-all duration-300 mobile:max-tablet:mt-2 ${isDrawerOpen ? 'w-64 h-full' : 'w-0'} overflow-y-auto no-scrollbar`}>
                        <StaffDrawer isOpen={isDrawerOpen} />
                    </div>
                    <div className="w-full px-3 py-4 flex-grow  overflow-auto mobile:max-tablet:p-2 mobile:max-tablet:py-2">

                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
import React, { useContext, useState } from 'react';
import ExpansionTile from "./ExpansionTile";
import menuItems from "./helper.js";
import AuthContext from '../../Context/AuthContext.jsx';


export default function StaffDrawer({ isOpen }) {

    const { authState } = useContext(AuthContext);
    const [active, setActive] = useState(null);


    const handleClick = (index) => {
        setActive(index);
    }

    return (
        <div className={`${isOpen ? 'w-64' : 'w-0'} transition-all no-scrollbar border duration-300 h-screen overflow-y-auto shadow-lg bg-gradient-to-b from-blue-100 to-white`}>
            <div className="py-5 ">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Employee Panel</h2>
                <div className="space-y-2 px-1">
                    {menuItems.map((menuItem, index) => (

                        (menuItem.title === "View All Employees" || menuItem.title === "View Employees Leaves" || menuItem.title === "Register New Employee" || menuItem.title === "Employee Payroll")
                            ?
                            authState.userDetails.HR && 
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className={`cursor-pointer rounded-lg transition-colors duration-200 ${active === index ? 'bg-blue-400' : 'hover:bg-blue-200'}`}
                            >
                                <ExpansionTile
                                    Image={menuItem.icon}
                                    alternateText={menuItem.alt}
                                    title={menuItem.title}
                                    childrens={menuItem.children}
                                    route={menuItem.route}
                                    active={active}
                                    key={index}
                                />
                            </div>
                            :
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className={`cursor-pointer rounded-lg transition-colors duration-200 ${active === index ? 'bg-blue-400' : 'hover:bg-blue-200'}`}
                            >
                                <ExpansionTile
                                    Image={menuItem.icon}
                                    alternateText={menuItem.alt}
                                    title={menuItem.title}
                                    childrens={menuItem.children}
                                    route={menuItem.route}
                                    active={active}
                                    key={index}
                                />
                            </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
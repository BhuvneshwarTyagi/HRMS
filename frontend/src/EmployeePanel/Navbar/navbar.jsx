import React, { useContext, useState, useEffect, useRef } from 'react';
import logo from './../../assets/HRMS.png';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import AuthContext from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar({ onDrawerToggle }) {
    const { logout, authState } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-blue-600 shadow-md text-white">
            <div className=" px-4 py-3 flex items-center justify-between mobile:max-tablet:flex-col">
                <div className="flex items-center space-x-4">
                    <FaBars onClick={onDrawerToggle} className="text-2xl cursor-pointer hover:text-blue-200 transition-colors duration-200" />
                    <img src={logo} alt="BDSGI" className="w-10 h-10 bg-white rounded-full mr-3" />
                    <span className="text-xl font-semibold whitespace-nowrap">HRMS</span>
                </div>
                <h1 className="text-2xl font-bold mobile:max-tablet:font-normal">Employee Panel</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative text-black" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-4 cursor-pointer"
                        >
                            <span className="flex items-center gap-2 font-medium">
                            <div className="flex items-center justify-center  rounded-full bg-white p-[1px] shadow-lg ">
                                    <img className="text-5xl text-blue-500 rounded-full h-10 w-10" alt='img' src={authState?.userDetails?.profile_picture || 'default-profile.png'} />
                                </div>
                                {authState?.userDetails?.Name || 'User'}
                                
                            </span>
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg  font-medium text-black z-10">
                                <Link
                                    to="/dashboard/profile"
                                    className="block px-4 py-2 hover:bg-blue-300 rounded-t-lg"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 hover:bg-blue-300 rounded-b-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

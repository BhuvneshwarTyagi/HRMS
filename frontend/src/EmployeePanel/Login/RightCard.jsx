import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/HRMS.png'
import themeImg  from '../../assets/login_page.png'

import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../Config";

export default function RightCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, checkAuthState } = useContext(AuthContext);



    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            
            const response = await axios.post(`${BASE_URL}/login/employee`, {
                email,
                password,
            });

            if (response.status === 200) {
                const { userDetails, tokens } = response.data;
                toast.success('Login Successful');
                login({ ...userDetails }, tokens);
                navigate(`/home`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white h-fit max-w-md md:max-w-md w-full rounded-3xl shadow-lg shadow-primary ">
            <ToastContainer />
            <div className="w-full h-32 bg-text_blue text-white px-6 flex justify-between items-center rounded-t-3xl">
                <div className="relative py-4">
                    <p className="text-xl tablet:text-2xl font-medium leading-tight">Welcome Back!</p>
                    <img src={logo} alt="Logo" className="w-20 h-20 mt-2 bg-white rounded-full absolute border-4 border-primary border-opacity-5" />
                </div>
                <img src={themeImg} alt="log in" className="h-16 tablet:h-32" />
            </div>

            <div className="w-full mt-10 px-4 text-lg text-black pb-4">
                <form className="w-full text-lg" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={isSubmitting}
                        className="w-full border border-text_blue rounded-xl py-2 px-3 shadow-md shadow-primary bg-transparent"
                        required
                    />

                    <label htmlFor="password" className="block mt-4 mb-1">Password</label>
                    <div className="flex items-center border border-text_blue rounded-xl shadow-md shadow-primary bg-transparent">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter password"
                            disabled={isSubmitting}
                            className="w-full py-2 px-3 bg-transparent rounded-l-xl outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="p-2 text-gray-500"
                            disabled={isSubmitting}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>


                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 py-2 bg-blue-300 rounded-xl shadow-md border border-primary"
                    >
                        {isSubmitting ? <Loading /> : <p className="text-primary font-medium mx-auto">Log in</p>}
                    </button>
                </form>


            </div>
        </div>
    );
}
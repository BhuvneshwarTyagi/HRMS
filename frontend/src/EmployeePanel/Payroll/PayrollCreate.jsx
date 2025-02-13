import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import AuthContext from '../../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';
import PayrollTable from './PayrollTable';

const PayrollScreen = () => {
    const { authState } = useContext(AuthContext);
    const [payrollData, setPayrollData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [employeeSearchResults, setEmployeeSearchResults] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: '',
        baseSalary: '',
        totalDays: '',
        month: '',
    });

    useEffect(() => {
        fetchPayrollData();
    }, []);

    const fetchPayrollData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/payroll/fetch/employee`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`,
                },
            });
            setPayrollData(response.data.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch payroll data');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(
                `${BASE_URL}/payroll/create`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`,
                    },
                }
            );
            toast.success('Payroll calculated successfully!');
            fetchPayrollData();
            setFormData({
                employeeId: '',
                baseSalary: '',
                totalDays: '',
                month: '',
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to calculate payroll');
        } finally {
            setLoading(false);
        }
    };



      const debouncedEmployeeSearch = useCallback(
        debounce(async (searchString) => {
            if (!searchString) {
                setEmployeeSearchResults([]);
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/searchuser/${searchString}`, {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`,
                    },
                });
                setEmployeeSearchResults(response.data.employees);
            } catch (error) {
                toast.error('Failed to search employees');
                setEmployeeSearchResults([]);
            }
        }, 300),
        [authState.accessToken]
    );
      const handleEmployeeIdChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            employeeId: value,
        });
        debouncedEmployeeSearch(value);
    };


      const handleEmployeeSelect = (employee) => {
        setFormData({
            ...formData,
            employeeId: employee._id,
        });
        setEmployeeSearchResults([]);
    };
    return (
        <div className="min-h-screen ">
            <ToastContainer />

            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Payroll Management</h1>

                {/* Payroll Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                        ₹
                        Calculate New Payroll
                    </h2>

                    <form onSubmit={handleSubmit} className="grid laptop:grid-cols-4 tablet:grid-cols-2 mobile:max-tablet:grid-cols-1 gap-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Employee ID
                        </label>
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleEmployeeIdChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            autoComplete="off"
                        />
                        {employeeSearchResults.length > 0 && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                {employeeSearchResults.map((employee) => (
                                    <div
                                        key={employee._id}
                                        onClick={() => handleEmployeeSelect(employee)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {employee.Name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Base Salary
                            </label>
                            <input
                                type="number"
                                name="baseSalary"
                                value={formData.baseSalary}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Days
                            </label>
                            <input
                                type="number"
                                name="totalDays"
                                value={formData.totalDays}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Month (YYYY-MM)
                            </label>
                            <input
                                type="month"
                                name="month"
                                value={formData.month}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                            >
                                {loading ? 'Calculating...' : 'Calculate Payroll'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Payroll Records */}
                <PayrollTable payrollData={payrollData}/>
            </div>
        </div>
    );
};

export default PayrollScreen;
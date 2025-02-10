import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaMoneyBillWave, FaCalendarAlt, FaUserClock } from 'react-icons/fa';
import { BASE_URL } from '../Config';
import AuthContext from '../Context/AuthContext';

const PayrollDashboard = () => {
    const {authState} = useContext(AuthContext);
  const [payrollData, setPayrollData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(BASE_URL+`/payroll/fetch?month=${selectedMonth}`, {
        headers: {
          'Authorization': `Bearer ${authState.accessToken}`,
        }
      });
      setPayrollData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch payroll data');
    } finally {
      setLoading(false);
    }
  };

  // Generate month options for the last 12 months
  const getLastTwelveMonths = () => {
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = d.toISOString().slice(0, 7);
      months.push(month);
    }
    return months;
  };

  const handleDownloadPDF = async (payrollId, employeeName) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/payroll/fetch/generate-pdf/${payrollId}`,
        {
          headers: {
            'Authorization': `Bearer ${authState.accessToken}`,
          },
          responseType: 'blob',
        }
      );
  
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `payslip-${employeeName}-${new Date().toLocaleDateString()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
  
      toast.success('Payslip downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download payslip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Payroll Dashboard
          </h1>
          <p className="text-gray-600">
            View and manage your monthly salary details
          </p>
        </div>

        {/* Month Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-64">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Month</option>
                {getLastTwelveMonths().map((month) => (
                  <option key={month} value={month}>
                    {new Date(month).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchPayroll}
              disabled={!selectedMonth || loading}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? 'Loading...' : 'Fetch Payroll'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Payroll Data Display */}
        {payrollData && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Payroll Details
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Salary Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <FaMoneyBillWave className="text-green-500 text-2xl mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Salary Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Salary:</span>
                    <span className="font-semibold">
                      ₹{payrollData.baseSalary.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Salary:</span>
                    <span className="font-semibold">
                      ₹{payrollData.calculatedSalary.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Attendance Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <FaUserClock className="text-blue-500 text-2xl mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Attendance Details
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Days:</span>
                    <span className="font-semibold">{payrollData.totalDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Present Days:</span>
                    <span className="font-semibold">
                      {payrollData.presentDays}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendance:</span>
                    <span className="font-semibold">
                      {((payrollData.presentDays / payrollData.totalDays) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="border-t border-gray-200 px-6 py-4">
              <button className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200" onClick={() => handleDownloadPDF(payrollData._id, authState.userDetails.Name)}>
                Download Payslip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollDashboard;
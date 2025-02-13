import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import AuthContext from '../../Context/AuthContext';
import PayrollTable from './PayrollTable';

const PayrollDashboard = () => {
  const { authState } = useContext(AuthContext);
  const [payrollData, setPayrollData] = useState([]);

  const [error, setError] = useState(null);

  const fetchPayroll = async () => {
    try {
      setError(null);
      const response = await axios.get(BASE_URL + `/payroll/fetch`, {
        headers: {
          'Authorization': `Bearer ${authState.accessToken}`,
        }
      });
      setPayrollData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch payroll data');
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, [authState])



  return (
    <div className="min-h-screen py-8">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Payroll Dashboard
          </h1>
          <p className="text-gray-600">
            View and manage your monthly salary details
          </p>
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
        <PayrollTable payrollData={payrollData}/>
      </div>
    </div>
  );
};

export default PayrollDashboard;
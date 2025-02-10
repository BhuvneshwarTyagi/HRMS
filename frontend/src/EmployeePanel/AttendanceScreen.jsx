import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Config';
import AuthContext from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { FiClock, FiLogIn, FiLogOut } from 'react-icons/fi'; // Import icons
import { motion } from 'framer-motion'; // For animations

const AttendanceScreen = () => {

  const {authState} = useContext(AuthContext);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(BASE_URL+`/attendance/fetch?date=${today}`,
        {
          headers: {
            'Authorization': `Bearer ${authState.accessToken}`,
          },
        }
      );
      setAttendanceRecords(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check-in failed');
      setError('Failed to fetch attendance records');
    }
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BASE_URL + '/attendance/create/checkin', {
        checkInTime: new Date(),
      },
      {
        headers: {
          'Authorization': `Bearer ${authState.accessToken}`,
        },
      }
    );
      fetchAttendanceRecords();
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Check-in failed');
      toast.error(error.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BASE_URL + '/attendance/create/checkout', {
        checkOutTime: new Date(),
      },
      {
        headers: {
          'Authorization': `Bearer ${authState.accessToken}`,
        },
      }
    );
      fetchAttendanceRecords();
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Check-out failed');
      toast.error(error.response?.data?.message || 'Check-in failed');

    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };


  const getCurrentTime = () => {
    return new Date().toLocaleTimeString();
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-auto no-scrollbar"
    >
      <ToastContainer />
      
      {/* Time Display Card */}
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mobile:max-tablet:flex-col">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Attendance Dashboard</h1>
            <p className="text-gray-600">Track your daily attendance efficiently</p>
          </div>
          <div className="text-center">
            <FiClock className="text-4xl text-indigo-600 mb-2 mx-auto" />
            <div className="text-2xl font-bold text-indigo-600">{currentTime}</div>
          </div>
        </div>
      </motion.div>

      {/* Check-in/Check-out Card */}
      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6 "
      >
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={handleCheckIn}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            <FiLogIn className="text-xl" />
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            <FiLogOut className="text-xl" />
            Check Out
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            {error}
          </div>
        )}
      </motion.div>

      {/* Attendance Records Card */}
      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-2"
      >
        <h2 className="text-2xl mobile:text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiClock className="text-indigo-600" />
          Today's Attendance Records
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-blue-50">
                <th className="py-3 px-4 text-left text-gray-700 font-semibold rounded-tl-lg">Check In Time</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Check Out Time</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Duration</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{formatDate(record.checkInTime)}</td>
                  <td className="py-3 px-4">
                    {record.checkOutTime ? formatDate(record.checkOutTime) : '-'}
                  </td>
                  <td className="py-3 px-4">
                    {record.duration ? `${record.duration} mins` : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        record.checkOutTime
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {record.checkOutTime ? 'Completed' : 'Active'}
                    </span>
                  </td>
                </motion.tr>
              ))}
              {attendanceRecords.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <FiClock className="text-4xl mb-2 text-gray-400" />
                      <p>No attendance records found for today</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AttendanceScreen;
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL } from '../../Config';
import { motion } from 'framer-motion';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';


export default function HistoryTile({ details }) {
    const [data, setData] = useState([]);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const { authState } = useContext(AuthContext);
    const [editData, setEditData] = useState({});
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        console.log('index', data[index].employee)
        setExpanded(expanded === index ? null : index);
    }

    useEffect(() => {
        if (details) {
            console.log('before', details)
            setData(details);
            console.log('after', details)

        }
    }, [details]);

    const handleInputChange = (e, field) => {
        setEditData({ ...editData, [field]: e.target.value });
    };


    const handleUpdate = async (index, status) => {
        const id = data[index]._id;


        try {
            const response = await axios.put(
                `${BASE_URL}/leave/update?leaveId=${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                const updatedData = data.map((item, i) => {
                    console.log('item', i === index ? {...item,status:status} : item)
                    return i === index ? {...item,status:status} : item
                }
                );
                setData(updatedData);
                console.log('updatedData', updatedData);
                setEditRowIndex(null);
                toast.success('Leave Updated');
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full  mt-3"
        >
            <ToastContainer />
            {data.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-4 border border-blue-200 shadow-lg rounded-lg p-4 bg-white"
                >
                     <div className='flex flex-row'>
                        <img src={item.employee.profileLink} alt="img" className='w-6 h-6 bg-blue' />
                        <span className='font-medium text-black ml-2'>{item.employee.Name}</span>
                    </div>
                    <div className='flex justify-between items-center font-medium text-blue-700 cursor-pointer' onClick={() => handleClick(index)}>
                        <span>Type: {editRowIndex === index ? (
                            <input
                                type="text"
                                value={editData.type}
                                onChange={(e) => handleInputChange(e, 'type')}
                                className='border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        ) : (
                            item.type
                        )}</span>
                        <motion.div
                            animate={{ rotate: expanded === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {expanded === index ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: expanded === index ? 'auto' : 0, opacity: expanded === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                    >
                        <div className='font-medium text-justify mt-2'>
                            Reason: {editRowIndex === index ? (
                                <textarea
                                    rows={6}
                                    value={editData.reason}
                                    onChange={(e) => handleInputChange(e, 'reason')}
                                    className='border border-blue-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            ) : (
                                <span className='font-normal text-gray-700'>{item.reason}</span>
                            )}
                        </div>
                    </motion.div>

                    <div className="flex items-center mt-4 justify-between">
                        {item.by && item.status !== 'Pending' ? (
                            <>
                                <div className='flex items-center'>
                                    <img src={item.by[0].profileLink} alt="img" className="w-10 h-10 rounded-full border-2 border-blue-500" />
                                    <h5 className="ml-2 font-medium text-blue-700">{item.by[0].name}</h5>
                                </div>
                                <div className={`ml-2 font-medium text-sm px-3 py-1 rounded-full ${item.status === 'Pending' ? 'bg-yellow-200 text-yellow-700' :
                                    item.status === 'Approved' ? 'bg-green-200 text-green-700' :
                                        'bg-red-200 text-red-700'
                                    }`}>
                                    {item.status}
                                </div>
                            </>
                        ) : (
                            <div className="flex mobile:max-tablet:flex-col gap-2 justify-between items-center w-full">
                                <div className='flex space-x-2'>

                                    <button onClick={() => { handleUpdate(index, 'Approved') }} className='bg-green-400'>
                                        Approve
                                    </button>
                                    <button onClick={() => { handleUpdate(index, 'Rejected') }} className='bg-red-400'>
                                        Reject
                                    </button>
                                </div>

                                <div className={`font-medium text-sm px-3 py-1 rounded-full ${item.status === 'Pending' ? 'bg-yellow-200 text-yellow-700' :
                                    item.status === 'Approved' ? 'bg-green-200 text-green-700' :
                                        'bg-red-200 text-red-700'
                                    }`}>
                                    {item.status}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='w-full mobile:max-tablet:text-xs flex items-center justify-between mt-2 text-blue-600'>

                        <div>
                            From: {editRowIndex === index ? (
                                <input
                                    type="date"
                                    value={editData.startDate}
                                    onChange={(e) => handleInputChange(e, 'startDate')}
                                    className='border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            ) : (
                                item.startDate
                            )}
                        </div>

                        <div>
                            To: {editRowIndex === index ? (
                                <input
                                    type="date"
                                    value={editData.endDate}
                                    onChange={(e) => handleInputChange(e, 'endDate')}
                                    className='border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            ) : (
                                item.endDate
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}


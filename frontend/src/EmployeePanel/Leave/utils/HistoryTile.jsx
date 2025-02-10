import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';


export default function HistoryTile({ details }) {
    const [data, setData] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    useEffect(() => {
        if (details) {
            console.log('before', details)
            setData(details);
            console.log('after', details)

        }
    }, [details]);




    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}

            className="relative w-full pl-2  mt-3 "

        >
            {data.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-4 border border-blue-200 shadow-lg rounded-lg p-4 bg-white"
                >

                    <div className='flex justify-between gap-2 items-center font-medium text-blue-700 cursor-pointer' onClick={() => handleClick(index)}>
                        <span>Type:&nbsp;
                            {item.type}
                        </span>
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
                            Reason: &nbsp;
                            <span className='font-normal text-gray-700'>{item.reason}</span>

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
                            <div className="flex justify-end items-center w-full">

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
                            From: &nbsp; {item.startDate}

                        </div>

                        <div>
                            To: &nbsp;
                            {item.endDate}

                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}


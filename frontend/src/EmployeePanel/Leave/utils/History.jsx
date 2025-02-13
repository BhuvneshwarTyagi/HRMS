import React, { useState, useContext, useEffect, useRef } from 'react';
import { BASE_URL } from './../../../Config';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading'
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';
import HistoryTile from '../../EmployeeLeaves.jsx/HistoryTile';

function History({ additionalData }) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const end = 20;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        if (authState.accessToken) {
            setDetails(prevState => [...additionalData, ...prevState]);
        } else {
            toast.error('No access token available');
        }
    }, [authState.accessToken, additionalData]);

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth >= 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            if (loading || allDataFetched) return;

            const session = getCurrentSession();
            setLoading(true);

            try {
                const response = await axios.get(
                    `${BASE_URL}/leave/fetch/leave?start=${start}&end=${end}&session=${session}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${authState.accessToken}`
                        }
                    }
                );

                const leaves = response.data.Leaves.length;

                if (leaves < end) {
                    setAllDataFetched(true);
                }

                setDetails(prevData => [...prevData, ...response.data.Leaves]);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (authState.accessToken && !allDataFetched) {
            fetchData();
        }
    }, [start, authState.accessToken, end]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    setStart(prevStart => prevStart + end);
                }
            },
            { root: null, rootMargin: '0px', threshold: 1.0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [allDataFetched, loading, end]);


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}

            className=' mx-auto  w-full '

        >


            {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Loading />
                </motion.div>
            ) : details.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12 text-blue-600 font-medium"
                >
                    No data available
                </motion.div>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HistoryTile details={details} self={true} />
                    </motion.div>

                    <div ref={sentinelRef} className="h-10">
                        {loading && start > 0 && (
                            <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                        )}
                    </div>
                </>
            )}
        </motion.div>
    )
}

export default History
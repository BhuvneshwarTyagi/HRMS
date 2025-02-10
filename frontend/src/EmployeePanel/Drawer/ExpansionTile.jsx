import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ExpansionTile({ title, childrens, Image, route, active, key }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`group mb-2 ${active === key ? 'bg-blue-200' : ''} rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out`}>
            {childrens.length > 0 ? (
                <div>
                    <div
                        className="flex items-center justify-between p-3 cursor-pointer 
                        group-hover:bg-blue-50 rounded-t-lg transition-colors duration-200"
                        onClick={toggleExpanded}
                    >
                        <div className="flex items-center space-x-3">
                            <div className='text-2xl text-blue-800 opacity-100 group-hover:opacity-100 transition-opacity'>
                                <Image />
                            </div>
                            <span className="text-lg font-medium text-gray-800 
                            group-hover:text-blue-700 transition-colors">{title}</span>
                        </div>
                        <div className="text-gray-500 group-hover:text-blue-600 transition-colors">
                            {expanded ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                    <div
                        className={`pl-9 pr-3 space-y-2 overflow-hidden transition-all duration-300 
                        ${expanded ? 'max-h-96 py-2' : 'max-h-0 py-0'}
                        bg-blue-50/50 rounded-b-lg`}
                    >
                        {childrens.map((child, index) => (
                            <Link
                                key={index}
                                to={child.route}
                                className="block py-2 px-3 rounded-md 
                                text-gray-700 hover:bg-blue-100 
                                hover:text-blue-800 
                                transition-all duration-200 
                                ease-in-out"
                            >
                                {child.text}
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <Link
                    to={route}
                    className="flex items-center p-3 rounded-lg 
                    hover:bg-blue-50 
                    transition-colors duration-200 
                    group/link"
                >
                    <div className='text-2xl text-blue-600 opacity-80 
                    group-hover/link:opacity-100 mr-3 transition-opacity'>
                        <Image />
                    </div>
                    <span className="text-lg font-medium text-gray-800 
                    group-hover/link:text-blue-700 transition-colors">{title}</span>
                </Link>
            )}
        </div>
    );
}

export default ExpansionTile;
import { Link } from 'react-router-dom';

function ExpansionTile({ title,Image, route, active, key1 }) {
    
    return (
        <div key={title} className={`group mb-2 ${active === key1 ? 'bg-blue-200' : ''} rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out`}>
             
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
            
        </div>
    );
}

export default ExpansionTile;
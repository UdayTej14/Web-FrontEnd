import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar /> {/* NavBar is fixed at the top */}

      <div className="flex-grow flex flex-col items-center justify-start mt-16">
        <h1 className="text-4xl font-bold mb-4 text-center text-white">Welcome to the Cooking Blog!</h1>
        <p className="text-lg text-white mb-6 text-center">Discover a variety of delicious recipes.</p>
        
        <div className='text-2xl text-white text-center mb-6'>
          <h2>Cuisine</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4 w-full px-4 justify-items-center">
          <Link to="/cuisine/italian" className="bg-slate-500 text-white text-center flex items-center justify-center h-40 w-52 rounded-lg hover:bg-slate-600">
            Italian
          </Link>
          <Link to="/cuisine/chinese" className="bg-green-500 text-white text-center flex items-center justify-center h-40 w-52 rounded-lg hover:bg-green-600">
            Chinese
          </Link>
          <Link to="/cuisine/indian" className="bg-red-500 text-white text-center flex items-center justify-center h-40 w-52 rounded-lg hover:bg-red-600">
            Indian
          </Link>
          <Link to="/cuisine/mexican" className="bg-orange-500 text-white text-center flex items-center justify-center h-40 w-52 rounded-lg hover:bg-orange-600">
            Mexican
          </Link>
          <Link to="/cuisine/japanese" className="bg-purple-500 text-white text-center flex items-center justify-center h-40 w-52 rounded-lg hover:bg-purple-600">
            Japanese
          </Link>
          <Link to="/cuisine/thai" className="bg-teal-500 text-white text-center flex items-center justify-center h-40 w-52 rounded-lg hover:bg-teal-600">
            Thai
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
// src/components/NavBar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../context/AuthContext'
import { IoStarSharp } from "react-icons/io5";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search input
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const navigate = useNavigate();

  const {user, logout} = useAuth()

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`http://localhost:5010/api/recipes/recipe/search`, {
        params: { query: searchQuery }
      });
      setSearchResults(response.data);
      navigate(`/search?query=${searchQuery}`);
    } catch (error) {
      console.error('Error fetching search results:', error.response || error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-10 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Cooking Blog
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex items-center">
  <input
    type="text"
    placeholder="Search recipes..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="submit"
    className="text-white px-3 py-1 ml-2 text-sm bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Search
  </button>
</form>

      <div className="flex items-center">
        {user ? <button onClick={logout} className="text-white mx-4 bg-transparent outline-none">Logout</button> : <><Link to="/signup" className="text-white mx-4">Sign Up</Link>
          <Link to="/login" className="text-white mx-4">Login</Link><></></>}

        <div className="relative">
          {/* Hamburger icon */}
          <div className="text-white cursor-pointer" onClick={toggleDropdown}>
            <div className="block h-1 w-6 bg-white mb-1"></div>
            <div className="block h-1 w-6 bg-white mb-1"></div>
            <div className="block h-1 w-6 bg-white"></div>
          </div>

          {/* Dropdown menu for About */}
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-md w-48">
              <Link to="/about" className="block px-4 py-2 hover:bg-gray-700">
                About
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
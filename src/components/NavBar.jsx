import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search input
  const navigate = useNavigate(); // Initialize navigate function from react-router-dom

  const { user, logout } = useAuth(); // Get user and logout from AuthContext

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle the search submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5010/api/recipes/recipe/search', {
        params: { query: searchQuery },
      });
      navigate(`/search?query=${searchQuery}`); // Redirect to the search results page
    } catch (error) {
      console.error('Error fetching search results:', error.response || error);
    }
  };

  // Handle logout and redirect to home page
  const handleLogout = () => {
    logout(); // Call the logout function to clear user authentication
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-10 flex justify-between items-center shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Cooking Blog
        </Link>
      </div>

      {/* Search Bar Section */}
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

      {/* User Links Section */}
      <div className="flex items-center">
        {user ? (
          <button
            onClick={handleLogout} // Call handleLogout when logout button is clicked
            className="text-white mx-4 bg-transparent outline-none hover:underline"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup" className="text-white mx-4 hover:underline">
              Sign Up
            </Link>
            <Link to="/login" className="text-white mx-4 hover:underline">
              Login
            </Link>
          </>
        )}

        {/* Hamburger Menu */}
        <div className="relative">
          <div className="text-white cursor-pointer" onClick={toggleDropdown}>
            <div className="block h-1 w-6 bg-white mb-1"></div>
            <div className="block h-1 w-6 bg-white mb-1"></div>
            <div className="block h-1 w-6 bg-white"></div>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-md w-48">
              <Link to="/about" className="block px-4 py-2 hover:bg-gray-700">
                About
              </Link>

              {/* Conditionally render User Dashboard link only if logged in */}
              {user && (
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
                  User Dashboard
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

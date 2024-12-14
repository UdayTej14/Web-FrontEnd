import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setError(null); // Reset any previous errors
      await login(email, password); // Custom login function likely making an API call
      navigate('/'); // Navigate to the homepage on success
    } catch (err) {
      // Handle the specific error message from the server
      const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMessage); // Update the error state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-1 text-white">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1 text-white">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-white">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up here
          </Link>
        </p>
        
        <p className="mt-2 text-center text-white">
          <Link to="/" className="text-blue-400 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

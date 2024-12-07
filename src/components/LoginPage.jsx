import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reset error before making a new request
      setError(null);

      // Send POST request to the backend to authenticate the user
      const response = await axios.post('http://localhost:5010/api/auth/login', {
        email,
        password,
      });

      // Store the JWT token in local storage
      localStorage.setItem('token', response.data.token);

      // Redirect to the homepage upon successful login
      navigate('/');
    } catch (err) {
      // Handle error from the server and display it
      const errorMessage = err.response?.data?.message || 'Invalid email or password';
      setError(errorMessage);
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

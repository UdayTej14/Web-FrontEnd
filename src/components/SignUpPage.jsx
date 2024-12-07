import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reset error before making a new request
      setError(null);

      // Send POST request to the backend to create a new user
      await axios.post('http://localhost:5010/api/auth/signup', {
        name,
        email,
        password,
      });

      // Redirect to login page after successful sign-up
      navigate('/login');
    } catch (err) {
      // Handle error from the server and display it
      const errorMessage = err.response?.data?.message || 'Error during sign-up. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg text-center mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-lg text-center mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-lg text-center mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

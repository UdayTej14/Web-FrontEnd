import React from 'react';
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Welcome to our cooking blog! Here, you'll find a variety of recipes, cooking tips, and culinary inspiration.
      </p>
      <p className="text-lg text-gray-600 text-center">
        Our mission is to share the joy of cooking and to help you explore the world of flavors.
      </p>
      <Link to="/">Homepage</Link>
    </div>
  );
};

export default AboutPage;
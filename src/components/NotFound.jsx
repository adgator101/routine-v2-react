import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-4">
      <div className="bg-white text-center rounded-lg  p-8 max-w-md w-full">
        <h1 className="text-6xl font-semibold text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          404
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-accent text-white px-6 py-3 rounded-full text-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

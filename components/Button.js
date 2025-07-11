import React from 'react';

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
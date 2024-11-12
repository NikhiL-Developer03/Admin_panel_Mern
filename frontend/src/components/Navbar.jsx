import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/icon.png'; // Update this path to your logo image

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2 rounded-full" />
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex space-x-6 mx-auto">
          <Link to="/" className="text-gray-200 hover:text-white transition duration-200">Home</Link>
          <Link to="/employee" className="text-gray-200 hover:text-white transition duration-200">Employee List</Link>
        </div>

        {/* Right Side: User Info and Login Button */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <span className="text-gray-200">Welcome, {user.name}</span>
          ) : (
            <Link to="/login" className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition duration-200 flex items-center justify-center">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 p-4`}>
        <Link to="/" className="block text-gray-200 hover:text-white transition duration-200 py-2 text-center">Home</Link>
        <Link to="/employee" className="block text-gray-200 hover:text-white transition duration-200 py-2 text-center">Employee List</Link>
        <div className="mt-4">
          {user ? (
            <span className="block text-gray-200 text-center">Welcome, {user.name}</span>
          ) : (
            <Link to="/login" className="block bg-teal-500 text-white font-semibold py-2 px-4 mx-10 rounded-lg shadow-md hover:bg-teal-600 transition duration-200 flex items-center justify-center">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
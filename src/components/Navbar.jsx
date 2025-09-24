
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // for navigation
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate(); // initialize navigation

  const handleLoginClick = () => {
    navigate('/admin-login'); // redirect to /admin-login route
  };

  return (
    <header>
      {/* Top green gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#239a5a] via-[#6db14e] to-green-700" />

      {/* Main navbar content - matching hero section alignment */}
      <nav className="bg-white shadow">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="mx-auto max-w-7xl flex items-center justify-between py-4">
            {/* Logo and Text */}
            <div className="flex items-center space-x-3">
              <div className="w-32 h-10 rounded-full flex items-center justify-center">
              <img src={logo} alt="Masjid Council Kerala" className="h-15 w-24" />
              </div>
            </div>

            {/* Admin Login Button */}
            <button
              onClick={handleLoginClick}
              className="flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
            >
              Admin Login
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

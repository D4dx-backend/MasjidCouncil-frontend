import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path); // Use the router's navigate function
    closeMobileMenu();
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  

  return (
    <nav className="bg-green-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold">Admin Panel</h1>
          </div>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/admin-home')}
              className="text-white hover:text-green-200 transition duration-200 px-3 py-2 rounded-md hover:bg-green-700"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('/affliation-list-admin')}
              className="text-white hover:text-green-200 transition duration-200 px-3 py-2 rounded-md hover:bg-green-700"
            >
              Affiliation
            </button>
            <button
              onClick={() => handleNavigation('/medical-list-admin')}
              className="text-white hover:text-green-200 transition duration-200 px-3 py-2 rounded-md hover:bg-green-700"
            >
              Medical Aid
            </button>
            <button
              onClick={() => handleNavigation('/mosque-list-admin')}
              className="text-white hover:text-green-200 transition duration-200 px-3 py-2 rounded-md hover:bg-green-700"
            >
              Mosque Fund
            </button>
          </div>

          {/* Desktop Right side - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-white hover:text-green-200 px-3 py-2 rounded-md hover:bg-green-700 transition duration-200"
                onClick={toggleChangePassword}
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
                <span className="text-sm font-medium">Welcome, Admin</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showChangePassword ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showChangePassword && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={() => handleNavigation('/change-password')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-4.257A6 6 0 0111 7h4zm-4 8l2-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1l-2 2v4z" />
                      </svg>
                      <span>Change Password</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 p-2 rounded-md"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - Visible only when open */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-green-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('/admin-home')}
                className="text-white hover:text-green-200 hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium transition duration-200 w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('/affliation-list')}
                className="text-white hover:text-green-200 hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium transition duration-200 w-full text-left"
              >
                Affiliation
              </button>
              <button
                onClick={() => handleNavigation('/medical-list-admin')}
                className="text-white hover:text-green-200 hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium transition duration-200 w-full text-left"
              >
                Medical Aid
              </button>
              <button
                onClick={() => handleNavigation('/mosque-list-admin')}
                className="text-white hover:text-green-200 hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium transition duration-200 w-full text-left"
              >
                Mosque Fund
              </button>
              
              {/* Mobile User Menu */}
              <div className="border-t border-green-700 pt-4 mt-4">
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">A</span>
                    </div>
                    <div className="text-green-100 text-base font-medium">
                      Welcome, Admin
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleNavigation('/change-password')}
                      className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition duration-200 w-full font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-4.257A6 6 0 0111 7h4zm-4 8l2-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1l-2 2v4z" />
                      </svg>
                      <span>Change Password</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md transition duration-200 w-full font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-600/60 backdrop-blur-md overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white/90 backdrop-blur-lg border-white/20">
            <div className="mt-3">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
                Confirm Logout
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to logout? You will need to login again to access the admin panel.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
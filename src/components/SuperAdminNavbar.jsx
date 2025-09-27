import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Heart, 
  Building, 
  DollarSign, 
  LogOut, 
  Menu, 
  X,
  Home
} from 'lucide-react';

const SuperAdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('superAdminToken');
    localStorage.removeItem('superAdminUser');
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      path: '/superadmin-dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Admin Management'
    },
    {
      path: '/superadmin-affiliation-list',
      label: 'Affiliation',
      icon: Building,
      description: 'Mosque Affiliation'
    },
    {
      path: '/superadmin-medical-list',
      label: 'Medical Aid',
      icon: Heart,
      description: 'Medical Aid Fund'
    },
    {
      path: '/superadmin-mosque-fund-list',
      label: 'Mosque Fund',
      icon: DollarSign,
      description: 'Mosque Fund'
    }
  ];

  return (
    <>
      <nav className="bg-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-white mr-3" />
              <div>
                <h1 className="text-white text-xl font-bold">Super Admin Panel</h1>
                <p className="text-blue-100 text-xs">Masjid Council Kerala</p>
              </div>
            </div>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-200 ${
                      isActive(item.path)
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:text-white hover:bg-blue-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Right side - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200 font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu - Visible only when open */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-blue-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`flex items-center space-x-3 text-white hover:text-blue-200 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-200 w-full text-left ${
                        isActive(item.path) ? 'bg-blue-700 text-white' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-blue-200">{item.description}</div>
                      </div>
                    </button>
                  );
                })}
                
                {/* Mobile Logout */}
                <div className="border-t border-blue-700 pt-4 mt-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md transition duration-200 w-full font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

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
                Are you sure you want to logout? You will need to login again to access the super admin panel.
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
    </>
  );
};

export default SuperAdminNavbar;


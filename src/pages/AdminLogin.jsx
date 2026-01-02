import React, { useState } from 'react';
import { Home, Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import adminLogin from '../assets/adminLogin.jpg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/superadmin/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        // Navigate to admin dashboard
        navigate('/admin-home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuperAdminClick = () => {
    navigate('/superadmin-login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <style>{`
        .admin-login-container {
          background-image: url(${adminLogin});
          background-size: cover;
          background-position: left top;
          background-repeat: no-repeat;
          background-attachment: scroll;
          background-color: #97cee2;
        }
        @media (min-width: 1024px) {
          .admin-login-container {
            background-size: 57%;
            background-attachment: fixed;
          }
        }
      `}</style>
      <div 
        className="admin-login-container min-h-screen flex items-center justify-center p-4 lg:p-4 relative"
      >
        {/* Overlay to reduce image opacity */}
        <div className="absolute inset-0 bg-white/70"></div>

      {/* Home Button (Top Right) */}
      <button
        type="button"
        onClick={handleGoHome}
        title="Go to Home"
        aria-label="Go to Home"
        className="absolute top-4 right-4 lg:top-5 lg:right-5 z-30 inline-flex items-center justify-center h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 text-gray-700 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <Home className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>
      
      <div className="max-w-md w-full relative z-20 mx-auto lg:ml-auto lg:mr-18 lg:mt-4">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-center mb-4 lg:mr-16">
            <img src={logo} alt="Masjid Council Kerala" className="h-14 w-auto lg:h-16 mr-3 lg:mr-4" />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-sm lg:text-base text-gray-600">അഡ്മിൻ ലോഗിൻ</p>
            </div>
          </div>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number (മൊബൈൽ നമ്പർ)
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-base lg:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter 10-digit mobile number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password (പാസ്വേഡ്)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-base lg:text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter password"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Default password: MCK + first 4 digits of mobile number
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-48 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 lg:py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
            
            <button
              type="button"
              className="w-full sm:w-40 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 lg:py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              onClick={handleSuperAdminClick}
            >
              <span className="text-sm">Super Admin</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </form>

        {/* Login Instructions */}
        <div className="mt-5 lg:mt-6 p-4 lg:p-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Info className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Login Instructions</h3>
              <p className="text-xs text-gray-600">ലോഗിൻ നിർദ്ദേശങ്ങൾ</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
              <div>
                <p className="text-gray-700 text-xs mb-1">Use your registered 10-digit mobile number</p>
                <p className="text-xs text-gray-500">നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത 10 അക്ക മൊബൈൽ നമ്പർ ഉപയോഗിക്കുക</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
              <div>
                <p className="text-gray-700 text-xs mb-1">Default password: MCK + first 4 digits of mobile</p>
                <p className="text-xs text-gray-500">സ്ഥിര പാസ്വേഡ്: MCK + മൊബൈലിന്റെ ആദ്യ 4 അക്കങ്ങൾ</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
              <div>
                <p className="text-gray-700 text-xs mb-1">Example: Mobile 9876543210 → Password: MCK9876</p>
                <p className="text-xs text-gray-500">ഉദാഹരണം: മൊബൈൽ 9876543210 → പാസ്വേഡ്: MCK9876</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default AdminLogin;

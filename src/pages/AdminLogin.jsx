import React, { useState } from 'react';
import { User, Shield, Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

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
      const response = await fetch('http://localhost:5000/api/superadmin/admin/login', {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100 h-fit">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img src={logo} alt="Masjid Council Kerala" className="h-16 object-contain" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">അഡ്മിൻ ലോഗിൻ</p>
              <div className="w-16 h-1 bg-green-500 mx-auto mt-3 rounded-full"></div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
                <Info className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number (മൊബൈൽ നമ്പർ)
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter password"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Default password: MCK + first 4 digits of mobile number
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
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
            </form>
          </div>

          {/* Instructions and Super Admin Section */}
          <div className="space-y-6 h-fit">
            {/* Login Instructions */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Info className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Login Instructions</h2>
                  <p className="text-sm text-gray-600">ലോഗിൻ നിർദ്ദേശങ്ങൾ</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700">Use your registered 10-digit mobile number</p>
                    <p className="text-sm text-gray-500">നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത 10 അക്ക മൊബൈൽ നമ്പർ ഉപയോഗിക്കുക</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700">Default password: MCK + first 4 digits of mobile</p>
                    <p className="text-sm text-gray-500">സ്ഥിര പാസ്വേഡ്: MCK + മൊബൈലിന്റെ ആദ്യ 4 അക്കങ്ങൾ</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700">Example: Mobile 9876543210 → Password: MCK9876</p>
                    <p className="text-sm text-gray-500">ഉദാഹരണം: മൊബൈൽ 9876543210 → പാസ്വേഡ്: MCK9876</p>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Super Admin Login */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Super Admin Login</h2>
                  <p className="text-sm text-gray-600">സൂപ്പർ അഡ്മിൻ ലോഗിൻ</p>
                </div>
              </div>
              
              
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                onClick={handleSuperAdminClick}
              >
                <Shield className="h-5 w-5 mr-2" />
                Super Admin Login
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

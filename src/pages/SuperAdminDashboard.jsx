import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  LogOut, 
  Shield, 
  Users,
  Search,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SuperAdminNavbar from '../components/SuperAdminNavbar';

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    district: '',
    area: ''
  });

  // State for dropdown data
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('superAdminToken');
    if (!token) {
      navigate('/superadmin-login');
      return;
    }
    fetchAdmins();
  }, [navigate]);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('superAdminToken');
      const response = await fetch('http://localhost:5000/api/superadmin/admin', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setAdmins(data.data);
      } else {
        setError(data.message || 'Failed to fetch admins');
      }
    } catch (error) {
      console.error('Fetch admins error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch districts and areas from external APIs
  const fetchDropdownData = async () => {
    setLoadingDropdowns(true);
    try {
      // Fetch districts
      const districtsResponse = await fetch('http://localhost:5000/api/mosqueAffiliation/external/districts');
      const districtsData = await districtsResponse.json();
      if (districtsData.success && districtsData.data && districtsData.data.data && Array.isArray(districtsData.data.data)) {
        setDistricts(districtsData.data.data);
      } else {
        console.warn('Failed to fetch districts from API, using fallback data');
        setDistricts(getFallbackDistricts());
      }

      // Fetch areas
      const areasResponse = await fetch('http://localhost:5000/api/mosqueAffiliation/external/areas');
      const areasData = await areasResponse.json();
      if (areasData.success && areasData.data && areasData.data.data && Array.isArray(areasData.data.data)) {
        setAreas(areasData.data.data);
        setFilteredAreas(areasData.data.data); // Initialize with all areas
      } else {
        console.warn('Failed to fetch areas from API, using fallback data');
        const fallbackAreas = getFallbackAreas();
        setAreas(fallbackAreas);
        setFilteredAreas(fallbackAreas);
      }
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      console.warn('Using fallback data for districts and areas');
      const fallbackAreas = getFallbackAreas();
      setDistricts(getFallbackDistricts());
      setAreas(fallbackAreas);
      setFilteredAreas(fallbackAreas);
    } finally {
      setLoadingDropdowns(false);
    }
  };

  // Fallback data for districts
  const getFallbackDistricts = () => [
    { id: 1, name: 'Kozhikode', districtName: 'Kozhikode' },
    { id: 2, name: 'Malappuram', districtName: 'Malappuram' },
    { id: 3, name: 'Kannur', districtName: 'Kannur' },
    { id: 4, name: 'Kasaragod', districtName: 'Kasaragod' },
    { id: 5, name: 'Wayanad', districtName: 'Wayanad' },
    { id: 6, name: 'Thrissur', districtName: 'Thrissur' },
    { id: 7, name: 'Ernakulam', districtName: 'Ernakulam' },
    { id: 8, name: 'Kottayam', districtName: 'Kottayam' },
    { id: 9, name: 'Alappuzha', districtName: 'Alappuzha' },
    { id: 10, name: 'Pathanamthitta', districtName: 'Pathanamthitta' },
    { id: 11, name: 'Kollam', districtName: 'Kollam' },
    { id: 12, name: 'Thiruvananthapuram', districtName: 'Thiruvananthapuram' },
    { id: 13, name: 'Palakkad', districtName: 'Palakkad' },
    { id: 14, name: 'Idukki', districtName: 'Idukki' }
  ];

  // Fallback data for areas
  const getFallbackAreas = () => [
    { id: 1, name: 'Kozhikode City', areaName: 'Kozhikode City' },
    { id: 2, name: 'Feroke', areaName: 'Feroke' },
    { id: 3, name: 'Koyilandy', areaName: 'Koyilandy' },
    { id: 4, name: 'Vadakara', areaName: 'Vadakara' },
    { id: 5, name: 'Thiruvambady', areaName: 'Thiruvambady' },
    { id: 6, name: 'Koduvally', areaName: 'Koduvally' },
    { id: 7, name: 'Balussery', areaName: 'Balussery' },
    { id: 8, name: 'Perambra', areaName: 'Perambra' },
    { id: 9, name: 'Thiruvallur', areaName: 'Thiruvallur' },
    { id: 10, name: 'Elathur', areaName: 'Elathur' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'district') {
      // When district changes, filter areas and reset area selection
      
      const filtered = areas.filter(area => 
        (area.district && area.district.title === value) || 
        (area.district && area.district.title === '') || 
        !area.district
      );
      
      setFilteredAreas(filtered);
      
      setFormData({
        ...formData,
        district: value,
        area: '' // Reset area when district changes
      });
    } else if (name === 'phoneNumber') {
      // When phone number changes, auto-generate password
      const phoneNumber = value.replace(/\D/g, ''); // Remove non-digits
      const firstFourDigits = phoneNumber.substring(0, 4);
      const autoPassword = firstFourDigits.length === 4 ? `MCK${firstFourDigits}` : '';
      
      setFormData({
        ...formData,
        phoneNumber: value,
        password: autoPassword
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // For new admin creation, ensure password is auto-generated
    let submitData = { ...formData };
    if (!editingAdmin && formData.phoneNumber) {
      const phoneNumber = formData.phoneNumber.replace(/\D/g, '');
      const firstFourDigits = phoneNumber.substring(0, 4);
      if (firstFourDigits.length === 4) {
        submitData.password = `MCK${firstFourDigits}`;
      }
    }

    try {
      const token = localStorage.getItem('superAdminToken');
      const url = editingAdmin 
        ? `http://localhost:5000/api/superadmin/admin/${editingAdmin._id}`
        : 'http://localhost:5000/api/superadmin/admin';
      
      const method = editingAdmin ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(editingAdmin ? 'Admin updated successfully!' : 'Admin created successfully!');
        setShowModal(false);
        setFormData({
          username: '',
          phoneNumber: '',
          password: '',
          district: '',
          area: ''
        });
        setEditingAdmin(null);
        fetchAdmins();
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError('Network error. Please try again.');
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      username: admin.username,
      phoneNumber: admin.phoneNumber,
      password: '', // Don't pre-fill password
      district: admin.district,
      area: admin.area
    });
    setShowModal(true);
    fetchDropdownData();
    
    // Filter areas based on the admin's district
    if (admin.district) {
      const filtered = areas.filter(area => 
        (area.district && area.district.title === admin.district) || 
        (area.district && area.district.title === '') || 
        !area.district
      );
      setFilteredAreas(filtered);
    }
  };

  const handleDelete = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      const token = localStorage.getItem('superAdminToken');
      const response = await fetch(`http://localhost:5000/api/superadmin/admin/${adminId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Admin deleted successfully!');
        fetchAdmins();
      } else {
        setError(data.message || 'Failed to delete admin');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Network error. Please try again.');
    }
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

  const openCreateModal = () => {
    setEditingAdmin(null);
    setFormData({
      username: '',
      phoneNumber: '',
      password: '',
      district: '',
      area: ''
    });
    setShowModal(true);
    fetchDropdownData();
    // Reset filtered areas to show all areas initially
    setFilteredAreas(areas);
  };

  const filteredAdmins = admins.filter(admin =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.phoneNumber.includes(searchTerm) ||
    admin.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <SuperAdminNavbar />

      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-2">
              സൂപ്പർ അഡ്മിൻ ഡാഷ്‌ബോർഡ്
            </h1>
            <p className="text-blue-600 text-lg font-medium">
              Super Admin Dashboard - Manage Admins
            </p>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {success}
            </div>
          )}

          {/* Main Content Card */}
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Users className="w-6 h-6 mr-3" />
                അഡ്മിൻ മാനേജ്മെന്റ് | Admin Management
              </h2>
            </div>

            {/* Actions Bar */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search admins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  onClick={openCreateModal}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Admin
                </button>
              </div>
            </div>

            {/* Admins Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      District
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Area
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAdmins.map((admin) => (
                    <tr key={admin._id} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{admin.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{admin.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{admin.district}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{admin.area}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(admin)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100 transition-colors"
                            title="Edit Admin"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(admin._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition-colors"
                            title="Delete Admin"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAdmins.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No admins found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first admin.'}
                </p>
              </div>
            )}

            {/* Card Footer */}
            <div className="bg-blue-50 px-6 py-4 border-t border-blue-200">
              <div className="flex items-center justify-between text-sm text-blue-700">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">Total Admins: {filteredAdmins.length}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Click edit/delete to manage admins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600/60 backdrop-blur-md overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white/90 backdrop-blur-lg border-white/20">
            <div className="mt-3">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                {editingAdmin ? 'Edit Admin' : 'Create New Admin'}
              </h3>
               
               
               <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                   <input
                     type="text"
                     name="phoneNumber"
                     value={formData.phoneNumber}
                     onChange={handleInputChange}
                     className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter 10-digit mobile number"
                     required
                   />
                 </div>


                 <div>
                   <label className="block text-sm font-medium text-gray-700">District</label>
                   <select
                     name="district"
                     value={formData.district}
                     onChange={handleInputChange}
                     className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     required
                     disabled={loadingDropdowns}
                   >
                     <option value="">Select District</option>
                     {Array.isArray(districts) && districts.map((district) => (
                       <option key={district.id || district._id} value={district.title || district.name || district.districtName}>
                         {district.title || district.name || district.districtName}
                       </option>
                     ))}
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700">
                     Area {!formData.district && <span className="text-gray-500">(Select district first)</span>}
                   </label>
                   <select
                     name="area"
                     value={formData.area}
                     onChange={handleInputChange}
                     className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     required
                     disabled={loadingDropdowns || !formData.district}
                   >
                     <option value="">
                       {!formData.district ? 'Select district first' : 'Select Area'}
                     </option>
                     {Array.isArray(filteredAreas) && filteredAreas.map((area) => (
                       <option key={area.id || area._id} value={area.title || area.name || area.areaName}>
                         {area.title || area.name || area.areaName}
                       </option>
                     ))}
                   </select>
                 </div>


                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingAdmin ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
                Are you sure you want to logout? You will need to login again to access the dashboard.
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
    </div>
  );
};

export default SuperAdminDashboard;

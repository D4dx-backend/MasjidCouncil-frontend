import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, FileText, Heart, Building2, User, AlertCircle, Clock, CheckCircle, XCircle, ArrowRight, Phone, MapPin } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import AdminMobileBottomNav from "../components/AdminMobileBottomNav";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    affiliation: { total: 0, pending: 0, approved: 0, rejected: 0 },
    medical: { total: 0, pending: 0, approved: 0, rejected: 0 },
    mosque: { total: 0, pending: 0, approved: 0, rejected: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminInfo, setAdminInfo] = useState(null);
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  useEffect(() => {
    fetchStatistics();
    loadAdminInfo();
    fetchRecentSubmissions();
  }, []);

  const loadAdminInfo = () => {
    try {
      const adminData = localStorage.getItem('adminUser');
      if (adminData) {
        setAdminInfo(JSON.parse(adminData));
      }
    } catch (error) {
      console.error('Error loading admin info:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const affiliationResponse = await fetch(`${API_BASE_URL}/api/mosqueAffiliation/all`);
      const affiliationData = await affiliationResponse.json();
      
      const medicalResponse = await fetch(`${API_BASE_URL}/api/welfarefund/all`);
      const medicalData = await medicalResponse.json();
      
      const mosqueResponse = await fetch(`${API_BASE_URL}/api/mosqueFund/all`);
      const mosqueData = await mosqueResponse.json();
      
      setStats({
        affiliation: {
          total: affiliationData.data?.length || 0,
          pending: affiliationData.data?.filter(item => item.status === 'pending').length || 0,
          approved: affiliationData.data?.filter(item => item.status === 'approved').length || 0,
          rejected: affiliationData.data?.filter(item => item.status === 'rejected').length || 0
        },
        medical: {
          total: medicalData.data?.length || 0,
          pending: medicalData.data?.filter(item => item.status === 'pending').length || 0,
          approved: medicalData.data?.filter(item => item.status === 'approved').length || 0,
          rejected: medicalData.data?.filter(item => item.status === 'rejected').length || 0
        },
        mosque: {
          total: mosqueData.data?.length || 0,
          pending: mosqueData.data?.filter(item => item.status === 'pending').length || 0,
          approved: mosqueData.data?.filter(item => item.status === 'approved').length || 0,
          rejected: mosqueData.data?.filter(item => item.status === 'rejected').length || 0
        }
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setError('Failed to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentSubmissions = async () => {
    try {
      const affiliationResponse = await fetch(`${API_BASE_URL}/api/mosqueAffiliation/all`);
      const affiliationData = await affiliationResponse.json();
      
      const medicalResponse = await fetch(`${API_BASE_URL}/api/welfarefund/all`);
      const medicalData = await medicalResponse.json();
      
      const mosqueResponse = await fetch(`${API_BASE_URL}/api/mosqueFund/all`);
      const mosqueData = await mosqueResponse.json();

      const allSubmissions = [
        ...(affiliationData.data || []).map(item => ({ ...item, type: 'affiliation' })),
        ...(medicalData.data || []).map(item => ({ ...item, type: 'medical' })),
        ...(mosqueData.data || []).map(item => ({ ...item, type: 'mosque' }))
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

      setRecentSubmissions(allSubmissions);
    } catch (error) {
      console.error('Error fetching recent submissions:', error);
      // Keep the dashboard usable even if this fails
    }
  };


  const getTypeDisplay = (type) => {
    const types = {
      affiliation: { text: 'Affiliation', color: 'bg-blue-100 text-blue-800', icon: FileText },
      medical: { text: 'Welfare Fund', color: 'bg-green-100 text-green-800', icon: Heart },
      mosque: { text: 'Masjid Fund', color: 'bg-purple-100 text-purple-800', icon: Building2 }
    };
    return types[type] || types.affiliation;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-24 lg:pb-0">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6db14e] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
        <AdminMobileBottomNav />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (desktop only) */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="p-4 lg:p-8 pb-24 lg:pb-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back{adminInfo ? `, ${adminInfo.username}` : ''}!
            </h1>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => navigate('/affiliation-list-admin')}
              className="group text-left rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-[#6db14e] transition-all duration-300 bg-gradient-to-br from-white to-green-50/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6db14e]/5 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#6db14e] to-[#5fa644] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-[#6db14e]">{stats.affiliation.total}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-4 group-hover:text-[#6db14e] transition-colors">Masjid Affiliation</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-gray-600">Pending</span>
                    </div>
                    <span className="font-bold text-yellow-700">{stats.affiliation.pending}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Approved</span>
                    </div>
                    <span className="font-bold text-green-700">{stats.affiliation.approved}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-gray-600">Rejected</span>
                    </div>
                    <span className="font-bold text-red-700">{stats.affiliation.rejected}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-[#6db14e] text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/medical-list-admin')}
              className="group text-left rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-500 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-blue-600">{stats.medical.total}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-4 group-hover:text-blue-600 transition-colors">Welfare Fund</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-gray-600">Pending</span>
                    </div>
                    <span className="font-bold text-yellow-700">{stats.medical.pending}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Approved</span>
                    </div>
                    <span className="font-bold text-green-700">{stats.medical.approved}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-gray-600">Rejected</span>
                    </div>
                    <span className="font-bold text-red-700">{stats.medical.rejected}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/mosque-list-admin')}
              className="group text-left rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-purple-500 transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-purple-600">{stats.mosque.total}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-4 group-hover:text-purple-600 transition-colors">Masjid Fund</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-gray-600">Pending</span>
                    </div>
                    <span className="font-bold text-yellow-700">{stats.mosque.pending}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Approved</span>
                    </div>
                    <span className="font-bold text-green-700">{stats.mosque.approved}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-gray-600">Rejected</span>
                    </div>
                    <span className="font-bold text-red-700">{stats.mosque.rejected}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-purple-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </button>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Admin Profile */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#6db14e] to-[#5fa644] rounded-lg flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                Admin Profile
              </h2>
              {adminInfo ? (
                <div className="space-y-5">
                  {/* Profile Header */}
                  <div className="flex items-start p-5 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border border-green-100 rounded-xl shadow-sm">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#6db14e] to-[#5fa644] rounded-full flex items-center justify-center shadow-lg mr-5 flex-shrink-0">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900 text-xl truncate">{adminInfo.username}</p>
                        {adminInfo.role && (
                          <span className="ml-3 px-3 py-1 bg-[#6db14e] text-white text-xs font-semibold rounded-full shadow-sm">
                            {adminInfo.role.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Administrator Account</p>
                      
                      {/* Info Grid */}
                      <div className="grid grid-cols-1 gap-3 mt-4">
                        {adminInfo.district && (
                          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-green-200 transition-colors shadow-sm">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <MapPin className="w-5 h-5 text-[#6db14e]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 font-medium mb-0.5">District</p>
                              <p className="text-sm font-semibold text-gray-900 truncate">{adminInfo.district}</p>
                            </div>
                          </div>
                        )}
                        {adminInfo.area && (
                          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-green-200 transition-colors shadow-sm">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <MapPin className="w-5 h-5 text-[#6db14e]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 font-medium mb-0.5">Area</p>
                              <p className="text-sm font-semibold text-gray-900 truncate">{adminInfo.area}</p>
                            </div>
                          </div>
                        )}
                        {adminInfo.phoneNumber && (
                          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-green-200 transition-colors shadow-sm">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <Phone className="w-5 h-5 text-[#6db14e]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 font-medium mb-0.5">Phone Number</p>
                              <p className="text-sm font-semibold text-gray-900">{adminInfo.phoneNumber}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Info Section */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Account Status</span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium mb-1">No admin info found</p>
                  <p className="text-xs text-gray-400">Please log in to view your profile</p>
                </div>
              )}
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#6db14e] to-[#5fa644] rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Recent Submissions
              </h2>
              {recentSubmissions.length > 0 ? (
                <div className="space-y-3">
                  {recentSubmissions.slice(0, 5).map((submission, index) => {
                    const typeInfo = getTypeDisplay(submission.type);
                    const TypeIcon = typeInfo.icon;
                    
                    return (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#6db14e] hover:shadow-md transition-all duration-200 bg-gray-50/50"
                      >
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div className={`w-12 h-12 ${typeInfo.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <TypeIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate text-sm">
                              {submission.name || submission.mosqueName || 'Unknown'}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeInfo.color}`}>
                                {typeInfo.text}
                              </span>
                              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(submission.status)}`}>
                                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-xs text-gray-500 font-medium">
                            {new Date(submission.createdAt).toLocaleDateString('en-GB', { 
                              day: 'numeric', 
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">No recent submissions</p>
                  <p className="text-xs text-gray-400 mt-1">New submissions will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AdminMobileBottomNav />
    </div>
  );
};

export default AdminHome;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminHome = () => {
  const [stats, setStats] = useState({
    affiliation: { total: 0, pending: 0, approved: 0, rejected: 0 },
    medical: { total: 0, pending: 0, approved: 0, rejected: 0 },
    mosque: { total: 0, pending: 0, approved: 0, rejected: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    fetchStatistics();
    loadAdminInfo();
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
      // Fetch affiliation data
      const affiliationResponse = await fetch(`${API_BASE_URL}/api/mosqueAffiliation/all`);
      const affiliationData = await affiliationResponse.json();
      
      // Fetch medical aid data
      const medicalResponse = await fetch(`${API_BASE_URL}/api/welfarefund/all`);
      const medicalData = await medicalResponse.json();
      
      // Fetch mosque fund data
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
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, total, pending, approved, rejected, bgColor, route }) => (
    <Link to={route} className="group">
      <div className={`${bgColor} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 mx-2`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-xs text-gray-500 font-medium">Total</div>
          </div>
        </div>
        
        <h3 className="text-gray-900 text-lg font-bold mb-4">{title}</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center bg-yellow-50 rounded-md p-3">
            <div className="text-lg font-bold text-yellow-600">{pending}</div>
            <div className="text-xs text-gray-600 font-medium">Pending</div>
          </div>
          <div className="text-center bg-green-50 rounded-md p-3">
            <div className="text-lg font-bold text-green-600">{approved}</div>
            <div className="text-xs text-gray-600 font-medium">Approved</div>
          </div>
          <div className="text-center bg-red-50 rounded-md p-3">
            <div className="text-lg font-bold text-red-600">{rejected}</div>
            <div className="text-xs text-gray-600 font-medium">Rejected</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center text-gray-600 text-xs font-medium bg-gray-50 rounded-md p-3">
          <TrendingUp className="w-3 h-3 mr-1" />
          <span>വിശദാംശങ്ങൾ കാണുക</span>
        </div>
      </div>
    </Link>
  );

  const totalForms = stats.affiliation.total + stats.medical.total + stats.mosque.total;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5a8a42] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Anek Malayalam Variable" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            അഡ്മിൻ ഡാഷ്‌ബോർഡ്
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-[#5a8a42] to-[#6ba54f] mx-auto rounded-full"></div>
        </div>

        {/* Main Cards Grid - Horizontal Layout with Admin Info */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Admin Info Container */}
          {adminInfo && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 h-full">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{adminInfo.username}</h2>
                  <p className="text-sm text-gray-600 mb-4">Admin Dashboard</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500">District</div>
                    <div className="text-base font-semibold text-gray-900">{adminInfo.district}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">Area</div>
                    <div className="text-sm font-medium text-gray-700">{adminInfo.area}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-sm font-medium text-gray-900">{adminInfo.phoneNumber}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">Role</div>
                    <div className="text-sm font-medium text-green-600 capitalize">{adminInfo.role}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="മസ്ജിദ് അഫിലിയേഷൻ"
            total={stats.affiliation.total}
            pending={stats.affiliation.pending}
            approved={stats.affiliation.approved}
            rejected={stats.affiliation.rejected}
            bgColor="bg-white border border-gray-200"
            route="/affliation-list-admin"
          />
          
          <StatCard
            title="വെൽഫെയർ ഫണ്ട്"
            total={stats.medical.total}
            pending={stats.medical.pending}
            approved={stats.medical.approved}
            rejected={stats.medical.rejected}
            bgColor="bg-white border border-gray-200"
            route="/medical-list-admin"
          />
          
          <StatCard
            title="മസ്ജിദ് ഫണ്ട്"
            total={stats.mosque.total}
            pending={stats.mosque.pending}
            approved={stats.mosque.approved}
            rejected={stats.mosque.rejected}
            bgColor="bg-white border border-gray-200"
            route="/mosque-list-admin"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
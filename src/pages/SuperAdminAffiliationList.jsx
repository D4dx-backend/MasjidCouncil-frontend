import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Users, AlertCircle, CheckCircle } from "lucide-react";
import SuperAdminNavbar from "../components/SuperAdminNavbar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SuperAdminAffiliationList = () => {
  const navigate = useNavigate();
  const [affiliations, setAffiliations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAffiliations();
  }, []);

  const fetchAffiliations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mosqueAffiliation/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setAffiliations(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch affiliations');
      }
    } catch (error) {
      console.error('Fetch affiliations error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMasjidClick = (affiliation) => {
    // Navigate to detailed view with affiliation data
    navigate("/superadmin-affiliation-details", { state: { affiliation } });
  };

  // Calculate stats
  const totalApplications = affiliations.length;
  const uniqueDistricts = Array.from(new Set(affiliations.map(a => a.address && a.address[0] ? a.address[0].district : null).filter(Boolean))).length;
  const uniqueAreas = Array.from(new Set(affiliations.map(a => a.jamathArea && a.jamathArea[0] ? a.jamathArea[0].area : null).filter(Boolean))).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminNavbar />
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Professional Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Affiliation Management</h1>
                <p className="text-gray-600">Review and manage mosque affiliation applications</p>
              </div>
          </div>
        </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
                </div>
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Districts Covered</p>
                  <p className="text-2xl font-bold text-gray-900">{uniqueDistricts}</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Areas</p>
                  <p className="text-2xl font-bold text-gray-900">{uniqueAreas}</p>
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
                {error}
            </div>
          )}

          {/* Affiliation Applications Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Applications</h2>
                  <p className="text-sm text-gray-500">Click on any application to view details</p>
                </div>
                <span className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-md bg-emerald-100 text-emerald-800">
                  {totalApplications} total
                </span>
              </div>
            </div>

          {/* Loading State */}
          {loading && (
              <div className="p-12">
              <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading applications...</p>
              </div>
            </div>
          )}

            {/* Affiliation List */}
          {!loading && !error && (
            <div className="p-6">
                <div className="space-y-3">
                {affiliations.length > 0 ? (
                  affiliations.map((affiliation, index) => (
                    <div
                      key={affiliation._id || index}
                        className="group border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
                    >
                      <button
                        onClick={() => handleMasjidClick(affiliation)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                              <Building2 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                              <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                               {affiliation.name || 'Unknown Mosque'}
                             </h3>
                              <div className="flex items-center mt-1 space-x-2">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
                                  #{String(index + 1).padStart(3, '0')}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                  {affiliation.affiliationNumber || 'Affiliation'}
                                </span>
                              </div>
                              <p className="text-gray-500 text-sm mt-1">
                               {affiliation.address && affiliation.address[0] ? 
                                 `${affiliation.address[0].district || ''}, ${affiliation.jamathArea && affiliation.jamathArea[0] ? affiliation.jamathArea[0].area : ''}` : 
                                 'Location not specified'}
                             </p>
                          </div>
                        </div>
                          <div className="flex items-center text-emerald-600 group-hover:text-emerald-700 transition-colors">
                            <span className="text-sm font-medium mr-2 hidden sm:inline">View</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Building2 className="h-6 w-6 text-gray-400" />
                    </div>
                      <h3 className="text-base font-medium text-gray-900 mb-2">No applications found</h3>
                      <p className="text-gray-500 text-sm">No mosque affiliation applications are available at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default SuperAdminAffiliationList;

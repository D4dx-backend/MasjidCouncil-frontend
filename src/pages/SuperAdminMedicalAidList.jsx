import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminNavbar from "../components/SuperAdminNavbar";

const SuperAdminMedicalAidList = () => {
  const navigate = useNavigate();
  const [medicalAids, setMedicalAids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMedicalAids();
  }, []);

  const fetchMedicalAids = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/welfarefund/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setMedicalAids(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch medical aid applications');
      }
    } catch (error) {
      console.error('Fetch medical aids error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMasjidClick = (medicalAid) => {
    // Navigate to detailed view with medical aid data
    navigate("/superadmin-medical-details", { state: { medicalAid } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <SuperAdminNavbar />
      <div className="p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-2">
            ഇമാം മൗഅ്‌ദിൻ കക്ഷമനിദി - സൂപ്പർ അഡ്മിൻ
          </h1>
          <p className="text-blue-600 text-lg font-medium">
            Imam Muazzin Medical Aid Fund - Super Admin View
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              മസ്ജിദിന്റെ പേര് | Masjid Names (Super Admin View)
            </h2>
          </div>

          {/* Error State */}
          {error && (
            <div className="p-6">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="p-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading medical aid applications...</p>
              </div>
            </div>
          )}

          {/* Medical Aid List */}
          {!loading && !error && (
            <div className="p-6">
              <div className="grid gap-4">
                {medicalAids.length > 0 ? (
                  medicalAids.map((medicalAid, index) => (
                    <div
                      key={medicalAid._id || index}
                      className="group border border-blue-200 rounded-lg hover:border-blue-400 transition-all duration-200 hover:shadow-lg bg-gradient-to-r from-white to-blue-50"
                    >
                      <button
                        onClick={() => handleMasjidClick(medicalAid)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-blue-50 transition-colors duration-200 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-200">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-900 transition-colors duration-200">
                              {medicalAid.mosqueName || 'Unknown Mosque'}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                Medical Aid #{String(index + 1).padStart(3, '0')}
                              </span>
                               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                 {medicalAid.applicantDetails?.name || 'Applicant'}
                               </span>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">
                              {medicalAid.district && medicalAid.area ? `${medicalAid.district}, ${medicalAid.area}` : 'Location not specified'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-blue-500 group-hover:text-blue-700 transition-colors duration-200">
                          <span className="text-sm font-medium mr-2 hidden sm:inline">View Details</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No medical aid applications found</h3>
                    <p className="text-gray-500">No medical aid applications are available at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Card Footer */}
          <div className="bg-blue-50 px-6 py-4 border-t border-blue-200">
            <div className="flex items-center justify-between text-sm text-blue-700">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Total Medical Aid Applications: {medicalAids.length}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">Click on any masjid to view medical aid details</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminMedicalAidList;

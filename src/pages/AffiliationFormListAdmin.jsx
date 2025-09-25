import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AffiliationFormListAdmin = () => {
  const navigate = useNavigate();
  const [affiliations, setAffiliations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAffiliations();
  }, []);

  const fetchAffiliations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mosqueAffiliation/all', {
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
    navigate("/affliation-list", { state: { affiliation } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2">
            മസ്ജിദ് അഫിലിയേഷനുള്ള അപേക്ഷ
          </h1>
          <p className="text-green-600 text-lg font-medium">
            Mosque Affiliation Applications
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-green-100">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              പള്ളിയുടെ പേര് | Mosque Names
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading affiliations...</p>
              </div>
            </div>
          )}

          {/* Mosque List */}
          {!loading && !error && (
            <div className="p-6">
              <div className="grid gap-4">
                {affiliations.length > 0 ? (
                  affiliations.map((affiliation, index) => (
                    <div
                      key={affiliation._id || index}
                      className="group border border-green-200 rounded-lg hover:border-green-400 transition-all duration-200 hover:shadow-lg bg-gradient-to-r from-white to-green-50"
                    >
                      <button
                        onClick={() => handleMasjidClick(affiliation)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-green-50 transition-colors duration-200 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors duration-200">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-green-800 group-hover:text-green-900 transition-colors duration-200">
                              {affiliation.name || 'Unknown Mosque'}
                            </h3>
                            <p className="text-green-600 text-sm font-medium">
                              {affiliation.affiliationNumber || `Affiliation #${String(index + 1).padStart(3, '0')}`}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {affiliation.address && affiliation.address[0] ? 
                                `${affiliation.address[0].district || ''}, ${affiliation.jamathArea && affiliation.jamathArea[0] ? affiliation.jamathArea[0].area : ''}` : 
                                'Location not specified'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-green-500 group-hover:text-green-700 transition-colors duration-200">
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
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No affiliations found</h3>
                    <p className="text-gray-500">No mosque affiliation applications are available at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Card Footer */}
          <div className="bg-green-50 px-6 py-4 border-t border-green-200">
            <div className="flex items-center justify-between text-sm text-green-700">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Total Mosques: {affiliations.length}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">Click on any mosque to view affiliation details</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AffiliationFormListAdmin;
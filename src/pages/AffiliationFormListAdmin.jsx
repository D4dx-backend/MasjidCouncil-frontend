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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            മസ്ജിദ് അഫിലിയേഷനുള്ള അപേക്ഷ
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Mosque Affiliation Applications
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {/* Card Header */}
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading affiliations...</p>
              </div>
            </div>
          )}

          {/* Mosque List */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mosque Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliation Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {affiliations.length > 0 ? (
                    affiliations.map((affiliation, index) => (
                      <tr 
                        key={affiliation._id || index}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleMasjidClick(affiliation)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {affiliation.name || 'Unknown Mosque'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {affiliation.affiliationNumber || `#${String(index + 1).padStart(3, '0')}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {affiliation.address && affiliation.address[0] ? 
                            `${affiliation.address[0].district || ''}, ${affiliation.jamathArea && affiliation.jamathArea[0] ? affiliation.jamathArea[0].area : ''}` : 
                            'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-blue-600 hover:text-blue-900">View Details</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <p className="text-lg font-medium">No affiliations found</p>
                          <p className="text-sm">No mosque affiliation applications are available at the moment.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Card Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
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
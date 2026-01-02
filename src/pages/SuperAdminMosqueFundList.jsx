import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, X } from "lucide-react";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import SearchFilterControls from "../components/SearchFilterControls";
import SuperAdminMobileBottomNav from "../components/SuperAdminMobileBottomNav";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SuperAdminMosqueFundList = () => {
  const navigate = useNavigate();
  const [mosqueFunds, setMosqueFunds] = useState([]);
  const [filteredMosqueFunds, setFilteredMosqueFunds] = useState([]);
  const [searchFilteredMosqueFunds, setSearchFilteredMosqueFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchMosqueFunds();
  }, []);

  // Handle filtered data from SearchFilterControls
  const handleFilteredDataChange = useCallback((filteredData) => {
    setSearchFilteredMosqueFunds(filteredData);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Apply date range filtering
  useEffect(() => {
    let filtered = [...searchFilteredMosqueFunds];

    if (startDate || endDate) {
      filtered = filtered.filter((fund) => {
        if (!fund.createdAt) return false;

        const submissionDate = new Date(fund.createdAt);
        submissionDate.setHours(0, 0, 0, 0);

        if (startDate && endDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return submissionDate >= start && submissionDate <= end;
        } else if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          return submissionDate >= start;
        } else if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return submissionDate <= end;
        }
        return true;
      });
    }

    setFilteredMosqueFunds(filtered);
    setCurrentPage(1);
  }, [searchFilteredMosqueFunds, startDate, endDate]);

  const fetchMosqueFunds = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mosqueFund/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setMosqueFunds(data.data || []);
        setSearchFilteredMosqueFunds(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch mosque fund applications');
      }
    } catch (error) {
      console.error('Fetch mosque funds error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMasjidClick = (mosqueFund) => {
    // Navigate to detailed view with mosque fund data
    navigate("/superadmin-mosque-fund-details", { state: { mosqueFund } });
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'pending':
        return {
          text: 'Pending',
          className: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium'
        };
      case 'approved':
        return {
          text: 'Approved',
          className: 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
        };
      case 'rejected':
        return {
          text: 'Rejected',
          className: 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'
        };
      default:
        return {
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium'
        };
    }
  };

  // Get unique districts for filter dropdown
  const uniqueDistricts = useMemo(
    () => [...new Set(mosqueFunds.map((mosqueFund) => mosqueFund.district).filter(Boolean))],
    [mosqueFunds]
  );

  // Memoize SearchFilterControls props to avoid infinite update loops
  const searchFields = useMemo(
    () => ["mosqueName", "mckAffiliation", "district", "area"],
    []
  );
  const filterFields = useMemo(() => ["status", "district"], []);
  const uniqueFieldValues = useMemo(() => ({ district: uniqueDistricts }), [uniqueDistricts]);
  const filterFieldLabels = useMemo(() => ({ status: "Status", district: "District" }), []);

  // Pagination logic
  const totalPages = Math.ceil(filteredMosqueFunds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredMosqueFunds.slice(startIndex, endIndex);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SuperAdminSidebar />
      
      <div className="flex-1 min-w-0">
        <div className="p-4 lg:p-8 pb-24 lg:pb-8">
          {/* Page Heading + Date Filter (top right) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
              Masjid Fund
            </h1>
            {/* Desktop/Tablet: Date Filter stays in header (unchanged). Mobile: Date Filter moved below search/filter */}
            <div className="hidden sm:flex items-center h-10 w-full sm:w-auto">
              {!showDateFilter ? (
                <button
                  onClick={() => setShowDateFilter(true)}
                  className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-500 h-10 w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4" />
                  Date Filter
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 animate-in slide-in-from-right-4 duration-500 w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-lg shadow-lg border border-gray-300 items-stretch sm:items-center w-full">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-700">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm h-9 w-full sm:w-auto sm:min-w-[150px]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm h-9 w-full sm:w-auto sm:min-w-[150px]"
                      />
                    </div>
                    <div className="flex items-end h-9">
                      <button
                        onClick={() => {
                          setStartDate('');
                          setEndDate('');
                        }}
                        className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors h-9 font-medium w-full sm:w-auto"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDateFilter(false)}
                    className="flex items-center justify-center w-full sm:w-8 h-10 sm:h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border sm:border-0 border-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search and Filter Controls (always open) */}
          <div className="mb-6">
            <SearchFilterControls
              data={mosqueFunds}
              onFilteredDataChange={handleFilteredDataChange}
              searchFields={searchFields}
              filterFields={filterFields}
              uniqueFieldValues={uniqueFieldValues}
              filterFieldLabels={filterFieldLabels}
              collapseFilters={showDateFilter}
              onFilterToggle={() => setShowDateFilter(false)}
            />
          </div>

          {/* Mobile-only: Date Filter comes AFTER Filter/Search */}
          <div className="sm:hidden mb-4">
            <div className="flex items-center h-10 w-full">
              {!showDateFilter ? (
                <button
                  onClick={() => setShowDateFilter(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-500 h-10 w-full"
                >
                  <Calendar className="w-4 h-4" />
                  Date Filter
                </button>
              ) : (
                <div className="flex flex-col gap-2 animate-in slide-in-from-right-4 duration-500 w-full">
                  <div className="flex flex-col gap-3 bg-white p-3 rounded-lg shadow-lg border border-gray-300 items-stretch w-full">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-700">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm h-9 w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm h-9 w-full"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setStartDate('');
                        setEndDate('');
                      }}
                      className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors h-9 font-medium w-full"
                    >
                      Clear
                    </button>
                  </div>
                  <button
                    onClick={() => setShowDateFilter(false)}
                    className="flex items-center justify-center w-full h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

        {/* Main Content Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border-0">

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
                <p className="mt-4 text-gray-600">Loading mosque fund applications...</p>
              </div>
            </div>
          )}

          {/* Mosque Fund List */}
          {!loading && !error && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#6db14e' }}>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Affiliation Number
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Mosque Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-white uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.length > 0 ? (
                    currentData.map((mosqueFund, index) => (
                      <tr 
                      key={mosqueFund._id || index}
                        className={`hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                        onClick={() => handleMasjidClick(mosqueFund)}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {mosqueFund.mckAffiliation || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {mosqueFund.mosqueName || 'Unknown Mosque'}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {mosqueFund.district && mosqueFund.area ? 
                              `${mosqueFund.district}, ${mosqueFund.area}` : 
                              'Not specified'}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={getStatusDisplay(mosqueFund.status).className}>
                            {getStatusDisplay(mosqueFund.status).text}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 hover:bg-green-100 transition-colors duration-200 group">
                            <svg className="w-5 h-5 text-green-600 group-hover:text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-12 text-center">
                          <div className="text-gray-400">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                            <p className="text-lg font-medium text-gray-500">No mosque fund applications found</p>
                            <p className="text-sm text-gray-400">No mosque fund applications are available at the moment.</p>
                        </div>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredMosqueFunds.length)} of {filteredMosqueFunds.length} results
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 text-sm border rounded-md ${
                            page === currentPage
                              ? 'bg-green-600 text-white border-green-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
        </div>
      </div>
      <SuperAdminMobileBottomNav />
    </div>
  );
};

export default SuperAdminMosqueFundList;

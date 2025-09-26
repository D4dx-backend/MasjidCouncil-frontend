import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Printer, CheckCircle, XCircle } from 'lucide-react';

const SuperAdminAffiliationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [affiliation, setAffiliation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get affiliation data from navigation state or fetch by ID
    if (location.state?.affiliation) {
      setAffiliation(location.state.affiliation);
      setLoading(false);
    } else {
      // If no data in state, you might want to fetch by ID from URL params
      setError('No affiliation data found');
      setLoading(false);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate('/superadmin-affiliation-list');
  };

  const handleEdit = () => {
    // Navigate to edit page if needed
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('ഡൗൺലോഡ് ഫീച്ചർ ഉടൻ ലഭ്യമാകും');
  };

  const handleApprove = () => {
    alert('അപേക്ഷ അനുമതി നൽകി!');
  };

  const handleReject = () => {
    alert('അപേക്ഷ നിരസിച്ചു!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading affiliation details...</p>
        </div>
      </div>
    );
  }

  if (error || !affiliation) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            {error || 'Affiliation data not found'}
          </h2>
          <button
            onClick={handleBack}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Professional Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Affiliation Application Details</h1>
                  <p className="text-gray-600">Review and manage mosque affiliation application</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleEdit}
                className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Mosque Name</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Mosque Type</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.mosqueType || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Mahalla Type</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.mahallaType || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Established Year</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.establishedYear || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Address</label>
                <p className="text-gray-900 whitespace-pre-wrap">{affiliation.address?.[0]?.address || 'Not provided'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">District</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.district || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Pincode</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.pincode || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.email || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Website</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.website || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Jamaat-e-Islami Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jamaat-e-Islami Unit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Area</label>
                <p className="text-gray-900">{affiliation.jamathArea?.[0]?.area || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">District</label>
                <p className="text-gray-900">{affiliation.jamathArea?.[0]?.district || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Mosque Facilities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mosque Facilities</h2>
            {affiliation.facilities && affiliation.facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {affiliation.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-900">{facility}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No facilities selected</p>
            )}
          </div>

          {/* Cemetery Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Cemetery Details</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Has Cemetery?</label>
                <p className="text-gray-900">{affiliation.hasCemetery ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Mosque Capacity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mosque Capacity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Prayer Capacity (People)</label>
                <p className="text-gray-900">{affiliation.mosqueCapacity || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Area</label>
                <p className="text-gray-900">{affiliation.mosqueArea || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Juma Participants */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Friday Participants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Male Participants</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.fridayMaleAttendance || '0'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Female Participants</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.fridayFemaleAttendance || '0'}</p>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Assets (Fixed & Movable)</label>
                <p className="text-gray-900 whitespace-pre-wrap">{affiliation.finance?.[0]?.assets || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Income Sources</label>
                <p className="text-gray-900 whitespace-pre-wrap">{affiliation.finance?.[0]?.incomeSource || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Monthly Expense (₹)</label>
                <p className="text-lg font-medium text-gray-900">₹{affiliation.finance?.[0]?.monthlyExpense || '0'}</p>
              </div>
            </div>
          </div>

          {/* Official Records */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Official Records</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Audit Conducted?</label>
                <p className="text-gray-900">{affiliation.audit?.[0]?.hasAudit ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Records Maintained</label>
                {affiliation.audit?.[0]?.recordsKept && affiliation.audit[0].recordsKept.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                    {affiliation.audit[0].recordsKept.map((record, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-900 text-sm">{record}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No records selected</p>
                )}
              </div>
            </div>
          </div>

          {/* Last Year Accounts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Last Year Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Income (₹)</label>
                <p className="text-lg font-medium text-green-600">₹{affiliation.accounts?.[0]?.lastYearIncome || '0'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Expense (₹)</label>
                <p className="text-lg font-medium text-red-600">₹{affiliation.accounts?.[0]?.lastYearExpense || '0'}</p>
              </div>
            </div>
          </div>

          {/* Community Services */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Services</h2>
            <div className="space-y-4">
              {affiliation.commmunityServices && affiliation.commmunityServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {affiliation.commmunityServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-900">{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No services selected</p>
              )}
              {affiliation.otherCommunityServices && affiliation.otherCommunityServices.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Others</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{affiliation.otherCommunityServices.join('\n')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Managing Committee */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Managing Committee</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Committee Name</label>
                <p className="text-gray-900">{affiliation.committees?.[0]?.committeeType || 'Not provided'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-3 text-blue-800">President / Chairman</h3>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-500">Name:</span> {affiliation.committees?.[0]?.president?.[0]?.name || 'Not provided'}</p>
                    <p><span className="text-sm text-gray-500">Mobile:</span> {affiliation.committees?.[0]?.president?.[0]?.phone || 'Not provided'}</p>
                    <p><span className="text-sm text-gray-500">Email:</span> {affiliation.committees?.[0]?.president?.[0]?.email || 'Not provided'}</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium mb-3 text-green-800">Secretary</h3>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-500">Name:</span> {affiliation.committees?.[0]?.secretary?.[0]?.name || 'Not provided'}</p>
                    <p><span className="text-sm text-gray-500">Mobile:</span> {affiliation.committees?.[0]?.secretary?.[0]?.phone || 'Not provided'}</p>
                    <p><span className="text-sm text-gray-500">Email:</span> {affiliation.committees?.[0]?.secretary?.[0]?.email || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Staff Details</h2>
            {affiliation.committees?.[0]?.workers && affiliation.committees[0].workers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-500">No.</th>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-500">Age</th>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-500">Qualification</th>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-500">Salary</th>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-500">Working</th>
                      <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-500">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliation.committees[0].workers.map((staff, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-3">{index + 1}</td>
                        <td className="border border-gray-200 p-3">{staff.age || '-'}</td>
                        <td className="border border-gray-200 p-3">{staff.qualification || '-'}</td>
                        <td className="border border-gray-200 p-3">{staff.salary || '-'}</td>
                        <td className="border border-gray-200 p-3">{staff.working || '-'}</td>
                        <td className="border border-gray-200 p-3">{staff.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No staff details provided</p>
            )}
          </div>

          {/* Super Admin Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Super Admin Actions</h2>
            <div className="flex justify-between mt-4">
              <button 
                onClick={handleApprove}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                Approve Application
              </button>
              <button 
                onClick={handleReject}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Reject Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAffiliationDetails;
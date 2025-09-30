import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import SuperAdminNavbar from '../components/SuperAdminNavbar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SuperAdminMedicalAidDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success', 'error', 'warning'
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    // Get the medical aid ID from location state
    const medicalAidId = location.state?.medicalAid?._id;
    
    if (medicalAidId) {
      fetchMedicalAidDetails(medicalAidId);
    } else {
      setError('No medical aid data found');
      setLoading(false);
    }
  }, [location.state]);

  const fetchMedicalAidDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/welfarefund/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setFormData(data.data);
      } else {
        setError(data.message || 'Failed to fetch medical aid details');
      }
    } catch (error) {
      console.error('Fetch medical aid details error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const showAlert = (message, type = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlertModal(true);
  };

  const closeAlert = () => {
    setShowAlertModal(false);
    setAlertMessage('');
  };

  const handleConfirmClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        showAlert('No admin token found. Please login again.', 'error');
        setShowConfirmModal(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/welfarefund/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'approved'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        showAlert('Medical aid application approved successfully!', 'success');
        setShowConfirmModal(false);
        // Update the local state
        setFormData({ ...formData, status: 'approved' });
      } else {
        showAlert('Failed to approve application: ' + data.message, 'error');
        setShowConfirmModal(false);
      }
    } catch (error) {
      console.error('Approve application error:', error);
      showAlert('Network error. Please try again.', 'error');
      setShowConfirmModal(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        showAlert('No admin token found. Please login again.', 'error');
        setShowRejectModal(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/welfarefund/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'rejected'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        showAlert('Medical aid application rejected successfully!', 'success');
        setShowRejectModal(false);
        // Update the local state
        setFormData({ ...formData, status: 'rejected' });
      } else {
        showAlert('Failed to reject application: ' + data.message, 'error');
        setShowRejectModal(false);
      }
    } catch (error) {
      console.error('Reject application error:', error);
      showAlert('Network error. Please try again.', 'error');
      setShowRejectModal(false);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medical aid details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4" style={{ fontFamily: "Anek Malayalam Variable" }}>
            Error: {error}
          </h2>
          <button 
            onClick={handleBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600" style={{ fontFamily: "Anek Malayalam Variable" }}>
            ഡാറ്റ ലഭ്യമല്ല
          </h2>
          <button 
            onClick={handleBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Use actual formData instead of dummy data
  const displayData = formData || {};

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('ഡൗൺലോഡ് ഫീച്ചർ ഉടൻ ലഭ്യമാകും');
  };

  const handleApprove = () => {
    alert('അപേക്ഷ അനുമതി നൽകി!');
  };

  const handleRejectOld = () => {
    alert('അപേക്ഷ നിരസിച്ചു!');
  };

  const getStatusBadge = (status) => {
    const styles = {
      'പരിഗണനയിൽ': 'bg-yellow-100 text-yellow-800',
      'അനുമതി': 'bg-green-100 text-green-800',
      'നിരസിച്ചു': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Anek Malayalam Variable" }}>
      <SuperAdminNavbar />
      <div className="p-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5e9e44] to-[#9ece88] text-white p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
              <button 
              onClick={handleBack}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
              >
              <ArrowLeft className="w-5 h-5" />
              </button>
                <div>
              <h1 className="text-xl font-bold">ഇമാം മുഅദ്ദിൻ ക്ഷേമനിദി അപേക്ഷ</h1>
              <p className="text-green-100 text-sm">Medical Aid Application Details</p>
              <p className="text-green-200 text-xs">Application ID: {formData._id?.slice(-8) || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Application Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Application ID</label>
                <p className="text-lg font-bold text-blue-600">{displayData.applicationId || displayData._id?.slice(-8) || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Submission Date</label>
                <p className="text-lg font-medium text-gray-900">{displayData.submissionDate || (displayData.createdAt ? new Date(displayData.createdAt).toLocaleDateString() : 'N/A')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">{getStatusBadge(displayData.status || 'pending')}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Requested Amount</label>
                <p className="text-lg font-bold text-red-600">₹{displayData.requestedAmount || displayData.expectedExpense || '0'}</p>
              </div>
            </div>
          </div>

          {/* Mosque Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mosque Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Mosque Name</label>
                <p className="text-lg font-medium text-gray-900">{displayData.mosqueName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">MCK Affiliation Number</label>
                <p className="text-lg font-medium text-gray-900">{displayData.mckAffiliation || 'N/A'}</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-gray-900 whitespace-pre-wrap">{displayData.address || 'N/A'}</p>
            </div>
          </div>

          {/* Management Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Management Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Committee President</label>
                <p className="text-gray-900">{displayData.committeePerson || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Management Type</label>
                <p className="text-gray-900">{displayData.managementType || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900">{displayData.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">WhatsApp</label>
                <p className="text-gray-900">{displayData.whatsapp || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">President Phone</label>
                <p className="text-gray-900">{displayData.presidentPhone || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">President/Chairman</label>
                <p className="text-gray-900">{displayData.presidentChairman || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Jamaat Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jamaat Islami Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Jamaat Unit</label>
                <p className="text-gray-900">{displayData.jammatDetails || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Area</label>
                <p className="text-gray-900">{displayData.area || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">District</label>
                <p className="text-gray-900">{displayData.district || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Applicant Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Applicant Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Application For</label>
                  <p className="text-lg font-medium text-gray-900">{displayData.applicantDetails || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Position</label>
                  <p className="text-gray-900">{displayData.chairmanDesignation || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Salary</label>
                  <p className="text-lg font-medium text-green-600">₹{displayData.salary || '0'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Request Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Help Request Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Purpose of Help</label>
                <p className="text-lg font-medium text-blue-600">{displayData.helpPurpose || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Detailed Description</label>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{displayData.needDescription || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Expected Expense</label>
                  <p className="text-xl font-bold text-red-600">₹{displayData.expectedExpense || '0'}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Own Contribution</label>
                  <p className="text-xl font-bold text-green-600">₹{displayData.ownContribution || '0'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Help */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Previous Help</h2>
            <div>
              <label className="text-sm font-medium text-gray-500">Previous Help from MCK</label>
              <p className="text-lg font-medium text-gray-900">{displayData.previousHelp || 'N/A'}</p>
            </div>
          </div>

          {/* Mosque Officials */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mosque Officials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-3 text-blue-800">President / Secretary</h3>
                <div className="space-y-2">
                  <p><span className="text-sm text-gray-500">Name:</span> {displayData.mosquePresident || 'N/A'}</p>
                  <p><span className="text-sm text-gray-500">Phone:</span> {displayData.mosquePhone || 'N/A'}</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-3 text-green-800">Emergency Contact</h3>
                <div className="space-y-2">
                  <p><span className="text-sm text-gray-500">Name:</span> {displayData.emergencyContact || 'N/A'}</p>
                  <p><span className="text-sm text-gray-500">Phone:</span> {displayData.emergencyPhone || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900">Employee Aadhaar Copy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900">Mosque Bank Passbook Copy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900">House Repair Estimate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900">House Photos</span>
              </div>
            </div>
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
    </div>
  );
};

export default SuperAdminMedicalAidDetails;


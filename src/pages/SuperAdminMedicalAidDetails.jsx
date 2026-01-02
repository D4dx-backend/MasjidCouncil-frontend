import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader2, Settings, Download } from 'lucide-react';
import StatusChangeModal from '../components/StatusChangeModal';
import logoPng from '../assets/logo.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SuperAdminMedicalAidDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success', 'error', 'warning'
  const [actionLoading, setActionLoading] = useState(false);
  const [showStatusChangeModal, setShowStatusChangeModal] = useState(false);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);

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

  // Status Change Functions
  const handleStatusChangeClick = () => {
    setShowStatusChangeModal(true);
  };

  const handleStatusChange = async (newStatus, rejectionReason) => {
    setStatusChangeLoading(true);
    try {
      const token = localStorage.getItem('superAdminToken') || localStorage.getItem('adminToken');
      if (!token) {
        showAlert('No super admin token found. Please login again.', 'error');
        setShowStatusChangeModal(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/superadmin/welfare-fund/${formData._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          rejectionReason: rejectionReason || null
        })
      });

      const data = await response.json();
      
      if (data.success) {
        showAlert(`Medical aid status changed to ${newStatus} successfully!`, 'success');
        setShowStatusChangeModal(false);
        // Update the local state
        setFormData({ 
          ...formData, 
          status: newStatus, 
          rejectionReason: rejectionReason || null,
          updatedAt: new Date()
        });
      } else {
        showAlert('Failed to change status: ' + data.message, 'error');
        setShowStatusChangeModal(false);
      }
    } catch (error) {
      console.error('Status change error:', error);
      showAlert('Network error. Please try again.', 'error');
      setShowStatusChangeModal(false);
    } finally {
      setStatusChangeLoading(false);
    }
  };

  const handleConfirmClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('superAdminToken') || localStorage.getItem('adminToken');
      if (!token) {
        showAlert('No super admin token found. Please login again.', 'error');
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
    if (!rejectionReason.trim()) {
      showAlert('Please provide a reason for rejection.', 'error');
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem('superAdminToken') || localStorage.getItem('adminToken');
      if (!token) {
        showAlert('No super admin token found. Please login again.', 'error');
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
          status: 'rejected',
          rejectionReason: rejectionReason.trim()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        showAlert('Medical aid application rejected successfully!', 'success');
        setShowRejectModal(false);
        setRejectionReason('');
        // Update the local state
        setFormData({ ...formData, status: 'rejected', rejectionReason: rejectionReason.trim() });
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

  const handlePrint = async () => {
    if (!formData) {
      showAlert('No form data available to print', 'error');
      return;
    }

    const originalTitle = document.title;
    const baseName = `MedicalAid-${displayData._id?.slice(-8) || displayData._id || 'Application'}`;

    let fallbackTimer;

    const cleanup = () => {
      window.removeEventListener('afterprint', afterPrintHandler);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      document.title = originalTitle;
      setPrintLoading(false);
    };

    const afterPrintHandler = () => {
      cleanup();
    };

    window.addEventListener('afterprint', afterPrintHandler);
    fallbackTimer = setTimeout(afterPrintHandler, 15000);

    setPrintLoading(true);
    document.title = baseName;

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      window.print();
    } catch (err) {
      console.error('Print error:', err);
      showAlert('Failed to open print dialog. Please try again.', 'error');
      cleanup();
    }
  };

  const safeText = (value, fallback = 'വിവരം ഇല്ല') => {
    if (value === null || value === undefined) return fallback;
    const s = String(value).trim();
    return s.length ? s : fallback;
  };

  const safeNumberText = (value, fallback = '0') => {
    if (value === null || value === undefined) return fallback;
    const s = String(value).trim();
    return s.length ? s : fallback;
  };

  // Arabic/Hebrew ranges (RTL scripts)
  const isRtlText = (value) => /[\u0590-\u05FF\u0600-\u06FF\u0750-\u08FF]/.test(String(value || ''));

  const rtlValueStyle = (value) => (
    isRtlText(value)
      ? { direction: 'rtl', textAlign: 'center', fontFamily: 'Arial, "Noto Sans Malayalam", "Anek Malayalam Variable", sans-serif' }
      : {}
  );

  const printStyles = {
    page: {
      background: '#fff',
      color: '#000',
      fontFamily: '"Noto Sans Malayalam", "Anek Malayalam Variable", Arial, sans-serif',
      fontSize: '11pt',
      lineHeight: '1.35',
    },
    headerWrap: { marginBottom: '10pt' },
    headerRow: { display: 'flex', alignItems: 'center', gap: '10pt', marginBottom: '8pt' },
    logo: { width: '52pt', height: '52pt', objectFit: 'contain' },
    titleMl: { fontSize: '14pt', fontWeight: 700, margin: 0 },
    subtitleEn: { fontSize: '11pt', fontWeight: 400, margin: 0 },
    metaRow: { display: 'flex', justifyContent: 'space-between', gap: '12pt', fontSize: '10.5pt' },
    metaItem: { flex: 1 },
    metaLabel: { fontWeight: 700 },
    divider: { borderTop: '1pt solid #000', margin: '8pt 0 0 0' },
    section: { marginTop: '12pt' },
    sectionTitle: { fontSize: '12pt', fontWeight: 700, margin: '0 0 6pt 0' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
      width: '34%',
      border: '0.75pt solid #000',
      padding: '4pt 6pt',
      textAlign: 'left',
      verticalAlign: 'top',
      fontWeight: 700,
    },
    td: {
      border: '0.75pt solid #000',
      padding: '4pt 6pt',
      textAlign: 'left',
      verticalAlign: 'top',
      fontWeight: 400,
      wordBreak: 'break-word',
      whiteSpace: 'pre-wrap',
    },
    list: { margin: '0', paddingLeft: '16pt' },
    listItem: { margin: '0 0 2pt 0' },
    footer: { marginTop: '14pt', fontSize: '9pt', textAlign: 'center' },
  };

  const statusMl =
    displayData.status === 'approved'
      ? 'അനുമതി'
      : displayData.status === 'rejected'
      ? 'നിരസിച്ചു'
      : 'പരിഗണനയിൽ';

  const submittedDate = displayData.submissionDate
    ? safeText(displayData.submissionDate, 'N/A')
    : (displayData.createdAt ? new Date(displayData.createdAt).toLocaleDateString('ml-IN') : 'N/A');

  const expectedExpense = parseInt(displayData.expectedExpense || 0, 10);
  const ownContribution = parseInt(displayData.ownContribution || 0, 10);
  const requestedAmount = expectedExpense - ownContribution;

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
    <>
    <div className="screen-only">
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Anek Malayalam Variable" }}>
      <div className="p-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5e9e44] to-[#9ece88] text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between gap-3">
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

              <button
                onClick={handlePrint}
                disabled={printLoading}
                className="flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 font-semibold px-4 py-2 rounded-md shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {printLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Print / Save PDF</span>
                  </>
                )}
              </button>
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
            
            {/* Show buttons only if status is pending */}
            {formData.status === 'pending' ? (
              <div className="flex gap-3">
                <button 
                  onClick={handleConfirmClick}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Application
                </button>
                <button 
                  onClick={handleRejectClick}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Application
                </button>
              </div>
            ) : (
              /* Show simple status if already processed */
              <div className="text-center py-4">
                {formData.status === 'approved' ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Application Approved</span>
                  </div>
                ) : formData.status === 'rejected' ? (
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Application Rejected</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-yellow-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Application Pending</span>
                  </div>
                )}
                {/* Status Change Button */}
                <div className="mt-4">
                  <button
                    onClick={handleStatusChangeClick}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Change Status
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Approval</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to approve this medical aid application? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Approving...
                  </div>
                ) : (
                  'Approve Application'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <XCircle className="w-8 h-8 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Rejection</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to reject this medical aid application? This action cannot be undone.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                rows={3}
                required
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Rejecting...
                  </div>
                ) : (
                  'Reject Application'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              {alertType === 'success' && <CheckCircle className="w-8 h-8 text-green-600 mr-3" />}
              {alertType === 'error' && <XCircle className="w-8 h-8 text-red-600 mr-3" />}
              {alertType === 'warning' && <AlertCircle className="w-8 h-8 text-yellow-600 mr-3" />}
              <h3 className="text-lg font-semibold text-gray-900">
                {alertType === 'success' && 'Success'}
                {alertType === 'error' && 'Error'}
                {alertType === 'warning' && 'Warning'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">{alertMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={closeAlert}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      <StatusChangeModal
        isOpen={showStatusChangeModal}
        onClose={() => setShowStatusChangeModal(false)}
        currentStatus={formData?.status}
        onStatusChange={handleStatusChange}
        loading={statusChangeLoading}
        formType="Medical Aid"
      />
    </div>
    </div>

    {/* Print-only document (browser-native PDF generation via window.print()) */}
    <div className="print-only">
      <div style={printStyles.page}>
        <div style={printStyles.headerWrap} className="print-avoid-break">
          <div style={printStyles.headerRow}>
            <img src={logoPng} alt="Masjid Council Kerala" style={printStyles.logo} />
            <div>
              <p style={printStyles.titleMl}>ഇമാം മുഅദ്ദിൻ ക്ഷേമനിദി അപേക്ഷ</p>
              <p style={printStyles.subtitleEn}>Medical Aid Application Details</p>
            </div>
          </div>

          <div style={printStyles.metaRow}>
            <div style={printStyles.metaItem}>
              <span style={printStyles.metaLabel}>Application ID: </span>
              <span>{safeText(displayData._id?.slice(-8) || displayData._id, 'N/A')}</span>
            </div>
            <div style={printStyles.metaItem}>
              <span style={printStyles.metaLabel}>Status: </span>
              <span>{safeText(statusMl, 'N/A')}</span>
            </div>
            <div style={printStyles.metaItem}>
              <span style={printStyles.metaLabel}>Submitted: </span>
              <span>{safeText(submittedDate, 'N/A')}</span>
            </div>
          </div>

          <div style={printStyles.metaRow}>
            <div style={printStyles.metaItem}>
              <span style={printStyles.metaLabel}>Requested Amount: </span>
              <span>₹{safeNumberText(String(requestedAmount))}</span>
            </div>
            <div style={printStyles.metaItem}>
              <span style={printStyles.metaLabel}>Expected Expense: </span>
              <span>₹{safeNumberText(displayData.expectedExpense)}</span>
            </div>
            <div style={printStyles.metaItem}>
              <span style={printStyles.metaLabel}>Own Contribution: </span>
              <span>₹{safeNumberText(displayData.ownContribution)}</span>
            </div>
          </div>

          <div style={printStyles.divider} />
        </div>

        {/* Mosque Information */}
        <div style={printStyles.section} className="print-avoid-break">
          <p style={printStyles.sectionTitle}>മസ്ജിദ് വിവരങ്ങൾ</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>മസ്ജിദിന്റെ പേര്</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(displayData.mosqueName) }}>{safeText(displayData.mosqueName, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>MCK അഫിലിയേഷൻ നമ്പർ</th>
                <td style={printStyles.td}>{safeText(displayData.mckAffiliation, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>വിലാസം</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(displayData.address) }}>{safeText(displayData.address, 'N/A')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Management Details */}
        <div style={printStyles.section} className="print-avoid-break">
          <p style={printStyles.sectionTitle}>മാനേജ്മെന്റ് വിവരങ്ങൾ</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>പരിപാലന കമ്മിറ്റി പ്രസിഡന്റ്</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(displayData.committeePerson) }}>{safeText(displayData.committeePerson, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>മാനേജ്മെന്റ് തരം</th>
                <td style={printStyles.td}>{safeText(displayData.managementType, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>ഫോൺ</th>
                <td style={printStyles.td}>{safeText(displayData.phone, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>വാട്സ്ആപ്പ്</th>
                <td style={printStyles.td}>{safeText(displayData.whatsapp, 'N/A')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Jamaat Details */}
        <div style={printStyles.section} className="print-avoid-break">
          <p style={printStyles.sectionTitle}>ജമാഅത്തെ ഇസ്‌ലാമി വിവരങ്ങൾ</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>ഏരിയ</th>
                <td style={printStyles.td}>{safeText(displayData.area, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>ജില്ല</th>
                <td style={printStyles.td}>{safeText(displayData.district, 'N/A')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Applicant Details */}
        <div style={printStyles.section} className="print-avoid-break">
          <p style={printStyles.sectionTitle}>അപേക്ഷ വിവരങ്ങൾ</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>അപേക്ഷ സമർപ്പിക്കുന്നത് ആർക്കാണ് വേണ്ടി</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(displayData.applicantDetails) }}>{safeText(displayData.applicantDetails, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>ജോലി ചെയ്യുന്ന തസ്‌തിക</th>
                <td style={printStyles.td}>{safeText(displayData.chairmanDesignation, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>വേതനം</th>
                <td style={printStyles.td}>₹{safeNumberText(displayData.salary)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Help Request */}
        <div style={printStyles.section}>
          <p style={printStyles.sectionTitle}>സഹായാഭ്യർത്ഥന വിവരങ്ങൾ</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>സഹായത്തിന്റെ ഉദ്ദേശ്യം</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(displayData.helpPurpose) }}>{safeText(displayData.helpPurpose, 'N/A')}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>ആവശ്യത്തിന്റെ വിശദവിവരം</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(displayData.needDescription) }}>{safeText(displayData.needDescription, 'N/A')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Previous Help */}
        <div style={printStyles.section} className="print-avoid-break">
          <p style={printStyles.sectionTitle}>മുമ്പത്തെ സഹായം</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>MCK യിൽ നിന്ന് മുമ്പ് സഹായം ലഭിച്ചിട്ടുണ്ടോ?</th>
                <td style={printStyles.td}>{safeText(displayData.previousHelp, 'N/A')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Officials */}
        <div style={printStyles.section} className="print-avoid-break">
          <p style={printStyles.sectionTitle}>മസ്‌ജിദ് ഉദ്യോഗസ്ഥ വിവരങ്ങൾ</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>പ്രസിഡന്‍റ് / സെക്രട്ടറി</th>
                <td style={printStyles.td}>
                  {safeText(displayData.mosquePresident, '-')}{'\n'}
                  ഫോൺ: {safeText(displayData.mosquePhone, '-')}
                </td>
              </tr>
              <tr>
                <th style={printStyles.th}>അടിയന്തിര ബന്ധം</th>
                <td style={printStyles.td}>
                  {safeText(displayData.emergencyContact, '-')}{'\n'}
                  ഫോൺ: {safeText(displayData.emergencyPhone, '-')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Required Documents */}
        <div style={printStyles.section} className="print-avoid-break">
          <p style={printStyles.sectionTitle}>ആവശ്യമായ രേഖകൾ</p>
          <ul style={printStyles.list}>
            <li style={printStyles.listItem}>ജീവനക്കാരന്റെ ആധാർ കോപ്പി</li>
            <li style={printStyles.listItem}>മസ്ജിദ് ബാങ്ക് പാസ് ബുക്ക് കോപ്പി</li>
            <li style={printStyles.listItem}>വീട് റിപ്പയർ എസ്റ്റിമേറ്റ്</li>
            <li style={printStyles.listItem}>വീടിന്റെ ഫോട്ടോകൾ</li>
          </ul>
        </div>

        {/* Rejection reason */}
        {displayData.status === 'rejected' && safeText(displayData.rejectionReason, '').trim() ? (
          <div style={printStyles.section} className="print-avoid-break">
            <p style={printStyles.sectionTitle}>നിരസിക്കൽ കാരണം</p>
            <div style={{ border: '0.75pt solid #000', padding: '6pt', whiteSpace: 'pre-wrap' }}>
              {safeText(displayData.rejectionReason)}
            </div>
          </div>
        ) : null}

        <div style={printStyles.footer}>
          Generated on: {new Date().toLocaleDateString('en-IN')}
        </div>
      </div>
    </div>

    </>
  );
};

export default SuperAdminMedicalAidDetails;


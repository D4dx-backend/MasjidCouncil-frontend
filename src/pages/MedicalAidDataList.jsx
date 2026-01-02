import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader2, Download } from 'lucide-react';
import logoPng from '../assets/logo.png';
import AdminMobileBottomNav from '../components/AdminMobileBottomNav';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MedicalAidDataList = () => {
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

  const handlePrint = async () => {
    if (!formData) {
      showAlert('No form data available to print', 'error');
      return;
    }

    const originalTitle = document.title;
    const baseName = `MedicalAid-${formData._id?.slice(-8) || formData._id || 'Application'}`;

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
    if (!rejectionReason.trim()) {
      showAlert('Please provide a reason for rejection.', 'error');
      return;
    }

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
      <>
        <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading medical aid details...</p>
          </div>
        </div>
        <AdminMobileBottomNav />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-0 flex items-center justify-center">
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
        <AdminMobileBottomNav />
      </>
    );
  }

  if (!formData) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-0 flex items-center justify-center">
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
        <AdminMobileBottomNav />
      </>
    );
  }

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

  const submittedDate = formData.createdAt ? new Date(formData.createdAt).toLocaleDateString('ml-IN') : 'N/A';
  const statusMl = formData.status === 'approved' ? 'അനുമതി' : formData.status === 'rejected' ? 'നിരസിച്ചു' : 'പരിഗണനയിൽ';
  const expectedExpense = parseInt(formData.expectedExpense || 0, 10);
  const ownContribution = parseInt(formData.ownContribution || 0, 10);
  const requestedAmount = expectedExpense - ownContribution;

  return (
    <>
    <div className="screen-only">
    <div className="min-h-screen bg-gray-50 p-4 pb-24 lg:pb-4" style={{ fontFamily: "Anek Malayalam Variable" }}>
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

        <div className="p-8 space-y-8 mt-4">
          {/* Application Summary */}
          <section className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">അപേക്ഷാ സംഗ്രഹം</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">അപേക്ഷാ നമ്പർ</label>
                <p className="text-lg font-bold text-blue-600">{formData._id?.slice(-8) || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">സമർപ്പിച്ച തീയതി</label>
                <p className="text-lg font-medium text-gray-900">
                  {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString('ml-IN') : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">അപേക്ഷയുടെ നിലവിലെ അവസ്ഥ</label>
                <div className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    formData.status === 'approved' ? 'bg-green-100 text-green-800' :
                    formData.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formData.status === 'approved' ? 'അനുമതി' :
                     formData.status === 'rejected' ? 'നിരസിച്ചു' :
                     'പരിഗണനയിൽ'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ആവശ്യപ്പെടുന്ന തുക</label>
                <p className="text-lg font-bold text-red-600">₹{formData.expectedExpense || '0'}</p>
              </div>
            </div>
          </section>

          {/* Mosque Information */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മസ്ജിദ് വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">മസ്ജിദിന്റെ പേര്</label>
                <p className="text-lg font-medium text-gray-900">{formData.mosqueName || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">MCK അഫിലിയേഷൻ നമ്പർ</label>
                <p className="text-lg font-medium text-gray-900">{formData.mckAffiliation || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">വിലാസം</label>
              <p className="text-gray-900 whitespace-pre-wrap">{formData.address || 'വിവരം ഇല്ല'}</p>
            </div>
          </section>

          {/* Management Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മാനേജ്മെന്റ് വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">പരിപാലന കമ്മിറ്റി പ്രസിഡന്റ്</label>
                <p className="text-gray-900">{formData.committeePerson || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">മാനേജ്മെന്റ് തരം</label>
                <p className="text-gray-900">{formData.managementType || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ഫോൺ</label>
                <p className="text-gray-900">{formData.phone || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">വാട്സ്ആപ്പ്</label>
                <p className="text-gray-900">{formData.whatsapp || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Jamaat Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജമാഅത്തെ ഇസ്‌ലാമി വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ഏരിയ</label>
                <p className="text-gray-900">{formData.area || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ജില്ല</label>
                <p className="text-gray-900">{formData.district || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Applicant Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">അപേക്ഷ വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">അപേക്ഷ സമർപ്പിക്കുന്നത് ആർക്കാണ് വേണ്ടി</label>
                  <p className="text-lg font-medium text-gray-900">{formData.applicantDetails || 'വിവരം ഇല്ല'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">ജോലി ചെയ്യുന്ന തസ്‌തിക</label>
                  <p className="text-gray-900">{formData.chairmanDesignation || 'വിവരം ഇല്ല'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">വേതനം</label>
                  <p className="text-lg font-medium text-green-600">₹{formData.salary || '0'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Help Request Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">സഹായാഭ്യർത്ഥന വിവരങ്ങൾ</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">സഹായത്തിന്റെ ഉദ്ദേശ്യം</label>
                <p className="text-lg font-medium text-blue-600">{formData.helpPurpose || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ആവശ്യത്തിന്റെ വിശദവിവരം</label>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{formData.needDescription || 'വിവരം ഇല്ല'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">പ്രതീക്ഷിക്കുന്ന ചെലവ്</label>
                  <p className="text-xl font-bold text-red-600">₹{formData.expectedExpense || '0'}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">സ്വന്തം സംഭാവന</label>
                  <p className="text-xl font-bold text-green-600">₹{formData.ownContribution || '0'}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">ആവശ്യപ്പെടുന്ന തുക</label>
                  <p className="text-xl font-bold text-blue-600">₹{(parseInt(formData.expectedExpense || 0) - parseInt(formData.ownContribution || 0)).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Previous Help */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മുമ്പത്തെ സഹായം</h2>
            <div>
              <label className="text-sm font-medium text-gray-600">MCK യിൽ നിന്ന് മുമ്പ് സഹായം ലഭിച്ചിട്ടുണ്ടോ?</label>
              <p className="text-lg font-medium text-gray-900">{formData.previousHelp || 'വിവരം ഇല്ല'}</p>
            </div>
          </section>

          {/* Mosque Officials */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മസ്‌ജിദ് ഉദ്യോഗസ്ഥ വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-3 text-blue-800">പ്രസിഡന്‍റ് / സെക്രട്ടറി</h3>
                <div className="space-y-2">
                  <p><span className="text-sm text-gray-600">പേര്:</span> {formData.mosquePresident || 'വിവരം ഇല്ല'}</p>
                  <p><span className="text-sm text-gray-600">ഫോൺ:</span> {formData.mosquePhone || 'വിവരം ഇല്ല'}</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-3 text-green-800">അടിയന്തിര ബന്ധം</h3>
                <div className="space-y-2">
                  <p><span className="text-sm text-gray-600">പേര്:</span> {formData.emergencyContact || 'വിവരം ഇല്ല'}</p>
                  <p><span className="text-sm text-gray-600">ഫോൺ:</span> {formData.emergencyPhone || 'വിവരം ഇല്ല'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Required Documents Checklist */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ആവശ്യമായ രേഖകൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900">ജീവനക്കാരന്റെ ആധാർ കോപ്പി</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900">മസ്ജിദ് ബാങ്ക് പാസ് ബുക്ക് കോപ്പി</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900">വീട് റിപ്പയർ എസ്റ്റിമേറ്റ്</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900">വീടിന്റെ ഫോട്ടോകൾ</span>
              </div>
            </div>
          </section>

          {/* Action Buttons - Only show for pending status */}
          {formData.status === 'pending' && (
            <div className="flex justify-between mt-8">
              <button 
                onClick={handleConfirmClick}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow"
              >
                Approve
  </button>
              <button 
                onClick={handleRejectClick}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md shadow"
              >
    Reject
  </button>
</div>
          )}

          {/* Status Display for non-pending forms */}
          {formData.status !== 'pending' && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Application Status</h3>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  formData.status === 'approved' 
                    ? 'bg-green-100 text-green-800' 
                    : formData.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {formData.status === 'approved' ? '✅ Approved' : 
                   formData.status === 'rejected' ? '❌ Rejected' : 
                   '❓ Unknown Status'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Modals */}
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Confirm Approval</h3>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Are you sure you want to approve this medical aid application? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={actionLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md flex items-center"
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Processing...
                  </>
                ) : (
                  'Approve'
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
              <div className="flex-shrink-0">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Confirm Rejection</h3>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Are you sure you want to reject this medical aid application? This action cannot be undone.
              </p>
            </div>
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
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md flex items-center"
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Processing...
                  </>
                ) : (
                  'Reject'
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
              <div className="flex-shrink-0">
                {alertType === 'success' && <CheckCircle className="h-8 w-8 text-green-600" />}
                {alertType === 'error' && <XCircle className="h-8 w-8 text-red-600" />}
                {alertType === 'warning' && <AlertCircle className="h-8 w-8 text-yellow-600" />}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  {alertType === 'success' && 'Success'}
                  {alertType === 'error' && 'Error'}
                  {alertType === 'warning' && 'Warning'}
                </h3>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">{alertMessage}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeAlert}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  alertType === 'success' ? 'bg-green-600 hover:bg-green-700' :
                  alertType === 'error' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                OK
              </button>
        </div>
      </div>
        </div>
      )}
    </div>
    </div>
    <AdminMobileBottomNav />

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
              <span>{safeText(formData._id?.slice(-8) || formData._id, 'N/A')}</span>
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
              <span>₹{safeNumberText(formData.expectedExpense)}</span>
            </div>
            <div style={printStyles.metaItem}>
              <span style={printStyles.metaLabel}>Own Contribution: </span>
              <span>₹{safeNumberText(formData.ownContribution)}</span>
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
                <td style={{ ...printStyles.td, ...rtlValueStyle(formData.mosqueName) }}>{safeText(formData.mosqueName)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>MCK അഫിലിയേഷൻ നമ്പർ</th>
                <td style={printStyles.td}>{safeText(formData.mckAffiliation)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>വിലാസം</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(formData.address) }}>{safeText(formData.address)}</td>
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
                <td style={{ ...printStyles.td, ...rtlValueStyle(formData.committeePerson) }}>{safeText(formData.committeePerson)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>മാനേജ്മെന്റ് തരം</th>
                <td style={printStyles.td}>{safeText(formData.managementType)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>ഫോൺ</th>
                <td style={printStyles.td}>{safeText(formData.phone)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>വാട്സ്ആപ്പ്</th>
                <td style={printStyles.td}>{safeText(formData.whatsapp)}</td>
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
                <td style={printStyles.td}>{safeText(formData.area)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>ജില്ല</th>
                <td style={printStyles.td}>{safeText(formData.district)}</td>
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
                <td style={{ ...printStyles.td, ...rtlValueStyle(formData.applicantDetails) }}>{safeText(formData.applicantDetails)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>ജോലി ചെയ്യുന്ന തസ്‌തിക</th>
                <td style={printStyles.td}>{safeText(formData.chairmanDesignation)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>വേതനം</th>
                <td style={printStyles.td}>₹{safeNumberText(formData.salary)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Help Request Details */}
        <div style={printStyles.section}>
          <p style={printStyles.sectionTitle}>സഹായാഭ്യർത്ഥന വിവരങ്ങൾ</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>സഹായത്തിന്റെ ഉദ്ദേശ്യം</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(formData.helpPurpose) }}>{safeText(formData.helpPurpose)}</td>
              </tr>
              <tr>
                <th style={printStyles.th}>ആവശ്യത്തിന്റെ വിശദവിവരം</th>
                <td style={{ ...printStyles.td, ...rtlValueStyle(formData.needDescription) }}>{safeText(formData.needDescription)}</td>
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
                <td style={printStyles.td}>{safeText(formData.previousHelp)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mosque Officials */}
        <div style={printStyles.section} className="print-avoid-break">
          <p style={printStyles.sectionTitle}>മസ്‌ജിദ് ഉദ്യോഗസ്ഥ വിവരങ്ങൾ</p>
          <table style={printStyles.table}>
            <tbody>
              <tr>
                <th style={printStyles.th}>പ്രസിഡന്‍റ് / സെക്രട്ടറി</th>
                <td style={printStyles.td}>
                  {safeText(formData.mosquePresident, '-')}{'\n'}
                  ഫോൺ: {safeText(formData.mosquePhone, '-')}
                </td>
              </tr>
              <tr>
                <th style={printStyles.th}>അടിയന്തിര ബന്ധം</th>
                <td style={printStyles.td}>
                  {safeText(formData.emergencyContact, '-')}{'\n'}
                  ഫോൺ: {safeText(formData.emergencyPhone, '-')}
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
        {formData.status === 'rejected' && safeText(formData.rejectionReason, '').trim() ? (
          <div style={printStyles.section} className="print-avoid-break">
            <p style={printStyles.sectionTitle}>നിരസിക്കൽ കാരണം</p>
            <div style={{ border: '0.75pt solid #000', padding: '6pt', whiteSpace: 'pre-wrap' }}>
              {safeText(formData.rejectionReason)}
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

export default MedicalAidDataList;

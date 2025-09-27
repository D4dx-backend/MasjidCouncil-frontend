import React from 'react';
import { ArrowLeft, Download, Edit, Printer, CheckCircle, XCircle } from 'lucide-react';

const SuperAdminMedicalAidDetails = ({ onBack, onEdit }) => {
  // Comprehensive dummy data for medical aid application
  const formData = {
    // Mosque Details
    mosqueName: "ജുമാഅ മസ്ജിദ് അൽ നൂർ",
    mckAffiliation: "MCK/2023/001",
    address: "അൽ നൂർ മസ്ജിദ്\nമെയിൻ റോഡ്\nകണയാന്നൂർ\nഎറണാകുളം ജില്ല\nകേരളം - 682312",
    
    // Management Details
    committeePerson: "ഹാജി അബ്ദുൽ റഹ്മാൻ",
    managementType: "മാനേജിംഗ് കമ്മിറ്റി",
    phone: "0484-2345678",
    whatsapp: "9876543210",
    presidentPhone: "9876543211",
    presidentChairman: "ഹാജി അബ്ദുൽ റഹ്മാൻ",
    
    // Jamaat Details
    jammatDetails: "കണയാന്നൂർ ജമാഅത്ത്",
    area: "കണയാന്നൂർ ഏരിയ",
    district: "എറണാകുളം",
    
    // Application Details
    applicantDetails: "മുഹമ്മദ് അലി",
    chairmanDesignation: "ഇമാം",
    salary: "25000",
    
    // Help Details
    helpPurpose: "വീട് റിപ്പയർ",
    needDescription: "വീടിന്റെ മേൽക്കൂര പൊളിഞ്ഞ് വീണതിനാൽ പുതിയ മേൽക്കൂര പണിയേണ്ടതുണ്ട്. മഴക്കാലം വരുന്നതിനു മുൻപ് ഈ പണി പൂർത്തിയാക്കേണ്ടതാണ്. കുടുംബത്തിൽ 4 പേർ ഉണ്ട് - ഭാര്യയും രണ്ടു മക്കളും. വീട്ടിലെ സാഹചര്യം വളരെ മോശമാണ്.",
    expectedExpense: "150000",
    ownContribution: "50000",
    previousHelp: "ഇല്ല",
    
    // Mosque Official Details
    mosquePresident: "മുഹമ്മദ് ഫാറൂഖ്",
    mosquePhone: "9876543212",
    
    // Additional calculated fields
    requestedAmount: "100000", // expectedExpense - ownContribution
    submissionDate: "2025-01-15",
    applicationId: "MED/2025/001",
    status: "പരിഗണനയിൽ",
    
    // Family Details (additional context)
    familySize: "4",
    dependents: "ഭാര്യ, രണ്ടു മക്കൾ",
    workExperience: "15 വർഷം",
    previousEmployment: "അൽ അമീൻ മസ്ജിദ് (5 വർഷം), ദാരുസ് സലാം മസ്ജിദ് (10 വർഷം)",
    currentWorkDuration: "3 വർഷം",
    
    // Emergency Contact
    emergencyContact: "അഹമദ് ഹുസൈൻ (സഹോദരൻ)",
    emergencyPhone: "9876543213"
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
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Professional Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Medical Aid Application Details</h1>
                  <p className="text-gray-600">Review and manage medical aid application</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={onEdit}
                className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
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
                <p className="text-lg font-bold text-blue-600">{formData.applicationId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Submission Date</label>
                <p className="text-lg font-medium text-gray-900">{formData.submissionDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">{getStatusBadge(formData.status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Requested Amount</label>
                <p className="text-lg font-bold text-red-600">₹{formData.requestedAmount}</p>
              </div>
            </div>
          </div>

          {/* Mosque Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mosque Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Mosque Name</label>
                <p className="text-lg font-medium text-gray-900">{formData.mosqueName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">MCK Affiliation Number</label>
                <p className="text-lg font-medium text-gray-900">{formData.mckAffiliation}</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-gray-900 whitespace-pre-wrap">{formData.address}</p>
            </div>
          </div>

          {/* Management Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Management Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Committee President</label>
                <p className="text-gray-900">{formData.committeePerson}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Management Type</label>
                <p className="text-gray-900">{formData.managementType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900">{formData.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">WhatsApp</label>
                <p className="text-gray-900">{formData.whatsapp}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">President Phone</label>
                <p className="text-gray-900">{formData.presidentPhone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">President/Chairman</label>
                <p className="text-gray-900">{formData.presidentChairman}</p>
              </div>
            </div>
          </div>

          {/* Jamaat Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jamaat Islami Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Jamaat Unit</label>
                <p className="text-gray-900">{formData.jammatDetails}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Area</label>
                <p className="text-gray-900">{formData.area}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">District</label>
                <p className="text-gray-900">{formData.district}</p>
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
                  <p className="text-lg font-medium text-gray-900">{formData.applicantDetails}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Position</label>
                  <p className="text-gray-900">{formData.chairmanDesignation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Salary</label>
                  <p className="text-lg font-medium text-green-600">₹{formData.salary}</p>
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
                <p className="text-lg font-medium text-blue-600">{formData.helpPurpose}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Detailed Description</label>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{formData.needDescription}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Expected Expense</label>
                  <p className="text-xl font-bold text-red-600">₹{formData.expectedExpense}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Own Contribution</label>
                  <p className="text-xl font-bold text-green-600">₹{formData.ownContribution}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Help */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Previous Help</h2>
            <div>
              <label className="text-sm font-medium text-gray-500">Previous Help from MCK</label>
              <p className="text-lg font-medium text-gray-900">{formData.previousHelp}</p>
            </div>
          </div>

          {/* Mosque Officials */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mosque Officials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-3 text-blue-800">President / Secretary</h3>
                <div className="space-y-2">
                  <p><span className="text-sm text-gray-500">Name:</span> {formData.mosquePresident}</p>
                  <p><span className="text-sm text-gray-500">Phone:</span> {formData.mosquePhone}</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-3 text-green-800">Emergency Contact</h3>
                <div className="space-y-2">
                  <p><span className="text-sm text-gray-500">Name:</span> {formData.emergencyContact}</p>
                  <p><span className="text-sm text-gray-500">Phone:</span> {formData.emergencyPhone}</p>
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
  );
};

export default SuperAdminMedicalAidDetails;


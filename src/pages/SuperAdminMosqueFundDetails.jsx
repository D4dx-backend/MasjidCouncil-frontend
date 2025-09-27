import React from 'react';
import { ArrowLeft, Download, Edit, Printer, CheckCircle, XCircle } from 'lucide-react';

const SuperAdminMosqueFundDetails = ({ onBack, onEdit }) => {
  // Comprehensive dummy data for mosque fund application
  const formData = {
    // Mosque Details
    mosqueName: "ബൈതുൽ മുകറം മസ്ജിദ്",
    mckAffiliation: "MCK/2023/078",
    address: "ബൈതുൽ മുകറം മസ്ജിദ്\nചർച്ച് റോഡ്\nകഴക്കൂട്ടം\nതിരുവനന്തപുരം ജില്ല\nകേരളം - 695013",
    managementType: "മാനേജിംഗ് കമ്മിറ്റി",
    presidentSecretary: "സലിം ഹാജി",
    jamathIslami: "കഴക്കൂട്ടം ജമാഅത്ത്",
    phone: "0471-2345678",
    area: "കഴക്കൂട്ടം ഏരിയ",
    district: "തിരുവനന്തപുരം",
    
    // Help Status
    mckFundService: "ഉണ്ട്",
    previousHelp: "ഇല്ല",
    
    // Current Help Details
    helpPurpose: "മസ്ജിദ് മേൽക്കൂര അറ്റകുറ്റപ്പണി",
    needDescription: "മഴക്കാലത്ത് മസ്ജിദിന്റെ മേൽക്കൂരയിൽ നിന്ന് ചോരുന്ന കാരണത്താൽ നമസ്കാര പ്രവർത്തനങ്ങൾ ബാധിക്കപ്പെടുന്നുണ്ട്. 40 വർഷം പഴക്കമുള്ള ഈ മസ്ജിദിന്റെ മേൽക്കൂര പൂർണമായും പുനർനിർമ്മിക്കേണ്ടതുണ്ട്. മസ്ജിദിന്റെ വിസ്തീർണം 2500 ചതുരശ്ര അടിയാണ്. പുതിയ ടൈലുകൾ, ട്രസുകൾ, സീലിംഗ് എന്നിവ ആവശ്യമാണ്.",
    expectedExpense: "350000",
    ownContribution: "150000",
    
    // Contact Details
    mosqueOfficialName: "മുഹമ്മദ് ഫൈസൽ (സെക്രട്ടറി)",
    mosqueOfficialPhone: "9876543210",
    whatsappNumber: "9876543210",
    
    // Bank Details
    bankPassbook: "അക്കൗണ്ട് നമ്പർ: 1234567890123456\nഅക്കൗണ്ട് ഹോൾഡർ: ബൈതുൽ മുകറം മസ്ജിദ് കമ്മിറ്റി\nബാങ്ക്: സൗത്ത് ഇന്ത്യൻ ബാങ്ക്\nബ്രാഞ്ച്: കഴക്കൂട്ടം\nIFSC: SIBL0000123",
    plan:"test/new/test",
    fullEstimate: "മേൽക്കൂര നീക്കം: ₹30,000\nട്രസ് പണി: ₹120,000\nടൈൽ പണി: ₹80,000\nസീലിംഗ് പണി: ₹60,000\nപെയിന്റിംഗ്: ₹40,000\nലേബർ ചാർജ്: ₹20,000\nമൊത്തം: ₹350,000",
    
    // Declarations
    declaration1: true,
    declaration2: true,
    
    // Additional fields for display
    applicationId: "MFD/2025/078",
    submissionDate: "2025-01-20",
    status: "പരിഗണനയിൽ",
    requestedAmount: "200000", // expectedExpense - ownContribution
    
    // Fund Collection History
    monthlyFundCollection: "₹8,500",
    lastFundSubmission: "ഡിസംബർ 2024",
    totalFundContributed: "₹1,02,000 (2024 വർഷം)",
    
    // Mosque Specifications
    mosqueCapacity: "250 പേർ",
    constructionYear: "1984",
    lastMaintenance: "2020",
    mosqueFacilities: ["വുദുഖാന", "പാർക്കിംഗ്", "ജനറേറ്റർ", "സൗണ്ട് സിസ്റ്റം"],
    
    // Committee Details
    committeeMembers: [
      { position: "പ്രസിഡന്റ്", name: "സലിം ഹാജി", phone: "9876543201" },
      { position: "സെക്രട്ടറി", name: "മുഹമ്മദ് ഫൈസൽ", phone: "9876543210" },
      { position: "ട്രഷറർ", name: "ഇബ്രാഹിം സാഹിബ്", phone: "9876543202" }
    ]
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
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Mosque Fund Application Details</h1>
                  <p className="text-gray-600">Review and manage mosque fund application</p>
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
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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
                <p className="text-lg font-bold text-purple-600">{formData.applicationId}</p>
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

          {/* Mosque Basic Information */}
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
              <div>
                <label className="text-sm font-medium text-gray-500">Management Type</label>
                <p className="text-gray-900">{formData.managementType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">President/Chairman</label>
                <p className="text-gray-900">{formData.presidentSecretary}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900">{formData.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Jamath Islami Unit</label>
                <p className="text-gray-900">{formData.jamathIslami}</p>
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
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-500">Full Address</label>
              <p className="text-gray-900 whitespace-pre-wrap">{formData.address}</p>
            </div>
          </div>

          {/* Fund Collection History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Previous Help Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Monthly Fund Collection</label>
                <p className="text-lg font-medium text-green-600">{formData.mckFundService}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Previous Help Received</label>
                <p className="text-lg font-medium text-gray-900">{formData.previousHelp}</p>
              </div>
            </div>
          </div>

          {/* Current Help Request */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Help Request</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Help Required For</label>
                <p className="text-lg font-medium text-purple-600">{formData.helpPurpose}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Detailed Description</label>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{formData.needDescription}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Own Contribution</label>
                  <p className="text-xl font-bold text-green-600">₹{formData.ownContribution}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Requested Amount</label>
                  <p className="text-xl font-bold text-blue-600">₹{formData.requestedAmount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 block mb-2">Bank Passbook Details</label>
                <p className="text-gray-900 whitespace-pre-wrap font-mono text-sm">{formData.bankPassbook}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-500 block mb-2">Plan & Estimate Details</label>
                <p className="text-gray-900 whitespace-pre-wrap font-mono text-sm">{formData.plan}</p>
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

export default SuperAdminMosqueFundDetails;


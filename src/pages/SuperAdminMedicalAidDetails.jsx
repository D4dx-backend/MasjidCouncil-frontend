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
    <div className="min-h-screen bg-gray-50 p-4" style={{ fontFamily: "Anek Malayalam Variable" }}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-blue-700 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-blue-600 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">ഇമാം മൗഅ്‌ദിൻ കക്ഷമനിദി - സൂപ്പർ അഡ്മിൻ</h1>
                <p className="text-blue-100">Imam Muazzin Medical Aid Fund - Super Admin View</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={onEdit}
                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                എഡിറ്റ്
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
              >
                <Printer className="w-4 h-4" />
                പ്രിന്റ്
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                ഡൗൺലോഡ്
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Application Summary */}
          <section className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">അപേക്ഷാ സംഗ്രഹം</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">അപേക്ഷാ നമ്പർ</label>
                <p className="text-lg font-bold text-blue-600">{formData.applicationId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">സമർപ്പിച്ച തീയതി</label>
                <p className="text-lg font-medium text-gray-900">{formData.submissionDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">അപേക്ഷയുടെ നിലവിലെ അവസ്ഥ</label>
                <div className="mt-1">{getStatusBadge(formData.status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ആവശ്യപ്പെടുന്ന തുക</label>
                <p className="text-lg font-bold text-red-600">₹{formData.requestedAmount}</p>
              </div>
            </div>
          </section>

          {/* Mosque Information */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മസ്ജിദ് വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">മസ്ജിദിന്റെ പേര്</label>
                <p className="text-lg font-medium text-gray-900">{formData.mosqueName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">MCK അഫിലിയേഷൻ നമ്പർ</label>
                <p className="text-lg font-medium text-gray-900">{formData.mckAffiliation}</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">വിലാസം</label>
              <p className="text-gray-900 whitespace-pre-wrap">{formData.address}</p>
            </div>
          </section>

          {/* Management Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മാനേജ്മെന്റ് വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">പരിപാലന കമ്മിറ്റി പ്രസിഡന്റ്</label>
                <p className="text-gray-900">{formData.committeePerson}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">മാനേജ്മെന്റ് തരം</label>
                <p className="text-gray-900">{formData.managementType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ഫോൺ</label>
                <p className="text-gray-900">{formData.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">വാട്സ്ആപ്പ്</label>
                <p className="text-gray-900">{formData.whatsapp}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">പ്രസിഡന്റ് ഫോൺ</label>
                <p className="text-gray-900">{formData.presidentPhone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">പ്രസിഡന്‍റ്/ചെയർമാൻ</label>
                <p className="text-gray-900">{formData.presidentChairman}</p>
              </div>
            </div>
          </section>

          {/* Jamaat Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജമാഅത്തെ ഇസ്‌ലാമി വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ജമാഅത്തിന്റെ പ്രാദേശിക ഘടകം</label>
                <p className="text-gray-900">{formData.jammatDetails}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ഏരിയ</label>
                <p className="text-gray-900">{formData.area}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ജില്ല</label>
                <p className="text-gray-900">{formData.district}</p>
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
                  <p className="text-lg font-medium text-gray-900">{formData.applicantDetails}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">ജോലി ചെയ്യുന്ന തസ്‌തിക</label>
                  <p className="text-gray-900">{formData.chairmanDesignation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">വേതനം</label>
                  <p className="text-lg font-medium text-green-600">₹{formData.salary}</p>
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
                <p className="text-lg font-medium text-blue-600">{formData.helpPurpose}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ആവശ്യത്തിന്റെ വിശദവിവരം</label>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{formData.needDescription}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">പ്രതീക്ഷിക്കുന്ന ചെലവ്</label>
                  <p className="text-xl font-bold text-red-600">₹{formData.expectedExpense}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">സ്വന്തം സംഭാവന</label>
                  <p className="text-xl font-bold text-green-600">₹{formData.ownContribution}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Previous Help */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മുമ്പത്തെ സഹായം</h2>
            <div>
              <label className="text-sm font-medium text-gray-600">MCK യിൽ നിന്ന് മുമ്പ് സഹായം ലഭിച്ചിട്ടുണ്ടോ?</label>
              <p className="text-lg font-medium text-gray-900">{formData.previousHelp}</p>
            </div>
          </section>

          {/* Mosque Officials */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മസ്‌ജിദ് ഉദ്യോഗസ്ഥ വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-3 text-blue-800">പ്രസിഡന്‍റ് / സെക്രട്ടറി</h3>
                <div className="space-y-2">
                  <p><span className="text-sm text-gray-600">പേര്:</span> {formData.mosquePresident}</p>
                  <p><span className="text-sm text-gray-600">ഫോൺ:</span> {formData.mosquePhone}</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-3 text-green-800">അടിയന്തിര ബന്ധം</h3>
                <div className="space-y-2">
                  <p><span className="text-sm text-gray-600">പേര്:</span> {formData.emergencyContact}</p>
                  <p><span className="text-sm text-gray-600">ഫോൺ:</span> {formData.emergencyPhone}</p>
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

          {/* Super Admin Actions */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">സൂപ്പർ അഡ്മിൻ പ്രവർത്തനങ്ങൾ</h2>
            <div className="flex justify-between mt-4">
              <button 
                onClick={handleApprove}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                അനുമതി നൽകുക
              </button>
              <button 
                onClick={handleReject}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md shadow transition-colors"
              >
                <XCircle className="w-5 h-5" />
                നിരസിക്കുക
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminMedicalAidDetails;


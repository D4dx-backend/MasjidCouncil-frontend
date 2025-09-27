import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MosqueFundForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    // Mosque Details
    mosqueName: '',
    mckAffiliation: '',
    address: '',
    managementType: '',
    presidentSecretary: '',
    jamathIslami:'',
    phone: '',
    area: '',
    district: '',
    
    // Help Status
    mckFundService: '',
    previousHelp: '',
    
    // Current Help Details
    helpPurpose: '',
    needDescription: '',
    expectedExpense: '',
    ownContribution: '',
    
    // Welfare Fund Details
    mosqueOfficialName: '',
    mosqueOfficialPhone: '',
    whatsappNumber: '',
    
    // Bank Details
    bankPassbook: '',
    fullEstimate: '',
    
    // Declarations
    declaration1: false,
    declaration2: false
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (fieldName, value) => {
    let isValid = true;
    
    if (['phone', 'mosqueOfficialPhone', 'whatsappNumber'].includes(fieldName)) {
      if (value && !validateMobileNumber(value)) {
        isValid = false;
      }
    }
    
    setValidationErrors(prev => ({
      ...prev,
      [fieldName]: !isValid
    }));
    
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    if (type !== 'checkbox') {
      validateField(name, value);
    }
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!formData.declaration1 || !formData.declaration2) {
      alert('കൃപയാ എല്ലാ പ്രഖ്യാപനങ്ങളും അംഗീകരിക്കുക');
      return;
    }

    // Mobile number validation
    if (formData.phone && !validateMobileNumber(formData.phone)) {
      alert("ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക");
      return;
    }

    if (formData.mosqueOfficialPhone && !validateMobileNumber(formData.mosqueOfficialPhone)) {
      alert("ദയവായി മസ്ജിദ് ഉദ്യോഗസ്ഥന്റെ സാധുവായ 10 അക്ക ഫോൺ നമ്പർ നൽകുക");
      return;
    }

    if (formData.whatsappNumber && !validateMobileNumber(formData.whatsappNumber)) {
      alert("ദയവായി സാധുവായ 10 അക്ക വാട്സാപ്പ് നമ്പർ നൽകുക");
      return;
    }

    // Validate required fields
    const requiredFields = [
      'mosqueName', 'mckAffiliation', 'address', 'phone', 'district',
      'mckFundService', 'previousHelp', 'helpPurpose', 'needDescription',
      'expectedExpense', 'mosqueOfficialName', 'mosqueOfficialPhone'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert('കൃപയാ എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/mosqueFund/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു! (Application submitted successfully!)');
        // Reset form
        setFormData({
          mosqueName: '',
          mckAffiliation: '',
          address: '',
          managementType: '',
          presidentSecretary: '',
          jamathIslami:'',
          phone: '',
          area: '',
          district: '',
          mckFundService: '',
          previousHelp: '',
          helpPurpose: '',
          needDescription: '',
          expectedExpense: '',
          ownContribution: '',
          mosqueOfficialName: '',
          mosqueOfficialPhone: '',
          whatsappNumber: '',
          bankPassbook: '',
          fullEstimate: '',
          declaration1: false,
          declaration2: false
        });
        setShowForm(false);
      } else {
        alert('അപേക്ഷ സമർപ്പിക്കുന്നതിൽ പിശക്: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('അപേക്ഷ സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.');
    }
  };

  if (!showForm) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2"style={{ fontFamily: "Anek Malayalam Variable" }}>മസ്ജിദ് ഫണ്ട് സഹായത്തിനുള്ള അപേക്ഷ</h1>
        <p className="text-lg text-gray-700 mb-6"style={{ fontFamily: "Anek Malayalam Variable" }}>മസ്ജിദ് കൗൺസിൽ കേരള</p>

        {/* Info Card */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2"style={{ fontFamily: "Anek Malayalam Variable" }}>
            നിർദേശങ്ങൾ വായിക്കുക
          </h2>
        </div>

        {/* Guidelines */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <ul className="list-disc space-y-3 text-gray-800 text-sm ml-6"style={{ fontFamily: "Anek Malayalam Variable" }}>
            <li>MCK യിൽ അഫിലിയേറ്റ് ചെയ്‌ത മസ്‌ജിദുകൾക്ക് വേണ്ടിയുള്ള സംവിധാനമാണിത്. അഫിലിയേറ്റ് ചെയ്യാത്ത പള്ളികളുടെ അപേക്ഷ പരിഗണിക്കുകയില്ല.</li>
            <li>എല്ലാ മാസവും ആദ്യത്തെ വെള്ളിയാഴ്‌ച ജുമുഅക്ക് ശേഷം മസ്‌ജിദ് ഫണ്ട് സമാഹരിക്കുകയും കേന്ദ്രത്തിലടക്കുകയും ചെയ്യുന്ന പള്ളികൾക്കാണ് സഹായത്തിന് അർഹതയുള്ളത്.</li>
            <li>പള്ളികളുമായി ബന്ധപ്പെട്ട അറ്റകുറ്റപ്പണികൾക്ക് വേണ്ടിയാണ് അപേക്ഷ സമർപ്പിക്കേണ്ടത്. പുതിയ പള്ളി നിർമ്മാണത്തിനോ പള്ളിയുമായി ചേർന്ന് നിൽകുന്ന മറ്റു സംവിധാനങ്ങൾക്കോ (മദ്രസ, ലൈബ്രറി) സഹായം ലഭ്യമല്ല.</li>
            <li>മസ്‌ജിദ് പ്രസിഡന്‍റ് / സെക്രട്ടറിയാണ് അപേക്ഷ സമർപ്പിക്കേണ്ടത്.</li>
            <li>സഹായം ആവശ്യമായ ഇനത്തിന്‍റെ പ്ലാൻ, എസ്റ്റിമേറ്റ് എന്നിവ അപേക്ഷയോടൊപ്പം സമർപ്പിക്കേണ്ടതാണ്.</li>
            <li>ഒരു തവണ സഹായം അനുവദിക്കപ്പെട്ട മസ്‌ജിദുകൾക്ക് പിന്നീട് നാല് വർഷത്തിന് ശേഷം മാത്രമേ അപേക്ഷ സമർപ്പിക്കാൻ അർഹതയുള്ളൂ.</li>
            <li>സഹായം ആവശ്യമായ മസ്‌ജിദിൻ്റെ ബാങ്ക് പാസ് ബുക്കിൻ്റെ കോപ്പി (അക്കൗണ്ട് നമ്പർ, അക്കൗണ്ട് ഹോൾഡറുടെ പേര് ഉള്ള ഭാഗം) അപേക്ഷയോടൊപ്പം ചേർക്കണം.</li>
            <li>അക്കൗണ്ട് മസ്‌ജിദ്/മാനേജിംഗ് കമ്മറ്റി/ട്രസ്റ്റിൻ്റെ പേരിലുള്ളതായിരിക്കണം.</li>
            <li>സഹായം സ്വീകരിച്ചതിൻ്റെ റസിപ്റ്റ് മസ്‌ജിദ് കൗൺസിൽ കേരളക്ക് നൽകേണ്ടതാണ്.</li>
          </ul>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 text-sm text-gray-900">
          <strong style={{ fontFamily: "Anek Malayalam Variable" }}>NB:</strong> അപേക്ഷയോടൊപ്പമുള്ള മാർഗനിർദ്ദേശങ്ങളിൽ സൂചിപ്പിച്ച രേഖകൾ അപേക്ഷയോടൊപ്പം സമർപ്പിക്കേണ്ടതാണ്.
        </div>

        <div className="text-right">
          <button 
          style={{ fontFamily: "Anek Malayalam Variable" }}
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            നിർദേശങ്ങൾ വായിച്ചു, അപേക്ഷ പൂരിപ്പിക്കുക
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mt-10">
        <div className="flex items-center mb-4">
          <button
            onClick={() => setShowForm(false)}
            className="text-blue-600 hover:text-blue-800 mr-4"
          >
            ← പിന്നോട്ട്
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800"style={{ fontFamily: "Anek Malayalam Variable" }}>
              മസ്ജിദ് ഫണ്ട് സഹായത്തിനുള്ള അപേക്ഷ
            </h1>
            <p className="text-gray-600"style={{ fontFamily: "Anek Malayalam Variable" }}>മസ്ജിദ് കൗൺസിൽ കേരള</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Mosque Details Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Anek Malayalam Variable" }}>മസ്ജിദ് വിവരങ്ങൾ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                മസ്ജിദിന്റെ പേര്
              </label>
              <input
               style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="mosqueName"
                value={formData.mosqueName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                എം സി കെ അഫിലിയേഷൻ നമ്പർ
              </label>
              <input
                type="text"
                name="mckAffiliation"
                value={formData.mckAffiliation}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              വിലാസം
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              മാനേജിംഗ് കമ്മിറ്റി/ട്രസ്‌റ്റ്
              </label>
              <input
                type="text"
                name="managementType"
                value={formData.managementType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              പ്രസിഡൻ്റ്/ ചെയർമാൻ
              </label>
              <input
                type="text"
                name="presidentSecretary"
                value={formData.presidentSecretary}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ഫോൺ
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              ജമാഅത്തെ ഇസ്‌ലാമി പ്രാദേശിക ഘടകം
              </label>
              <input
                type="text"
                name="jamathIslami"
                value={formData.jamathIslami}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ഏരിയ
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ജില്ല
              </label>
              <select
               style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">ജില്ല തിരഞ്ഞെടുക്കുക</option>
                <option value="തിരുവനന്തപുരം">തിരുവനന്തപുരം</option>
                <option value="കൊല്ലം">കൊല്ലം</option>
                <option value="പത്തനംതിട്ട">പത്തനംതിട്ട</option>
                <option value="ആലപ്പുഴ">ആലപ്പുഴ</option>
                <option value="കോട്ടയം">കോട്ടയം</option>
                <option value="ഇടുക്കി">ഇടുക്കി</option>
                <option value="എറണാകുളം">എറണാകുളം</option>
                <option value="തൃശ്ശൂർ">തൃശ്ശൂർ</option>
                <option value="പാലക്കാട്">പാലക്കാട്</option>
                <option value="മലപ്പുറം">മലപ്പുറം</option>
                <option value="കോഴിക്കോട്">കോഴിക്കോട്</option>
                <option value="വയനാട്">വയനാട്</option>
                <option value="കണ്ണൂർ">കണ്ണൂർ</option>
                <option value="കാസർഗോഡ്">കാസർഗോഡ്</option>
              </select>
            </div>
          </div>
        </div>

        {/* Help Status Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>മുമ്പ് സഹായം സംബന്ധിച്ച വിവരങ്ങൾ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              മസ്‌ജിദ് കൗൺസിൽ കേരളക്ക് മാസാന്ത ഫണ്ട് ശേഖരണം നടക്കാറുണ്ടോ
              </label>
              <select
               style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                name="mckFundService"
                value={formData.mckFundService}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">തിരഞ്ഞെടുക്കുക</option>
                <option value="yes">ഉണ്ട്</option>
                <option value="no">ഇല്ല</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              മസ്‌ജിദ് കൗൺസിലിൽ നിന്ന് മുമ്പ് സഹായം ലഭ്യമായിട്ടുണ്ടോ
              </label>
              <select
               style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                name="previousHelp"
                value={formData.previousHelp}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">തിരഞ്ഞെടുക്കുക</option>
                <option value="yes">ഉണ്ട്</option>
                <option value="no">ഇല്ല</option>
              </select>
            </div>
          </div>
        </div>

        {/* Current Help Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>നലവിലെ സഹായം സംബന്ധിച്ച വിവരങ്ങൾ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              ഇപ്പോൾ സഹായം ആവശ്യമായ ഇനം
              </label>
              <input
                type="text"
                name="helpPurpose"
                value={formData.helpPurpose}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ആവശ്യത്തിന്റെ വിശദവിവരം
              </label>
              <textarea
                name="needDescription"
                value={formData.needDescription}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                  പ്രതീക്ഷിക്കുന്ന ചെലവ് (രൂപ)
                </label>
                <input
                 style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  type="number"
                  name="expectedExpense"
                  value={formData.expectedExpense}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                സ്വന്തമായി ശേഖരിക്കാവുന്ന തുക (രൂപ)
                </label>
                <input
                 style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  type="number"
                  name="ownContribution"
                  value={formData.ownContribution}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Welfare Fund Details */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>കോൺടാക്റ്റ് വിവരങ്ങൾ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                മസ്ജിദ് പ്രസിഡന്റ്/സെക്രട്ടറി
              </label>
              <input
               style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="mosqueOfficialName"
                value={formData.mosqueOfficialName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ഫോൺ
              </label>
              <input
               style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="tel"
                name="mosqueOfficialPhone"
                value={formData.mosqueOfficialPhone}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.mosqueOfficialPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                വാട്സാപ്പ് നമ്പർ
              </label>
              <input
               style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.whatsappNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>ആവശ്യമായ ഡോക്യുമെന്റുകൾ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ബാങ്ക് പാസ് ബുക്കിന്റെ കോപ്പി (അക്കൗണ്ട് നമ്പർ, അക്കൗണ്ട് ഹോൾഡറുടെ പേര് ഉള്ള ഭാഗം)
              </label>
              <textarea
                name="bankPassbook"
                value={formData.bankPassbook}
                onChange={handleInputChange}
                placeholder="ബാങ്ക് വിവരങ്ങൾ"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              പ്ലാൻ, എസ്റ്റിമേറ്റ് വിവരങ്ങൾ
              </label>
              <textarea
                name="fullEstimate"
                value={formData.fullEstimate}
                onChange={handleInputChange}
                placeholder="പ്ലാൻ, എസ്റ്റിമേറ്റ് വിവരങ്ങൾ"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Declarations */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>പ്രഖ്യാപനങ്ങൾ</h2>
          <div className="space-y-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="declaration1"
                checked={formData.declaration1}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <span className="text-sm text-gray-700" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ഞാൻ മസ്ജിദ് ഫണ്ട് സഹായത്തിനുള്ള എല്ലാ നിർദേശങ്ങളും വായിച്ച് മനസ്സിലാക്കിയുണ്ട്.
              </span>
            </label>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="declaration2"
                checked={formData.declaration2}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <span className="text-sm text-gray-700" style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              ഞാൻ ഇവിടെ നൽകിയിരിക്കുന്ന എല്ലാ വിവരങ്ങളും സത്യവും കൃത്യവുമാണെന്ന് പ്രഖ്യാപിക്കുന്നു. തെറ്റായ വിവരങ്ങൾ നൽകിയാൽ അതിന്റെ പൂർണ്ണ ഉത്തരവാദിത്തം എന്റേതായിരിക്കും.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
           style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            റദ്ദാക്കുക
          </button>
          <button
           style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            അപേക്ഷ സമർപ്പിക്കുക
          </button>
        </div>
      </div>
    </div>
  );
};

export default MosqueFundForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MedicalAidForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    // Mosque Details
    mosqueName: '',
    mckAffiliation: '',
    address: '',
    
    // Management Details
    committeePerson: '',
    managementType: '',
    phone: '',
    whatsapp: '',
    presidentPhone: '',
    presidentChairman: '',
    
    // Jamaat Details
    jammatDetails: '',
    area: '',
    district: '',
    
    // Application Details
    applicantDetails: '',
    chairmanDesignation: '',
    salary: '',
    
    // Help Details
    helpPurpose: '',
    needDescription: '',
    expectedExpense: '',
    ownContribution: '',
    previousHelp: '',
    mosquePresident: '',
    mosquePhone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/welfarefund/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('അപേക്ഷ സമർപ്പിച്ചു! (Application submitted successfully!)');
        // Reset form
        setFormData({
          mosqueName: '',
          mckAffiliation: '',
          address: '',
          committeePerson: '',
          managementType: '',
          phone: '',
          whatsapp: '',
          presidentPhone: '',
          presidentChairman: '',
          jammatDetails: '',
          area: '',
          district: '',
          applicantDetails: '',
          chairmanDesignation: '',
          salary: '',
          helpPurpose: '',
          needDescription: '',
          expectedExpense: '',
          ownContribution: '',
          previousHelp: '',
          mosquePresident: '',
          mosquePhone: ''
        });
        navigate('/');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('അപേക്ഷ സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.');
    }
  };
  

  if (!showForm) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white mt-10">
        <div className="">
          <h1 className="text-2xl font-bold text-gray-800 mb-2"style={{ fontFamily: "Anek Malayalam Variable" }}>
            ഇമാം മൗഅ്‌ദിൻ കക്ഷമനിദി
          </h1>
          <p className="text-lg text-gray-600"style={{ fontFamily: "Anek Malayalam Variable" }}>സഹായം ലഭിക്കുന്നതിന് അപേക്ഷ</p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Anek Malayalam Variable" }}>
            അപേക്ഷ പൂരിപ്പിക്കുന്നതിന് മുൻപ് ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ
          </h2>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4"style={{ fontFamily: "Anek Malayalam Variable" }}>
            ഇമാം മുഅദ്ദിൻ ക്ഷേമനിധി - പൊതു നിര്‍ദ്ദേശങ്ങൾ:
            </h3>
            <ul className="space-y-2 text-gray-700"style={{ fontFamily: "Anek Malayalam Variable" }}>
              <li>• MCK യിൽ അഫിലിയേറ്റ് ചെയ്‌ത മസ്‌ജിദിലെ ജീവനക്കാർക്ക് വേണ്ടിയാണ് അപേക്ഷ നൽകേണ്ടത്.</li>
              <li>• മസ്‌ജിദ് കമ്മിറ്റിയാണ് അപേക്ഷ സമർപ്പിക്കേണ്ടത്.</li>
              <li>• ജീവനക്കാരനെ സംബന്ധിച്ച വിശദവിവരങ്ങൾ രേഖപ്പെടുത്തേണ്ട ഫോറവും നിർബന്ധമായും പൂരിപ്പിച്ച് നൽകേണ്ടതാണ്.</li>
              <li>• സർവീസിൽ തുടരുന്ന സന്ദർഭത്തിൽ മാത്രമേ സഹായം ലഭ്യമാകുകയുള്ളൂ.</li>
              <li>• MCK യിൽ അഫിലിയേറ്റ് ചെയ്‌ത മസ്‌ജിദുകളിൽ തുടർച്ചയായി 5 വർഷം സർവീസ് ഉണ്ടായിരിക്കണം.</li>
              <li>• ജീവനക്കാരൻ സഹയാത്തിന് അർഹനാണെങ്കിൽ മസ്‌ജിദ് കമ്മിറ്റിയുടെ പേരിലാണ് ഫണ്ട് അനുവദിക്കുക.</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4"style={{ fontFamily: "Anek Malayalam Variable" }}>
              സഹായം ലഭിക്കുന്ന ഇനങ്ങൾ:
            </h3>
            <ul className="space-y-2 text-gray-700"style={{ fontFamily: "Anek Malayalam Variable" }}>
              <li>• <strong>വീട് റിപ്പയർ:</strong> സ്വന്തമായി വീടുള്ള ജീവനക്കർക്ക് വീട് റിപ്പയർ ചെയ്യുന്നതിനാണ് സഹായം അനുവദിക്കുക</li>
              <li>• <strong>വിവാഹം:</strong> സ്വന്തം വിവാഹത്തിനും മക്കൾ, സഹോദരിമാർ എന്നിവരുടെ വിവാഹത്തിനും</li>
              <li>• <strong>ചികിത്സ:</strong> ഭാര്യ, മക്കൾ, മാതാപിതാക്കൾ എന്നിവരുടെ ചികിത്സക്കും സഹായം അനുവദിക്കും.</li>
              <li>• <strong>വിദ്യാഭ്യാസം:</strong> മക്കളുടെ വിദ്യാഭ്യാസത്തിന് സാമ്പത്തിക സഹായം.</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4"style={{ fontFamily: "Anek Malayalam Variable" }}>
              അപേക്ഷയോടൊപ്പം ചേർക്കേണ്ട രേഖകൾ:
            </h3>
            <ul className="space-y-2 text-gray-700"style={{ fontFamily: "Anek Malayalam Variable" }}>
              <li>• സഹായം ആവശ്യമായ ജീവനക്കാരൻ്റെ ആധാർ കോപ്പി</li>
              <li>• മസ്‌ജിദിൻ്റെ ബാങ്ക് പാസ് ബുക്കിൻ്റെ കോപ്പി (അക്കൗണ്ട് നമ്പർ, അക്കൗണ്ട് ഹോൾഡറുടെ പേര് ഉള്ള ഭാഗം)</li>
              <li>• ചികിത്സക്ക്: ഡോക്ടറുടെ ശിപാർശ</li>
              <li>• വിദ്യാഭ്യാസത്തിന്: കോഴ്സിൻ്റെ ഫിസ് ഘടന, അഡ്‌മിഷൻ വിശദാംശങ്ങൾ</li>
            </ul>
          </div>
        </div>

        {/* <div className="mt-8 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-200"
          >
            വീടിനായി സഹായം അപേക്ഷ പൂരിപ്പിക്കുക
          </button>
        </div> */}
         <div className="flex justify-center space-x-4">
  <button
    onClick={() => {
  setShowForm(false);
  navigate("/");
}}
    className="px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-100 rounded"
  >
    വീട്ടിലേക്ക് മടങ്ങുക
  </button>
  <button
    onClick={() => setShowForm(true)}
    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
  >
    അപേക്ഷ പൂരിപ്പിക്കുക
  </button>
</div>

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button
            onClick={() => setShowForm(false)}
            className="text-blue-600 hover:text-blue-800 mr-4"
          >
            ← പിന്നോട്ട്
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800"style={{ fontFamily: "Anek Malayalam Variable" }}>
              ഇമാം മൗഅ്‌ദിൻ കക്ഷമനിദി
            </h1>
            <p className="text-gray-600"style={{ fontFamily: "Anek Malayalam Variable" }}>സഹായം ലഭിക്കുന്നതിന് അപേക്ഷ</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Mosque Details Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Anek Malayalam Variable" }}>മസ്ജിദ് വിവരങ്ങൾ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                മസ്ജിദിന്റെ പേര്
              </label>
              <input
                type="text"
                name="mosqueName"
                value={formData.mosqueName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                എം സി കെ അഫിലിയേഷൻ നമ്പർ
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
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
            <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              വിലാസം
            </label>
            <textarea
            style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Management Details Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>മാനേജ്മെന്റ് വിവരങ്ങൾ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                പരിപാലന കമ്മിറ്റി പ്രസിഡന്റ്/ട്രസ്‌റ്റ്
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="committeePerson"
                value={formData.committeePerson}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                മാനേജ്മെന്റ് കമ്മിറ്റി/ബോർഡ്
              </label>
              <select
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                name="managementType"
                value={formData.managementType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">തിരഞ്ഞെടുക്കുക</option>
                <option value="">മാനേജിംഗ് കമ്മിറ്റി</option>
                <option value="committee">ട്രസ്‌റ്റ്</option>
                <option value="board">അസോസിയേഷൻ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ഫോൺ
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                വാട്സ്ആപ്പ് നമ്പർ
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                പ്രസിഡന്റ് ഫോൺ
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="tel"
                name="presidentPhone"
                value={formData.presidentPhone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                പ്രസിഡന്‍റ്/ ചെയർമാൻ
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="presidentChairman"
                value={formData.presidentChairman}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
          </div>
        </div>

        {/* Jamaat Details Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>ജമാഅത്തിന്റെ ഇസ്ലാമി വിവരങ്ങൾ</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              ജമാഅത്തിന്റെ പ്രാദേശിക ഘടകം
            </label>
            <input
            style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
              type="text"
              name="jammatDetails"
              value={formData.jammatDetails}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ഏരിയ
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ജില്ല
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Application Details Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>അപേക്ഷ വിവരങ്ങൾ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                അപേക്ഷ സമർപ്പിക്കുന്നത് ആർക്കാണ് വേണ്ടി
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="applicantDetails"
                value={formData.applicantDetails}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              ജോലി ചെയ്യുന്ന തസ്‌തിക
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="chairmanDesignation"
                value={formData.chairmanDesignation}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                വേതനം (രൂപ)
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Help Details Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>സഹായ വിവരങ്ങൾ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                സഹായം ആവശ്യമുള്ള ഉദ്ദേശം
              </label>
              <select
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                name="helpPurpose"
                value={formData.helpPurpose}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                
              >
                <option value="">തിരഞ്ഞെടുക്കുക</option>
                <option value="house">വീട് റിപ്പയർ</option>
                <option value="marriage">വിവാഹം</option>
                <option value="medical">ചികിത്സ</option>
                <option value="education">വിദ്യാഭ്യാസം</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ആവശ്യത്തിന്റെ വിശദവിവരം
              </label>
              <textarea
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
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
                <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
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
                <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
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

        {/* Previous Help Section */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>മുമ്പത്തെ സഹായം</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
            മസ്ജിദ് കൗൺസിലിൽ നിന്ന് മുമ്പ് സഹായം ലഭ്യമായിട്ടുണ്ടോ
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  type="radio"
                  name="previousHelp"
                  value="yes"
                  checked={formData.previousHelp === 'yes'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                ഉണ്ട്
              </label>
              <label className="flex items-center">
                <input
                style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  type="radio"
                  name="previousHelp"
                  value="no"
                  checked={formData.previousHelp === 'no'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                ഇല്ല
              </label>
            </div>
          </div>
        </div>

        {/* Mosque Official Details */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>മസ്‌ജിദ് ഉദ്യോഗസ്ഥ വിവരങ്ങൾ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              മസ്‌ജിദ് പ്രസിഡന്‍റ് / സെക്രട്ടറി
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="text"
                name="mosquePresident"
                value={formData.mosquePresident}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ഫോൺ
              </label>
              <input
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                type="tel"
                name="mosquePhone"
                value={formData.mosquePhone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
        <button
        style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
  type="button"
  onClick={() => {
  setShowForm(false);
  navigate("/");
}}
  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
>
  റദ്ദാക്കുക
</button>

          <button
          style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-wfhite font-semibold rounded-lg transition duration-200"
          >
            അപേക്ഷ സമർപ്പിക്കുക
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalAidForm;
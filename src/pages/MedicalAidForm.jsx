import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    district: '',
    area: '',
    jammatDetails: '',
    
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

  const [validationErrors, setValidationErrors] = useState({});

  // State for dropdown data
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [units, setUnits] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  const validateField = (fieldName, value) => {
    let isValid = true;
    
    if (['phone', 'whatsapp', 'presidentPhone', 'mosquePhone'].includes(fieldName)) {
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

  // Fetch districts from external API
  const fetchDistricts = async () => {
    setLoadingDropdowns(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/mosqueAffiliation/external/districts`);
      const result = await response.json();
      
      if (result.success && result.districts && Array.isArray(result.districts)) {
        setDistricts(result.districts);
      } else {
        setDistricts(getFallbackDistricts());
      }
    } catch (error) {
      setDistricts(getFallbackDistricts());
    } finally {
      setLoadingDropdowns(false);
    }
  };

  // Fetch areas for a specific district
  const fetchAreasForDistrict = async (districtId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mosqueAffiliation/external/areas/${districtId}`);
      const result = await response.json();
      
      if (result.success && result.areas && Array.isArray(result.areas)) {
        setAreas(result.areas);
        return result.areas;
      } else {
        const fallbackAreas = getFallbackAreas();
        setAreas(fallbackAreas);
        return fallbackAreas;
      }
    } catch (error) {
      const fallbackAreas = getFallbackAreas();
      setAreas(fallbackAreas);
      return fallbackAreas;
    }
  };

  // Fetch units for a specific area
  const fetchUnitsForArea = async (areaId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mosqueAffiliation/external/units/${areaId}`);
      const result = await response.json();
      
      if (result.success && result.units && Array.isArray(result.units)) {
        setUnits(result.units);
        return result.units;
      } else {
        const fallbackUnits = getFallbackUnits();
        setUnits(fallbackUnits);
        return fallbackUnits;
      }
    } catch (error) {
      const fallbackUnits = getFallbackUnits();
      setUnits(fallbackUnits);
      return fallbackUnits;
    }
  };

  // Fallback data for districts
  const getFallbackDistricts = () => [
    { id: 1, title: 'Kozhikode', name: 'Kozhikode' },
    { id: 2, title: 'Malappuram', name: 'Malappuram' },
    { id: 3, title: 'Kannur', name: 'Kannur' },
    { id: 4, title: 'Kasaragod', name: 'Kasaragod' },
    { id: 5, title: 'Wayanad', name: 'Wayanad' },
    { id: 6, title: 'Thrissur', name: 'Thrissur' },
    { id: 7, title: 'Ernakulam', name: 'Ernakulam' },
    { id: 8, title: 'Kottayam', name: 'Kottayam' },
    { id: 9, title: 'Alappuzha', name: 'Alappuzha' },
    { id: 10, title: 'Pathanamthitta', name: 'Pathanamthitta' },
    { id: 11, title: 'Kollam', name: 'Kollam' },
    { id: 12, title: 'Thiruvananthapuram', name: 'Thiruvananthapuram' },
    { id: 13, title: 'Palakkad', name: 'Palakkad' },
    { id: 14, title: 'Idukki', name: 'Idukki' }
  ];

  // Fallback data for areas
  const getFallbackAreas = () => [
    { id: 1, title: 'Kozhikode City', name: 'Kozhikode City' },
    { id: 2, title: 'Feroke', name: 'Feroke' },
    { id: 3, title: 'Koyilandy', name: 'Koyilandy' },
    { id: 4, title: 'Vadakara', name: 'Vadakara' },
    { id: 5, title: 'Thiruvambady', name: 'Thiruvambady' },
    { id: 6, title: 'Koduvally', name: 'Koduvally' },
    { id: 7, title: 'Balussery', name: 'Balussery' },
    { id: 8, title: 'Perambra', name: 'Perambra' },
    { id: 9, title: 'Thiruvallur', name: 'Thiruvallur' },
    { id: 10, title: 'Elathur', name: 'Elathur' }
  ];

  // Fallback data for units
  const getFallbackUnits = () => [
    { id: 1, title: 'Unit 1', name: 'Unit 1' },
    { id: 2, title: 'Unit 2', name: 'Unit 2' },
    { id: 3, title: 'Unit 3', name: 'Unit 3' },
    { id: 4, title: 'Unit 4', name: 'Unit 4' },
    { id: 5, title: 'Unit 5', name: 'Unit 5' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'district') {
      // When district changes, fetch areas for that district
      setFormData(prev => ({
        ...prev,
        district: value,
        area: '', // Reset area when district changes
        jammatDetails: '' // Reset unit when district changes
      }));
      
      // Find the district ID to fetch areas
      const selectedDistrict = districts.find(d => 
        (d.title || d.name) === value
      );
      
      if (selectedDistrict && selectedDistrict.id) {
        fetchAreasForDistrict(selectedDistrict.id);
      } else {
        // If no district ID found, use fallback areas
        const fallbackAreas = getFallbackAreas();
        setAreas(fallbackAreas);
      }
    } else if (name === 'area') {
      // When area changes, fetch units for that area
      setFormData(prev => ({
        ...prev,
        area: value,
        jammatDetails: '' // Reset unit when area changes
      }));
      
      // Find the area ID to fetch units
      const selectedArea = areas.find(a => 
        (a.title || a.name) === value
      );
      
      if (selectedArea && selectedArea.id) {
        fetchUnitsForArea(selectedArea.id);
      } else {
        // If no area ID found, use fallback units
        const fallbackUnits = getFallbackUnits();
        setUnits(fallbackUnits);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    validateField(name, value);
  };
  const navigate = useNavigate();

  // Fetch districts when form is shown
  useEffect(() => {
    if (showForm) {
      fetchDistricts();
    }
  }, [showForm]);


  const validateMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mobile number validation
    if (formData.phone && !validateMobileNumber(formData.phone)) {
      alert("ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക");
      return;
    }

    if (formData.whatsapp && !validateMobileNumber(formData.whatsapp)) {
      alert("ദയവായി സാധുവായ 10 അക്ക വാട്സാപ്പ് നമ്പർ നൽകുക");
      return;
    }

    if (formData.presidentPhone && !validateMobileNumber(formData.presidentPhone)) {
      alert("ദയവായി പ്രസിഡന്റിന്റെ സാധുവായ 10 അക്ക ഫോൺ നമ്പർ നൽകുക");
      return;
    }

    if (formData.mosquePhone && !validateMobileNumber(formData.mosquePhone)) {
      alert("ദയവായി മസ്ജിദ് ഉദ്യോഗസ്ഥന്റെ സാധുവായ 10 അക്ക ഫോൺ നമ്പർ നൽകുക");
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/welfarefund/create`, {
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
          district: '',
          area: '',
          jammatDetails: '',
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
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
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
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.whatsapp ? 'border-red-500' : 'border-gray-300'
                }`}
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
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.presidentPhone ? 'border-red-500' : 'border-gray-300'
                }`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ജില്ല
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loadingDropdowns}
                style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
              >
                <option value="">{loadingDropdowns ? "ലോഡ് ചെയ്യുന്നു..." : "ജില്ല തിരഞ്ഞെടുക്കുക"}</option>
                {Array.isArray(districts) && districts.map((district) => (
                  <option key={district.id || district._id} value={district.title || district.name}>
                    {district.title || district.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                ഏരിയ
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loadingDropdowns || !formData.district}
                style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
              >
                <option value="">
                  {!formData.district ? 'ആദ്യം ജില്ല തിരഞ്ഞെടുക്കുക' : 'ഏരിയ തിരഞ്ഞെടുക്കുക'}
                </option>
                {Array.isArray(areas) && areas.map((area) => (
                  <option key={area.id || area._id} value={area.title || area.name}>
                    {area.title || area.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
              ജമാഅത്തിന്റെ പ്രാദേശിക ഘടകം
            </label>
            <select
              name="jammatDetails"
              value={formData.jammatDetails}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loadingDropdowns || !formData.area}
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              <option value="">
                {!formData.area ? 'ആദ്യം ഏരിയ തിരഞ്ഞെടുക്കുക' : 'യൂണിറ്റ് തിരഞ്ഞെടുക്കുക'}
              </option>
              {Array.isArray(units) && units.map((unit) => (
                <option key={unit.id || unit._id} value={unit.title || unit.name}>
                  {unit.title || unit.name}
                </option>
              ))}
            </select>
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
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.mosquePhone ? 'border-red-500' : 'border-gray-300'
                }`}
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
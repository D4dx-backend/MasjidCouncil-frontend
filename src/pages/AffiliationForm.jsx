import React, { useState } from "react";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";

const AffiliationForm = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    mosqueName: "",
    mosqueAddress: "",
    localityAddress: "",
    yearStarted: "",

    // Address Details
    completeAddress: "",
    district: "",
    pincode: "",
    phone: "",
    email: "",
    website: "",

    // Jamaat-e-Islami Details
    area: "",
    jamaatDistrict: "",

    // Mosque Facilities
    facilities: [],

    // Cemetery Details
    hasCemetery: "",
    cemeteryDescription: "",

    // Mosque Specialty
    specialtyDescription: "",
    category: "",

    // Juma Participants
    menCount: "",
    womenCount: "",

    // Financial Details
    financialAssets: "",
    incomeSource: "",
    monthlyExpenses: "",

    // Official Records
    maintainsAccounts: "",
    recordsKept: [],

    // Last Year Accounts
    totalIncome: "",
    totalExpense: "",

    // Community Services
    communityServices: [],
    otherServices: "",

    // Managing Committee
    committeeType: "",
    president: { name: "", mobile: "", email: "" },
    secretary: { name: "", mobile: "", email: "" },

    // Staff Details
    staff: [
      {
        number: 1,
        age: "",
        salary: "",
        qualification: "",
        remarks: "",
        work: "",
      },
    ],
    hasOutstateStaff: "",
    followsOutstateProcedures: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const facilities = [
    "മദ്രസ",
    "റീഡിംഗ് റൂം",
    "ലൈബ്രറി",
    "ഡിജിറ്റൽ ലൈബ്രറി",
    "ഹോളിഡേ മദ്രസ",
    "ഖുർആൻ സ്റ്റഡിസെൻ്റർ",
    "സകാത്ത് സെല്‍",
    "പലിശരഹിത നിധി",
    "നോട്ടീസ് ബോർഡ്",
    "വനിതാ വേദി",
    "സേവന വേദി",
  ];

  const recordTypes = [
    "അസറ്റ് രജിസ്റ്റർ",
    "വരിസംഖ്യ റസിപ്റ്റ്",
    "പെയ്മെന്‍റ് വൗചർ",
    "സാലറി റസിപ്റ്റ്",
    "ജനന/മരണ രജിസ്റ്റർ",
    "വിവാഹ രജിസ്റ്റർ",
    "വിവാഹ മോചന രജിസ്റ്റര്‍",
    "സ്റ്റാഫ് പെയ്റോള്‍",
    "ഇൻവാഡ്/ ഔട്ട്‍വാഡ് ഫയൽ",
    "ഖബര്‍ രജിസ്റ്റ്റ്‍",
    "ഡേ ബുക്ക്",
  ];

  const communityServices = [
    "പലിശരഹിത നിധി",
    "അയൽകൂട്ടം",
    "അഗതി മന്ദിരങ്ങൾ/ യതീഖാനകൾ",
    "ബ്ലഡ് ബാങ്ക്",
    "പാലിയേറ്റിവ് പ്രവർത്തനങ്ങൾ",
    "തൊഴിൽ പരിശീലനങ്ങൾ",
    "മെഡിക്കൽ ഹെൽപ്",
    "കൗൺസ‌ലിംഗ്",
    "ഡി-അഡിക്ഷൻ സെന്‍റര്‍",
    "സ്കോളർഷിപ്പ്",
    "കരിയർ ഹെൽപ് സെൻ്റർ",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
    validateField(`${parent}.${field}`, value);
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const addStaff = () => {
    setFormData((prev) => ({
      ...prev,
      staff: [
        ...prev.staff,
        {
          number: prev.staff.length + 1,
          age: "",
          salary: "",
          qualification: "",
          remarks: "",
          work: "",
        },
      ],
    }));
  };

  const removeStaff = (index) => {
    setFormData((prev) => ({
      ...prev,
      staff: prev.staff.filter((_, i) => i !== index),
    }));
  };

  const handleStaffChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      staff: prev.staff.map((staff, i) =>
        i === index ? { ...staff, [field]: value } : staff
      ),
    }));
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (fieldName, value) => {
    let isValid = true;

    if (
      fieldName === "phone" ||
      fieldName === "president.mobile" ||
      fieldName === "secretary.mobile"
    ) {
      if (value && !validateMobileNumber(value)) {
        isValid = false;
      }
    }

    if (
      fieldName === "email" ||
      fieldName === "president.email" ||
      fieldName === "secretary.email"
    ) {
      if (value && !validateEmail(value)) {
        isValid = false;
      }
    }

    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: !isValid,
    }));

    return isValid;
  };

  const handleSubmit = async () => {
    console.log("Form submission started...");
    console.log("Form data:", formData);

    // Mobile number validation
    if (formData.phone && !validateMobileNumber(formData.phone)) {
      alert("ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക");
      return;
    }

    if (
      formData.president.mobile &&
      !validateMobileNumber(formData.president.mobile)
    ) {
      alert("ദയവായി പ്രസിഡന്റിന്റെ സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക");
      return;
    }

    if (
      formData.secretary.mobile &&
      !validateMobileNumber(formData.secretary.mobile)
    ) {
      alert("ദയവായി സെക്രട്ടറിയുടെ സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക");
      return;
    }

    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      alert("ദയവായി സാധുവായ ഇമെയിൽ വിലാസം നൽകുക");
      return;
    }

    if (formData.president.email && !validateEmail(formData.president.email)) {
      alert("ദയവായി പ്രസിഡന്റിന്റെ സാധുവായ ഇമെയിൽ വിലാസം നൽകുക");
      return;
    }

    if (formData.secretary.email && !validateEmail(formData.secretary.email)) {
      alert("ദയവായി സെക്രട്ടറിയുടെ സാധുവായ ഇമെയിൽ വിലാസം നൽകുക");
      return;
    }

    // Basic validation - Required fields
    if (
      !formData.mosqueName ||
      !formData.mosqueAddress ||
      !formData.localityAddress ||
      !formData.yearStarted
    ) {
      alert("ദയവായി എല്ലാ അടിസ്ഥാന വിവരങ്ങളും പൂരിപ്പിക്കുക");
      return;
    }

    if (
      !formData.completeAddress ||
      !formData.district ||
      !formData.pincode ||
      !formData.phone
    ) {
      alert("ദയവായി എല്ലാ വിലാസ വിവരങ്ങളും പൂരിപ്പിക്കുക");
      return;
    }

    // Additional validation for committee details
    if (!formData.committeeType) {
      alert("ദയവായി മാനേജിംഗ് കമ്മിറ്റിയുടെ തരം തിരഞ്ഞെടുക്കുക");
      return;
    }

    if (!formData.president.name || !formData.secretary.name) {
      alert("ദയവായി പ്രസിഡന്റിന്റെയും സെക്രട്ടറിയുടെയും പേര് നൽകുക");
      return;
    }

    try {
      console.log(
        "Making API call to:",
        "http://localhost:5000/api/mosqueAffiliation/create"
      );

      const response = await fetch(
        "http://localhost:5000/api/mosqueAffiliation/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Response status:", response.status);

      const result = await response.json();
      console.log("Response data:", result);

      if (result.success) {
        alert(
          `അപേക്ഷ സമർപ്പിച്ചു! അഫിലിയേഷൻ നമ്പർ: ${result.data.affiliationNumber}`
        );
        // Reset form after successful submission
        setFormData({
          mosqueName: "",
          mosqueAddress: "",
          localityAddress: "",
          yearStarted: "",
          completeAddress: "",
          district: "",
          pincode: "",
          phone: "",
          email: "",
          website: "",
          area: "",
          jamaatDistrict: "",
          facilities: [],
          hasCemetery: "",
          cemeteryDescription: "",
          specialtyDescription: "",
          category: "",
          menCount: "",
          womenCount: "",
          financialAssets: "",
          incomeSource: "",
          monthlyExpenses: "",
          maintainsAccounts: "",
          recordsKept: [],
          totalIncome: "",
          totalExpense: "",
          communityServices: [],
          otherServices: "",
          committeeType: "",
          president: { name: "", mobile: "", email: "" },
          secretary: { name: "", mobile: "", email: "" },
          staff: [
            {
              number: 1,
              age: "",
              salary: "",
              qualification: "",
              remarks: "",
              work: "",
            },
          ],
          hasOutstateStaff: "",
          followsOutstateProcedures: "",
        });
      } else {
        alert(`പിശക്: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error details:", error.message);
      alert(
        "അപേക്ഷ സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-white border-b p-6">
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
            <div>
              <h1
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Anek Malayalam Variable" }}
              >
                മസ്ജിദ് അഫിലിയേഷനുള്ള അപേക്ഷ
              </h1>
              <p className="text-gray-600">Mosque Affiliation Application</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Anek Malayalam Variable" }}
            >
              അടിസ്ഥാന വിവരങ്ങൾ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  1. പള്ളിയുടെ പേര്
                </label>
                <input
                  type="text"
                  value={formData.mosqueName}
                  onChange={(e) =>
                    handleInputChange("mosqueName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  2. പള്ളിയുടെ സ്വഭാവം
                </label>
                <select
                  value={formData.mosqueAddress}
                  onChange={(e) =>
                    handleInputChange("mosqueAddress", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option
                    value=""
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    തിരഞ്ഞെടുക്കുക
                  </option>
                  <option
                    value="മഹല്ലി പള്ളി"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    മഹല്ലി പള്ളി
                  </option>
                  <option
                    value="ജുമുഅത്ത് പള്ളി"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    ജുമുഅത്ത് പള്ളി
                  </option>
                  <option
                    value="നമസ്ക്‌കാരപള്ളി"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    നമസ്ക്‌കാരപള്ളി
                  </option>
                  <option
                    value="ട‌ൗൺ പള്ളി"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    ട‌ൗൺ പള്ളി
                  </option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  3. മഹല്ലിന്‍റെ സ്വഭാവം
                </label>
                <select
                  value={formData.localityAddress}
                  onChange={(e) =>
                    handleInputChange("localityAddress", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option
                    value=""
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    തിരഞ്ഞെടുക്കുക
                  </option>
                  <option
                    value="പൂർണ മഹല്ല്"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    പൂർണ മഹല്ല്
                  </option>
                  <option
                    value="ഭാഗിക മഹല്ല്"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    ഭാഗിക മഹല്ല്
                  </option>
                  <option
                    value="സംയുക്തമഹല്ല്"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    സംയുക്തമഹല്ല്
                  </option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  4. പള്ളി പ്രവർത്തനമാരംഭിച്ച വർഷം
                </label>
                <input
                  type="number"
                  value={formData.yearStarted}
                  onChange={(e) =>
                    handleInputChange("yearStarted", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Address Details */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              5. വിലാസ വിവരങ്ങൾ
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  പൂർണ വിലാസം
                </label>
                <textarea
                  value={formData.completeAddress}
                  onChange={(e) =>
                    handleInputChange("completeAddress", e.target.value)
                  }
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    ജില്ല
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      handleInputChange("district", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    പിൻകോഡ്
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) =>
                      handleInputChange("pincode", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    ഫോൺ നമ്പർ 
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    ഇ മെയിൽ
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    വെബ്സൈറ്റ്
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Jamaat-e-Islami Details */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              6. ജമാഅത്തെ ഇസ്‌ലാമി ഘടകം
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  ഏരിയ
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  ജില്ല
                </label>
                <input
                  type="text"
                  value={formData.jamaatDistrict}
                  onChange={(e) =>
                    handleInputChange("jamaatDistrict", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Mosque Facilities */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              7. പള്ളിയോടനുബന്ധിച്ച ഇതര സംവിധാനങ്ങൾ
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-2 "
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              {facilities.map((facility) => (
                <label key={facility} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.facilities.includes(facility)}
                    onChange={() =>
                      handleCheckboxChange("facilities", facility)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">{facility}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Cemetery Details */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              8. ഖബറിസ്ഥാൻ വിവരങ്ങൾ
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  ഖബറിസ്ഥാൻ ഉണ്ടോ?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasCemetery"
                      value="ഉണ്ട്"
                      checked={formData.hasCemetery === "ഉണ്ട്"}
                      onChange={(e) =>
                        handleInputChange("hasCemetery", e.target.value)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2">ഉണ്ട്</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasCemetery"
                      value="ഇല്ല"
                      checked={formData.hasCemetery === "ഇല്ല"}
                      onChange={(e) =>
                        handleInputChange("hasCemetery", e.target.value)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2">ഇല്ല</span>
                  </label>
                </div>
              </div>
              {formData.hasCemetery === "ഉണ്ട്" && (
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    ഉണ്ടങ്കിൽ വിനൂർദ്ദനം എന്ത്
                  </label>
                  <input
                    type="text"
                    value={formData.cemeteryDescription}
                    onChange={(e) =>
                      handleInputChange("cemeteryDescription", e.target.value)
                    }
                    placeholder="വിനൂർദ്ദനം"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Mosque Specialty */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              9. പള്ളിയുടെ ശേഷി
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  പള്ളിയിൽ എത്ര പേർക്ക് നമസ്‌കരിക്കാം?
                </label>
                <input
                  type="number"
                  value={formData.specialtyDescription}
                  onChange={(e) =>
                    handleInputChange("specialtyDescription", e.target.value)
                  }
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  വിസ്തീര്‍ണം
                </label>
                <input
                  type="text"
                  placeholder="വർഗ അടി / വർഗ മീറ്റർ"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Juma Participants */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              10. ജുമുഅഅക്ക് പങ്കെടുക്കുന്നവരുടെ ശരാശരി എണ്ണം
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  പുരുഷന്മാർ
                </label>
                <input
                  type="number"
                  value={formData.menCount}
                  onChange={(e) =>
                    handleInputChange("menCount", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  സ്ത്രീകൾ
                </label>
                <input
                  type="number"
                  value={formData.womenCount}
                  onChange={(e) =>
                    handleInputChange("womenCount", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Financial Details */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              11-13. സാമ്പത്തിക വിവരങ്ങൾ
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  11. പള്ളിയുടെ സ്ഥാവര-ജംഗമ സ്വത്തുക്കൾ
                </label>
                <textarea
                  value={formData.financialAssets}
                  onChange={(e) =>
                    handleInputChange("financialAssets", e.target.value)
                  }
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  12. വരുമാന മാർഗ്ഗങ്ങൾ
                </label>
                <textarea
                  value={formData.incomeSource}
                  onChange={(e) =>
                    handleInputChange("incomeSource", e.target.value)
                  }
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  13. പ്രതിമാസ ചെലവ് (രൂപ)
                </label>
                <input
                  type="number"
                  value={formData.monthlyExpenses}
                  onChange={(e) =>
                    handleInputChange("monthlyExpenses", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Official Records */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              14-15. ഓഡിറ്റും രേഖകളും
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  14. വരവ് ചെലവ് കണക്കുകൾ കൃത്യമായി ഓഡിറ്റ് ചെയ്യാറാണ്ടോ?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="maintainsAccounts"
                      value="ഉണ്ട്"
                      checked={formData.maintainsAccounts === "ഉണ്ട്"}
                      onChange={(e) =>
                        handleInputChange("maintainsAccounts", e.target.value)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span
                      className="ml-2"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      ഉണ്ട്
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="maintainsAccounts"
                      value="ഇല്ല"
                      checked={formData.maintainsAccounts === "ഇല്ല"}
                      onChange={(e) =>
                        handleInputChange("maintainsAccounts", e.target.value)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span
                      className="ml-2"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      ഇല്ല
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  15. രേഖകൾ സൂക്ഷിക്കാറുണ്ടോ?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {recordTypes.map((record) => (
                    <label key={record} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.recordsKept.includes(record)}
                        onChange={() =>
                          handleCheckboxChange("recordsKept", record)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{record}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Last Year Accounts */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              16. കഴിഞ്ഞ ഒരു വർഷത്തെ മൊത്തം കണക്ക്
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  വരവ് (രൂപ)
                </label>
                <input
                  type="number"
                  value={formData.totalIncome}
                  onChange={(e) =>
                    handleInputChange("totalIncome", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  ചെലവ് (രൂപ)
                </label>
                <input
                  type="number"
                  value={formData.totalExpense}
                  onChange={(e) =>
                    handleInputChange("totalExpense", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Community Services */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              17. മഹല്ലിന്‍റെ / പള്ളിയുടെ മേൽനോട്ടത്തിൽ നടക്കുന്ന ജനസേവന
              സംരംഭങ്ങൾ
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {communityServices.map((service) => (
                  <label key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.communityServices.includes(service)}
                      onChange={() =>
                        handleCheckboxChange("communityServices", service)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  മറ്റുള്ളവ
                </label>
                <textarea
                  value={formData.otherServices}
                  onChange={(e) =>
                    handleInputChange("otherServices", e.target.value)
                  }
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Managing Committee */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              31-32. മാനേജിംഗ് കമ്മിറ്റിയും ഭാരവാഹികളും
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  31. മാനേജിംഗ് കമ്മിറ്റിയുടെ പേര്
                </label>
                <select
                  value={formData.committeeType}
                  onChange={(e) =>
                    handleInputChange("committeeType", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option
                    value=""
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    തിരഞ്ഞെടുക്കുക
                  </option>
                  <option
                    value="ട്രസ്റ്റ്"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    ട്രസ്റ്റ്{" "}
                  </option>
                  <option
                    value="അസോസിയേഷൻ"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    അസോസിയേഷൻ
                  </option>
                  <option
                    value="കമ്മറ്റി"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    കമ്മറ്റി
                  </option>
                  <option
                    value="മുതവല്ലി"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    മുതവല്ലി
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="font-medium mb-3"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    പ്രസിഡന്‍റ് / ചെയർമാൻ
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="പേര്"
                      value={formData.president.name}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "president",
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="മൊബൈൽ"
                      value={formData.president.mobile}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "president",
                          "mobile",
                          e.target.value
                        )
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors["president.mobile"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <input
                      type="email"
                      placeholder="ഇ മെയിൽ"
                      value={formData.president.email}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "president",
                          "email",
                          e.target.value
                        )
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors["president.email"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <h3
                    className="font-medium mb-3"
                    style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                  >
                    സെക്രട്ടറി
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="പേര്"
                      value={formData.secretary.name}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "secretary",
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="മൊബൈൽ"
                      value={formData.secretary.mobile}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "secretary",
                          "mobile",
                          e.target.value
                        )
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors["secretary.mobile"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <input
                      type="email"
                      placeholder="ഇ മെയിൽ"
                      value={formData.secretary.email}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "secretary",
                          "email",
                          e.target.value
                        )
                      }
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors["secretary.email"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Staff Details */}
          <section>
            <h2
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              34. ജീവനക്കാരുടെ വിവരങ്ങൾ
            </h2>
            <p
              className="text-sm text-gray-600 mb-4"
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
            >
              ഖത്വീബ് ഉൾപെടെ ജീവനക്കാരെ സംബന്ധിച്ച വിവരങ്ങൾ
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="border border-gray-300 p-2 text-left"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      നമ്പർ
                    </th>
                    <th
                      className="border border-gray-300 p-2 text-left"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      വയസ്സ്
                    </th>
                    <th
                      className="border border-gray-300 p-2 text-left"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      സാലറി
                    </th>
                    <th
                      className="border border-gray-300 p-2 text-left"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      യോഗ്യത
                    </th>
                    <th
                      className="border border-gray-300 p-2 text-left"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      ശമ്പളം
                    </th>
                    <th
                      className="border border-gray-300 p-2 text-left"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      റിമാർക്സ്
                    </th>
                    <th
                      className="border border-gray-300 p-2 text-left"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      പ്രവർത്തനം
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.staff.map((staff, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {staff.number}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="number"
                          value={staff.age}
                          onChange={(e) =>
                            handleStaffChange(index, "age", e.target.value)
                          }
                          className="w-full p-1 border border-gray-200 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          value={staff.salary}
                          onChange={(e) =>
                            handleStaffChange(index, "salary", e.target.value)
                          }
                          className="w-full p-1 border border-gray-200 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          value={staff.qualification}
                          onChange={(e) =>
                            handleStaffChange(
                              index,
                              "qualification",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border border-gray-200 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          value={staff.salary}
                          onChange={(e) =>
                            handleStaffChange(index, "salary", e.target.value)
                          }
                          className="w-full p-1 border border-gray-200 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          value={staff.remarks}
                          onChange={(e) =>
                            handleStaffChange(index, "remarks", e.target.value)
                          }
                          className="w-full p-1 border border-gray-200 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          value={staff.work}
                          onChange={(e) =>
                            handleStaffChange(index, "work", e.target.value)
                          }
                          className="w-full p-1 border border-gray-200 rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={addStaff}
              className="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
              <span style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}>
                പുതിയ ജീവനക്കാരുടെ ചേർക്കുക
              </span>
            </button>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  അന്യ സംസ്ഥാന ജീവനക്കാർ ഉണ്ടോ?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasOutstateStaff"
                      value="ഉണ്ട്"
                      checked={formData.hasOutstateStaff === "ഉണ്ട്"}
                      onChange={(e) =>
                        handleInputChange("hasOutstateStaff", e.target.value)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span
                      className="ml-2"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      ഉണ്ട്
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasOutstateStaff"
                      value="ഇല്ല"
                      checked={formData.hasOutstateStaff === "ഇല്ല"}
                      onChange={(e) =>
                        handleInputChange("hasOutstateStaff", e.target.value)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span
                      className="ml-2"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      ഇല്ല
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                >
                  അന്യ സംസ്ഥാന ജീവനക്കാരെ നിയമിക്കുമ്പോൾ ആവശ്യമായ നടപടിക്രമങ്ങൾ
                  പാലിക്കാറുണ്ടോ/രേഖകൾ സൂക്ഷിക്കാറുണ്ടോ?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                      type="radio"
                      name="followsOutstateProcedures"
                      value="ഉണ്ട്"
                      checked={formData.followsOutstateProcedures === "ഉണ്ട്"}
                      onChange={(e) =>
                        handleInputChange(
                          "followsOutstateProcedures",
                          e.target.value
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2">ഉണ്ട്</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                      type="radio"
                      name="followsOutstateProcedures"
                      value="ഇല്ല"
                      checked={formData.followsOutstateProcedures === "ഇല്ല"}
                      onChange={(e) =>
                        handleInputChange(
                          "followsOutstateProcedures",
                          e.target.value
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span
                      className="ml-2"
                      style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
                    >
                      ഇല്ല
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              റദ്ദാക്കുക
            </button>
            <button
              style={{ fontFamily: "Noto Sans Malayalam, sans-serif" }}
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
            >
              <span>അപേക്ഷ സമർപ്പിക്കുക</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliationForm;

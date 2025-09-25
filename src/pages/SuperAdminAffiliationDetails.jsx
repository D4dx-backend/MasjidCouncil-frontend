import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Printer, CheckCircle, XCircle } from 'lucide-react';

const SuperAdminAffiliationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [affiliation, setAffiliation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get affiliation data from navigation state or fetch by ID
    if (location.state?.affiliation) {
      setAffiliation(location.state.affiliation);
      setLoading(false);
    } else {
      // If no data in state, you might want to fetch by ID from URL params
      setError('No affiliation data found');
      setLoading(false);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate('/superadmin-affiliation-list');
  };

  const handleEdit = () => {
    // Navigate to edit page if needed
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading affiliation details...</p>
        </div>
      </div>
    );
  }

  if (error || !affiliation) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            {error || 'Affiliation data not found'}
          </h2>
          <button
            onClick={handleBack}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4" style={{ fontFamily: "Anek Malayalam Variable" }}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-green-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">മസ്ജിദ് അഫിലിയേഷൻ അപേക്ഷ - സൂപ്പർ അഡ്മിൻ</h1>
                <p className="text-green-100">Mosque Affiliation Application Details - Super Admin View</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleEdit}
                className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                എഡിറ്റ്
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition-colors"
              >
                <Printer className="w-4 h-4" />
                പ്രിന്റ്
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                ഡൗൺലോഡ്
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Basic Information */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">അടിസ്ഥാന വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">പള്ളിയുടെ പേര്</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.name || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">പള്ളിയുടെ സ്വഭാവം</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.mosqueType || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">മഹല്ലിന്‍റെ സ്വഭാവം</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.mahallaType || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">പ്രവർത്തനമാരംഭിച്ച വർഷം</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.establishedYear || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Address Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">വിലാസ വിവരങ്ങൾ</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">പൂർണ വിലാസം</label>
                <p className="text-gray-900 whitespace-pre-wrap">{affiliation.address?.[0]?.address || 'വിവരം ഇല്ല'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">ജില്ല</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.district || 'വിവരം ഇല്ല'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">പിൻകോഡ്</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.pincode || 'വിവരം ഇല്ല'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">ഫോൺ</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.phone || 'വിവരം ഇല്ല'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">ഇ മെയിൽ</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.email || 'വിവരം ഇല്ല'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">വെബ്സൈറ്റ്</label>
                  <p className="text-gray-900">{affiliation.address?.[0]?.website || 'വിവരം ഇല്ല'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Jamaat-e-Islami Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജമാഅത്തെ ഇസ്‌ലാമി ഘടകം</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ഏരിയ</label>
                <p className="text-gray-900">{affiliation.jamathArea?.[0]?.area || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ജില്ല</label>
                <p className="text-gray-900">{affiliation.jamathArea?.[0]?.district || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Mosque Facilities */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">പള്ളിയോടനുബന്ധിച്ച ഇതര സംവിധാനങ്ങൾ</h2>
            {affiliation.facilities && affiliation.facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {affiliation.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900">{facility}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">സംവിധാനങ്ങൾ തിരഞ്ഞെടുത്തിട്ടില്ല</p>
            )}
          </section>

          {/* Cemetery Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ഖബറിസ്ഥാൻ വിവരങ്ങൾ</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">ഖബറിസ്ഥാൻ ഉണ്ടോ?</label>
                <p className="text-gray-900">{affiliation.hasCemetery ? 'ഉണ്ട്' : 'ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Mosque Specialty */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">പള്ളിയുടെ ശേഷി</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">നമസ്‌കാര ശേഷി (പേർ)</label>
                <p className="text-gray-900">{affiliation.mosqueCapacity || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">വിസ്തീര്‍ണം</label>
                <p className="text-gray-900">{affiliation.mosqueArea || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Juma Participants */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജുമുഅ പങ്കാളികൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">പുരുഷന്മാർ</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.fridayMaleAttendance || '0'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">സ്ത്രീകൾ</label>
                <p className="text-lg font-medium text-gray-900">{affiliation.fridayFemaleAttendance || '0'}</p>
              </div>
            </div>
          </section>

          {/* Financial Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">സാമ്പത്തിക വിവരങ്ങൾ</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">സ്ഥാവര-ജംഗമ സ്വത്തുക്കൾ</label>
                <p className="text-gray-900 whitespace-pre-wrap">{affiliation.finance?.[0]?.assets || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">വരുമാന മാർഗ്ഗങ്ങൾ</label>
                <p className="text-gray-900 whitespace-pre-wrap">{affiliation.finance?.[0]?.incomeSource || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">പ്രതിമാസ ചെലവ് (രൂപ)</label>
                <p className="text-lg font-medium text-gray-900">₹{affiliation.finance?.[0]?.monthlyExpense || '0'}</p>
              </div>
            </div>
          </section>

          {/* Official Records */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ഓഡിറ്റും രേഖകളും</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ഓഡിറ്റ് ചെയ്യാറുണ്ടോ?</label>
                <p className="text-gray-900">{affiliation.audit?.[0]?.hasAudit ? 'ഉണ്ട്' : 'ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">സൂക്ഷിക്കുന്ന രേഖകൾ</label>
                {affiliation.audit?.[0]?.recordsKept && affiliation.audit[0].recordsKept.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                    {affiliation.audit[0].recordsKept.map((record, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-900 text-sm">{record}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">രേഖകൾ തിരഞ്ഞെടുത്തിട്ടില്ല</p>
                )}
              </div>
            </div>
          </section>

          {/* Last Year Accounts */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">കഴിഞ്ഞ വർഷത്തെ കണക്ക്</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">വരവ് (രൂപ)</label>
                <p className="text-lg font-medium text-green-600">₹{affiliation.accounts?.[0]?.lastYearIncome || '0'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ചെലവ് (രൂപ)</label>
                <p className="text-lg font-medium text-red-600">₹{affiliation.accounts?.[0]?.lastYearExpense || '0'}</p>
              </div>
            </div>
          </section>

          {/* Community Services */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജനസേവന സംരംഭങ്ങൾ</h2>
            <div className="space-y-4">
              {affiliation.commmunityServices && affiliation.commmunityServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {affiliation.commmunityServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-900">{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">സേവനങ്ങൾ തിരഞ്ഞെടുത്തിട്ടില്ല</p>
              )}
              {affiliation.otherCommunityServices && affiliation.otherCommunityServices.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">മറ്റുള്ളവ</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{affiliation.otherCommunityServices.join('\n')}</p>
                </div>
              )}
            </div>
          </section>

          {/* Managing Committee */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മാനേജിംഗ് കമ്മിറ്റി</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">കമ്മിറ്റിയുടെ പേര്</label>
                <p className="text-gray-900">{affiliation.committees?.[0]?.committeeType || 'വിവരം ഇല്ല'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-3 text-blue-800">പ്രസിഡന്‍റ് / ചെയർമാൻ</h3>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-600">പേര്:</span> {affiliation.committees?.[0]?.president?.[0]?.name || 'വിവരം ഇല്ല'}</p>
                    <p><span className="text-sm text-gray-600">മൊബൈൽ:</span> {affiliation.committees?.[0]?.president?.[0]?.phone || 'വിവരം ഇല്ല'}</p>
                    <p><span className="text-sm text-gray-600">ഇ മെയിൽ:</span> {affiliation.committees?.[0]?.president?.[0]?.email || 'വിവരം ഇല്ല'}</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium mb-3 text-green-800">സെക്രട്ടറി</h3>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-600">പേര്:</span> {affiliation.committees?.[0]?.secretary?.[0]?.name || 'വിവരം ഇല്ല'}</p>
                    <p><span className="text-sm text-gray-600">മൊബൈൽ:</span> {affiliation.committees?.[0]?.secretary?.[0]?.phone || 'വിവരം ഇല്ല'}</p>
                    <p><span className="text-sm text-gray-600">ഇ മെയിൽ:</span> {affiliation.committees?.[0]?.secretary?.[0]?.email || 'വിവരം ഇല്ല'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Staff Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജീവനക്കാരുടെ വിവരങ്ങൾ</h2>
            {affiliation.committees?.[0]?.workers && affiliation.committees[0].workers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 p-3 text-left">നമ്പർ</th>
                      <th className="border border-gray-300 p-3 text-left">വയസ്സ്</th>
                      <th className="border border-gray-300 p-3 text-left">യോഗ്യത</th>
                      <th className="border border-gray-300 p-3 text-left">ശമ്പളം</th>
                      <th className="border border-gray-300 p-3 text-left">പ്രവർത്തനം</th>
                      <th className="border border-gray-300 p-3 text-left">റിമാർക്സ്</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliation.committees[0].workers.map((staff, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3">{index + 1}</td>
                        <td className="border border-gray-300 p-3">{staff.age || '-'}</td>
                        <td className="border border-gray-300 p-3">{staff.qualification || '-'}</td>
                        <td className="border border-gray-300 p-3">{staff.salary || '-'}</td>
                        <td className="border border-gray-300 p-3">{staff.working || '-'}</td>
                        <td className="border border-gray-300 p-3">{staff.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">ജീവനക്കാരുടെ വിവരങ്ങൾ ചേർത്തിട്ടില്ല</p>
            )}
          </section>

          {/* Super Admin Actions */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
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

export default SuperAdminAffiliationDetails;
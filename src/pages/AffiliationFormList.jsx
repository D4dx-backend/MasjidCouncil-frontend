// import React from 'react';
// import { ArrowLeft, Download, Edit, Printer } from 'lucide-react';

// const AffiliationFormLit = ({ formData, onBack, onEdit }) => {
//   if (!formData) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-gray-600" style={{ fontFamily: "Anek Malayalam Variable" }}>
//             ഡാറ്റ ലഭ്യമല്ല
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownload = () => {
//     alert('ഡൗൺലോഡ് ഫീച്ചർ ഉടൻ ലഭ്യമാകും');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4" style={{ fontFamily: "Anek Malayalam Variable" }}>
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={onBack}
//                 className="p-2 hover:bg-blue-700 rounded-full transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold">മസ്ജിദ് അഫിലിയേഷൻ അപേക്ഷ</h1>
//                 <p className="text-blue-100">Mosque Affiliation Application Details</p>
//               </div>
//             </div>
            
//             <div className="flex gap-2">
//               <button 
//                 onClick={onEdit}
//                 className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
//               >
//                 <Edit className="w-4 h-4" />
//                 എഡിറ്റ്
//               </button>
//               <button 
//                 onClick={handlePrint}
//                 className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
//               >
//                 <Printer className="w-4 h-4" />
//                 പ്രിന്റ്
//               </button>
//               <button 
//                 onClick={handleDownload}
//                 className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
//               >
//                 <Download className="w-4 h-4" />
//                 ഡൗൺലോഡ്
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="p-8 space-y-8">
//           {/* Basic Information */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">അടിസ്ഥാന വിവരങ്ങൾ</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">പള്ളിയുടെ പേര്</label>
//                 <p className="text-lg font-medium text-gray-900">{formData.mosqueName || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">പള്ളിയുടെ സ്വഭാവം</label>
//                 <p className="text-lg font-medium text-gray-900">{formData.mosqueAddress || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">മഹല്ലിന്‍റെ സ്വഭാവം</label>
//                 <p className="text-lg font-medium text-gray-900">{formData.localityAddress || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">പ്രവർത്തനമാരംഭിച്ച വർഷം</label>
//                 <p className="text-lg font-medium text-gray-900">{formData.yearStarted || 'വിവരം ഇല്ല'}</p>
//               </div>
//             </div>
//           </section>

//           {/* Address Details */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">വിലാസ വിവരങ്ങൾ</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">പൂർണ വിലാസം</label>
//                 <p className="text-gray-900 whitespace-pre-wrap">{formData.completeAddress || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">ജില്ല</label>
//                   <p className="text-gray-900">{formData.district || 'വിവരം ഇല്ല'}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">പിൻകോഡ്</label>
//                   <p className="text-gray-900">{formData.pincode || 'വിവരം ഇല്ല'}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">ഫോൺ</label>
//                   <p className="text-gray-900">{formData.phone || 'വിവരം ഇല്ല'}</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">ഇ മെയിൽ</label>
//                   <p className="text-gray-900">{formData.email || 'വിവരം ഇല്ല'}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">വെബ്സൈറ്റ്</label>
//                   <p className="text-gray-900">{formData.website || 'വിവരം ഇല്ല'}</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Jamaat-e-Islami Details */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജമാഅത്തെ ഇസ്‌ലാമി ഘടകം</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">ഏരിയ</label>
//                 <p className="text-gray-900">{formData.area || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">ജില്ല</label>
//                 <p className="text-gray-900">{formData.jamaatDistrict || 'വിവരം ഇല്ല'}</p>
//               </div>
//             </div>
//           </section>

//           {/* Mosque Facilities */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">പള്ളിയോടനുബന്ധിച്ച ഇതര സംവിധാനങ്ങൾ</h2>
//             {formData.facilities && formData.facilities.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                 {formData.facilities.map((facility, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span className="text-gray-900">{facility}</span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">സംവിധാനങ്ങൾ തിരഞ്ഞെടുത്തിട്ടില്ല</p>
//             )}
//           </section>

//           {/* Cemetery Details */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ഖബറിസ്ഥാൻ വിവരങ്ങൾ</h2>
//             <div className="space-y-3">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">ഖബറിസ്ഥാൻ ഉണ്ടോ?</label>
//                 <p className="text-gray-900">{formData.hasCemetery || 'വിവരം ഇല്ല'}</p>
//               </div>
//               {formData.hasCemetery === 'ഉണ്ട്' && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">വിനൂർദ്ദനം</label>
//                   <p className="text-gray-900">{formData.cemeteryDescription || 'വിവരം ഇല്ല'}</p>
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* Mosque Specialty */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">പള്ളിയുടെ ശേഷി</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">നമസ്‌കാര ശേഷി (പേർ)</label>
//                 <p className="text-gray-900">{formData.specialtyDescription || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">വിസ്തീര്‍ണം</label>
//                 <p className="text-gray-900">{formData.category || 'വിവരം ഇല്ല'}</p>
//               </div>
//             </div>
//           </section>

//           {/* Juma Participants */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജുമുഅ പങ്കാളികൾ</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">പുരുഷന്മാർ</label>
//                 <p className="text-lg font-medium text-gray-900">{formData.menCount || '0'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">സ്ത്രീകൾ</label>
//                 <p className="text-lg font-medium text-gray-900">{formData.womenCount || '0'}</p>
//               </div>
//             </div>
//           </section>

//           {/* Financial Details */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">സാമ്പത്തിക വിവരങ്ങൾ</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">സ്ഥാവര-ജംഗമ സ്വത്തുക്കൾ</label>
//                 <p className="text-gray-900 whitespace-pre-wrap">{formData.financialAssets || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">വരുമാന മാർഗ്ഗങ്ങൾ</label>
//                 <p className="text-gray-900 whitespace-pre-wrap">{formData.incomeSource || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">പ്രതിമാസ ചെലവ് (രൂപ)</label>
//                 <p className="text-lg font-medium text-gray-900">₹{formData.monthlyExpenses || '0'}</p>
//               </div>
//             </div>
//           </section>

//           {/* Official Records */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ഓഡിറ്റും രേഖകളും</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">ഓഡിറ്റ് ചെയ്യാറുണ്ടോ?</label>
//                 <p className="text-gray-900">{formData.maintainsAccounts || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">സൂക്ഷിക്കുന്ന രേഖകൾ</label>
//                 {formData.recordsKept && formData.recordsKept.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
//                     {formData.recordsKept.map((record, index) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                         <span className="text-gray-900 text-sm">{record}</span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">രേഖകൾ തിരഞ്ഞെടുത്തിട്ടില്ല</p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* Last Year Accounts */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">കഴിഞ്ഞ വർഷത്തെ കണക്ക്</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">വരവ് (രൂപ)</label>
//                 <p className="text-lg font-medium text-green-600">₹{formData.totalIncome || '0'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">ചെലവ് (രൂപ)</label>
//                 <p className="text-lg font-medium text-red-600">₹{formData.totalExpense || '0'}</p>
//               </div>
//             </div>
//             {formData.totalIncome && formData.totalExpense && (
//               <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                 <label className="text-sm font-medium text-gray-600">ബാലൻസ്</label>
//                 <p className={`text-lg font-medium ${(formData.totalIncome - formData.totalExpense) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                   ₹{(formData.totalIncome - formData.totalExpense).toLocaleString()}
//                 </p>
//               </div>
//             )}
//           </section>

//           {/* Community Services */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജനസേവന സംരംഭങ്ങൾ</h2>
//             <div className="space-y-4">
//               {formData.communityServices && formData.communityServices.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                   {formData.communityServices.map((service, index) => (
//                     <div key={index} className="flex items-center space-x-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       <span className="text-gray-900">{service}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">സേവനങ്ങൾ തിരഞ്ഞെടുത്തിട്ടില്ല</p>
//               )}
//               {formData.otherServices && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">മറ്റുള്ളവ</label>
//                   <p className="text-gray-900 whitespace-pre-wrap">{formData.otherServices}</p>
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* Managing Committee */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മാനേജിംഗ് കമ്മിറ്റി</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">കമ്മിറ്റിയുടെ പേര്</label>
//                 <p className="text-gray-900">{formData.committeeType || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                   <h3 className="font-medium mb-3 text-blue-800">പ്രസിഡന്‍റ് / ചെയർമാൻ</h3>
//                   <div className="space-y-2">
//                     <p><span className="text-sm text-gray-600">പേര്:</span> {formData.president?.name || 'വിവരം ഇല്ല'}</p>
//                     <p><span className="text-sm text-gray-600">മൊബൈൽ:</span> {formData.president?.mobile || 'വിവരം ഇല്ല'}</p>
//                     <p><span className="text-sm text-gray-600">ഇ മെയിൽ:</span> {formData.president?.email || 'വിവരം ഇല്ല'}</p>
//                   </div>
//                 </div>
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <h3 className="font-medium mb-3 text-green-800">സെക്രട്ടറി</h3>
//                   <div className="space-y-2">
//                     <p><span className="text-sm text-gray-600">പേര്:</span> {formData.secretary?.name || 'വിവരം ഇല്ല'}</p>
//                     <p><span className="text-sm text-gray-600">മൊബൈൽ:</span> {formData.secretary?.mobile || 'വിവരം ഇല്ല'}</p>
//                     <p><span className="text-sm text-gray-600">ഇ മെയിൽ:</span> {formData.secretary?.email || 'വിവരം ഇല്ല'}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Staff Details */}
//           <section className="border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജീവനക്കാരുടെ വിവരങ്ങൾ</h2>
//             {formData.staff && formData.staff.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="border border-gray-300 p-3 text-left">നമ്പർ</th>
//                       <th className="border border-gray-300 p-3 text-left">വയസ്സ്</th>
//                       <th className="border border-gray-300 p-3 text-left">യോഗ്യത</th>
//                       <th className="border border-gray-300 p-3 text-left">ശമ്പളം</th>
//                       <th className="border border-gray-300 p-3 text-left">പ്രവർത്തനം</th>
//                       <th className="border border-gray-300 p-3 text-left">റിമാർക്സ്</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {formData.staff.map((staff, index) => (
//                       <tr key={index} className="hover:bg-gray-50">
//                         <td className="border border-gray-300 p-3">{staff.number}</td>
//                         <td className="border border-gray-300 p-3">{staff.age || '-'}</td>
//                         <td className="border border-gray-300 p-3">{staff.qualification || '-'}</td>
//                         <td className="border border-gray-300 p-3">{staff.salary || '-'}</td>
//                         <td className="border border-gray-300 p-3">{staff.work || '-'}</td>
//                         <td className="border border-gray-300 p-3">{staff.remarks || '-'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-gray-500">ജീവനക്കാരുടെ വിവരങ്ങൾ ചേർത്തിട്ടില്ല</p>
//             )}
            
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">അന്യ സംസ്ഥാന ജീവനക്കാർ ഉണ്ടോ?</label>
//                 <p className="text-gray-900">{formData.hasOutstateStaff || 'വിവരം ഇല്ല'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">നടപടിക്രമങ്ങൾ പാലിക്കാറുണ്ടോ?</label>
//                 <p className="text-gray-900">{formData.followsOutstateProcedures || 'വിവരം ഇല്ല'}</p>
//               </div>
//             </div>
//           </section>

//           {/* Submission Timestamp */}
//           <section className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു</h3>
//               <p className="text-sm text-gray-600">
//                 സമർപ്പിച്ച സമയം: {new Date().toLocaleString('ml-IN', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit'
//                 })}
//               </p>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AffiliationFormLit;


import React from 'react';
import { ArrowLeft, Download, Edit, Printer } from 'lucide-react';

const AffiliationFormLit = ({ onBack, onEdit }) => {
  // Dummy data object
  const formData = {
    mosqueName: "ജുമാഅ മസ്ജിദ് അൽ നൂർ",
    mosqueAddress: "സുന്നി",
    localityAddress: "നഗര മേഖല",
    yearStarted: "1985",
    completeAddress: "അൽ നൂർ മസ്ജിദ്\nമെയിൻ റോഡ്\nകണയാന്നൂർ\nഎറണാകുളം ജില്ല\nകേരളം - 682312",
    district: "എറണാകുളം",
    pincode: "682312",
    phone: "0484-2345678",
    email: "alnoor.mosque@gmail.com",
    website: "www.alnoormasjid.org",
    area: "കണയാന്നൂർ ഏരിയ",
    jamaatDistrict: "എറണാകുളം",
    facilities: [
      "മദ്റസ",
      "ലൈബ്രറി",
      "കമ്മ്യൂണിറ്റി ഹാൾ",
      "വുദു ഖാന",
      "പാർക്കിംഗ്",
      "ബോർവെൽ"
    ],
    hasCemetery: "ഉണ്ട്",
    cemeteryDescription: "2 ഏക്കർ വിസ്തീർണമുള്ള ഖബറിസ്ഥാൻ. 500 ഖബറുകൾക്കുള്ള സൗകര്യം.",
    specialtyDescription: "500",
    category: "2000 ചതുരശ്ര അടി",
    menCount: "350",
    womenCount: "150",
    financialAssets: "കെട്ടിടം: ₹50,00,000\nഭൂമി: ₹30,00,000\nഉപകരണങ്ങൾ: ₹5,00,000\nബാങ്ക് ബാലൻസ്: ₹2,50,000",
    incomeSource: "ചന്ദ സംഗ്രഹം\nജുമുഅ ചന്ദ\nസക്കാത്ത് സംഗ്രഹം\nറെന്റൽ വരുമാനം",
    monthlyExpenses: "75000",
    maintainsAccounts: "ഉണ്ട്",
    recordsKept: [
      "വരവ് ചെലവ് രജിസ്റ്റർ",
      "മീറ്റിംഗ് മിനിറ്റ്സ്",
      "ബാങ്ക് സ്റ്റേറ്റ്മെന്റ്",
      "ഓഡിറ്റ് റിപ്പോർട്ട്"
    ],
    totalIncome: "900000",
    totalExpense: "850000",
    communityServices: [
      "സക്കാത്ത് വിതരണം",
      "ആരോഗ്യ ക്യാമ്പ്",
      "വിദ്യാഭ്യാസ സഹായം",
      "ഇഫ്താർ വിതരണം",
      "വിവാഹ സഹായം"
    ],
    otherServices: "വിധവകൾക്കുള്ള പ്രത്യേക സഹായം\nയാത്രക്കാർക്കുള്ള താമസ സൗകര്യം\nഇസ്‌ലാമിക് പുസ്തക വിൽപ്പന",
    committeeType: "മസ്ജിദ് കമ്മിറ്റി",
    president: {
      name: "ഹാജി അബ്ദുൽ റഹ്മാൻ",
      mobile: "9876543210",
      email: "president@alnoormasjid.org"
    },
    secretary: {
      name: "മുഹമ്മദ് ഫാറൂഖ്",
      mobile: "9876543211",
      email: "secretary@alnoormasjid.org"
    },
    staff: [
      {
        number: "1",
        age: "45",
        qualification: "ദാരുൽ ഉലൂം",
        salary: "₹25,000",
        work: "ഇമാം",
        remarks: "15 വർഷത്തെ അനുഭവം"
      },
      {
        number: "2",
        age: "38",
        qualification: "ബി.എ അറബിക്",
        salary: "₹15,000",
        work: "മുഅദ്ദിൻ",
        remarks: "മദ്റസ അധ്യാപകൻ കൂടി"
      },
      {
        number: "3",
        age: "55",
        qualification: "പ്ലസ് ടു",
        salary: "₹8,000",
        work: "കാവൽക്കാരൻ",
        remarks: "നൈറ്റ് ഡ്യൂട്ടി"
      }
    ],
    hasOutstateStaff: "ഇല്ല",
    followsOutstateProcedures: "ബാധകമല്ല"
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('ഡൗൺലോഡ് ഫീച്ചർ ഉടൻ ലഭ്യമാകും');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4" style={{ fontFamily: "Anek Malayalam Variable" }}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}


        <div className="p-8 space-y-8">
          {/* Basic Information */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">അടിസ്ഥാന വിവരങ്ങൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">പള്ളിയുടെ പേര്</label>
                <p className="text-lg font-medium text-gray-900">{formData.mosqueName || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">പള്ളിയുടെ സ്വഭാവം</label>
                <p className="text-lg font-medium text-gray-900">{formData.mosqueAddress || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">മഹല്ലിന്‍റെ സ്വഭാവം</label>
                <p className="text-lg font-medium text-gray-900">{formData.localityAddress || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">പ്രവർത്തനമാരംഭിച്ച വർഷം</label>
                <p className="text-lg font-medium text-gray-900">{formData.yearStarted || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Address Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">വിലാസ വിവരങ്ങൾ</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">പൂർണ വിലാസം</label>
                <p className="text-gray-900 whitespace-pre-wrap">{formData.completeAddress || 'വിവരം ഇല്ല'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">ജില്ല</label>
                  <p className="text-gray-900">{formData.district || 'വിവരം ഇല്ല'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">പിൻകോഡ്</label>
                  <p className="text-gray-900">{formData.pincode || 'വിവരം ഇല്ല'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">ഫോൺ</label>
                  <p className="text-gray-900">{formData.phone || 'വിവരം ഇല്ല'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">ഇ മെയിൽ</label>
                  <p className="text-gray-900">{formData.email || 'വിവരം ഇല്ല'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">വെബ്സൈറ്റ്</label>
                  <p className="text-gray-900">{formData.website || 'വിവരം ഇല്ല'}</p>
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
                <p className="text-gray-900">{formData.area || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ജില്ല</label>
                <p className="text-gray-900">{formData.jamaatDistrict || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Mosque Facilities */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">പള്ളിയോടനുബന്ധിച്ച ഇതര സംവിധാനങ്ങൾ</h2>
            {formData.facilities && formData.facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {formData.facilities.map((facility, index) => (
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
                <p className="text-gray-900">{formData.hasCemetery || 'വിവരം ഇല്ല'}</p>
              </div>
              {formData.hasCemetery === 'ഉണ്ട്' && (
                <div>
                  <label className="text-sm font-medium text-gray-600">വിനൂർദ്ദനം</label>
                  <p className="text-gray-900">{formData.cemeteryDescription || 'വിവരം ഇല്ല'}</p>
                </div>
              )}
            </div>
          </section>

          {/* Mosque Specialty */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">പള്ളിയുടെ ശേഷി</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">നമസ്‌കാര ശേഷി (പേർ)</label>
                <p className="text-gray-900">{formData.specialtyDescription || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">വിസ്തീര്‍ണം</label>
                <p className="text-gray-900">{formData.category || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Juma Participants */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജുമുഅ പങ്കാളികൾ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">പുരുഷന്മാർ</label>
                <p className="text-lg font-medium text-gray-900">{formData.menCount || '0'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">സ്ത്രീകൾ</label>
                <p className="text-lg font-medium text-gray-900">{formData.womenCount || '0'}</p>
              </div>
            </div>
          </section>

          {/* Financial Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">സാമ്പത്തിക വിവരങ്ങൾ</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">സ്ഥാവര-ജംഗമ സ്വത്തുക്കൾ</label>
                <p className="text-gray-900 whitespace-pre-wrap">{formData.financialAssets || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">വരുമാന മാർഗ്ഗങ്ങൾ</label>
                <p className="text-gray-900 whitespace-pre-wrap">{formData.incomeSource || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">പ്രതിമാസ ചെലവ് (രൂപ)</label>
                <p className="text-lg font-medium text-gray-900">₹{formData.monthlyExpenses || '0'}</p>
              </div>
            </div>
          </section>

          {/* Official Records */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ഓഡിറ്റും രേഖകളും</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ഓഡിറ്റ് ചെയ്യാറുണ്ടോ?</label>
                <p className="text-gray-900">{formData.maintainsAccounts || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">സൂക്ഷിക്കുന്ന രേഖകൾ</label>
                {formData.recordsKept && formData.recordsKept.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                    {formData.recordsKept.map((record, index) => (
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
                <p className="text-lg font-medium text-green-600">₹{formData.totalIncome || '0'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ചെലവ് (രൂപ)</label>
                <p className="text-lg font-medium text-red-600">₹{formData.totalExpense || '0'}</p>
              </div>
            </div>
            {formData.totalIncome && formData.totalExpense && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-600">ബാലൻസ്</label>
                <p className={`text-lg font-medium ${(formData.totalIncome - formData.totalExpense) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{(formData.totalIncome - formData.totalExpense).toLocaleString()}
                </p>
              </div>
            )}
          </section>

          {/* Community Services */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">മഹല്ലിന്‍റെ / പള്ളിയുടെ മേൽനോട്ടത്തിൽ നടക്കുന്ന ജനസേവന സംരംഭങ്ങൾ</h2>
            <div className="space-y-4">
              {formData.communityServices && formData.communityServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {formData.communityServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-900">{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">സേവനങ്ങൾ തിരഞ്ഞെടുത്തിട്ടില്ല</p>
              )}
              {formData.otherServices && (
                <div>
                  <label className="text-sm font-medium text-gray-600">മറ്റുള്ളവ</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{formData.otherServices}</p>
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
                <p className="text-gray-900">{formData.committeeType || 'വിവരം ഇല്ല'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-3 text-blue-800">പ്രസിഡന്‍റ് / ചെയർമാൻ</h3>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-600">പേര്:</span> {formData.president?.name || 'വിവരം ഇല്ല'}</p>
                    <p><span className="text-sm text-gray-600">മൊബൈൽ:</span> {formData.president?.mobile || 'വിവരം ഇല്ല'}</p>
                    <p><span className="text-sm text-gray-600">ഇ മെയിൽ:</span> {formData.president?.email || 'വിവരം ഇല്ല'}</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium mb-3 text-green-800">സെക്രട്ടറി</h3>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-600">പേര്:</span> {formData.secretary?.name || 'വിവരം ഇല്ല'}</p>
                    <p><span className="text-sm text-gray-600">മൊബൈൽ:</span> {formData.secretary?.mobile || 'വിവരം ഇല്ല'}</p>
                    <p><span className="text-sm text-gray-600">ഇ മെയിൽ:</span> {formData.secretary?.email || 'വിവരം ഇല്ല'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Staff Details */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ജീവനക്കാരുടെ വിവരങ്ങൾ</h2>
            {formData.staff && formData.staff.length > 0 ? (
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
                    {formData.staff.map((staff, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3">{staff.number}</td>
                        <td className="border border-gray-300 p-3">{staff.age || '-'}</td>
                        <td className="border border-gray-300 p-3">{staff.qualification || '-'}</td>
                        <td className="border border-gray-300 p-3">{staff.salary || '-'}</td>
                        <td className="border border-gray-300 p-3">{staff.work || '-'}</td>
                        <td className="border border-gray-300 p-3">{staff.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">ജീവനക്കാരുടെ വിവരങ്ങൾ ചേർത്തിട്ടില്ല</p>
            )}
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">അന്യ സംസ്ഥാന ജീവനക്കാർ ഉണ്ടോ?</label>
                <p className="text-gray-900">{formData.hasOutstateStaff || 'വിവരം ഇല്ല'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">അന്യ സംസ്ഥാന ജീവനക്കാരെ നിയമിക്കുമ്പോൾ ആവശ്യമായ നടപടിക്രമങ്ങൾ പാലിക്കാറുണ്ടോ/രേഖകൾ സൂക്ഷിക്കാറുണ്ടോ?</label>
                <p className="text-gray-900">{formData.followsOutstateProcedures || 'വിവരം ഇല്ല'}</p>
              </div>
            </div>
          </section>

          {/* Submission Timestamp */}
          {/* <section className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു</h3>
              <p className="text-sm text-gray-600">
                സമർപ്പിച്ച സമയം: {new Date().toLocaleString('ml-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </section> */}
          <div className="flex justify-between mt-4">
  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow">
    Confirm
  </button>
  <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md shadow">
    Reject
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default AffiliationFormLit;
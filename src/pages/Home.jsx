import React, { useState } from 'react';
import { LogIn, Building2, UserRound, Search, MapPin, Phone, Mail } from 'lucide-react';
import masjidBg from '../assets/masjid.png';
import logo from '../assets/logo.png';
import mosq from '../assets/mosque.svg'
import { useNavigate } from 'react-router-dom';

const applications = [
  {
    title: 'Mosque Affiliation',
    malayalam: 'മസ്ജിദ് അഫിലിയേഷൻ',
    description: 'Apply for mosque affiliation with Masjid Council Kerala',
    icon: <img src={mosq} alt="Mosque" className="w-5 h-5 " />,
    bgColor: 'bg-[#8cbb58]',
  },
  {
    title: 'Imam Muaddin Welfare Fund',
    malayalam: 'ഇമാം മുഅദ്ദിൻ ക്ഷേമനിധി',
    description: 'Apply for welfare assistance for mosque staff',
    icon: <UserRound className="w-5 h-5 text-white" />,
    bgColor: 'bg-[#8cbb58]',
  },
  {
    title: 'Mosque Fund',
    malayalam: 'മസ്ജിദ് ഫണ്ട്',
    description: 'Apply for financial assistance for mosque maintenance and repairs',
    icon: <Building2 className="w-5 h-5 text-white" />,
    bgColor: 'bg-[#8cbb58]',
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrackStatus = () => {
    if (referenceNumber.trim()) {
      setErrorMessage('');
      console.log('Tracking application for:', referenceNumber);
      // Navigate or call API here
    } else {
      setErrorMessage('Please enter a reference number or mobile number');
    }
  };
  

  const handleNavigation = (title) => {
    if (title === 'Mosque Affiliation') {
      navigate('/affiliation');
    } else if (title === 'Imam Muaddin Welfare Fund') {
      navigate('/medical-aid');
    } else if (title === 'Mosque Fund') {
      navigate('/mosque-fund');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTrackStatus();
    }
  };

  return (
    <div>
      <div className="px-4 py-8 md:px-8 lg:px-16">
        <div
          className="relative h-96 md:h-[600px] bg-cover bg-center rounded-xl overflow-hidden shadow-2xl mx-auto max-w-7xl"
          style={{
            backgroundImage: `url(${masjidBg})`,
          }}
        ></div>
      </div>

      <div className="bg-white py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-12 "
        style={{ fontFamily: "Anek Malayalam Variable" }}
        >
          അപേക്ഷകൾ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transition hover:shadow-xl"
            >
              <div>
                {/* Title and Icon in the same row */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${app.bgColor}`}>
                    {app.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{app.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-2" 
        style={{ fontFamily: "Anek Malayalam Variable" }}
                
                >{app.malayalam}</p>
                <p className="text-sm text-gray-500 mb-6">{app.description}</p>
              </div>
              <button
                onClick={() => handleNavigation(app.title)}
                className="mt-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
              >
                Start Application
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-xl mx-auto">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="reference"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Reference Number or Mobile Number
            </label>

            <input
              type="text"
              id="reference"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter reference number or mobile number"
              className={`w-full px-4 py-3 border ${
                errorMessage ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500 outline-none text-sm sm:text-base`}
            />

            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>

          <button
            onClick={handleTrackStatus}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 outline-none text-sm sm:text-base"
          >
            <Search className="h-5 w-5" />
            <span>Track Status</span>
          </button>
        </div>

        <div className="mt-6 text-center px-2">
          <p className="text-xs sm:text-sm text-gray-500">
            Enter your application reference number or the mobile number used during registration
          </p>
        </div>
      </div>

      <div className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-emerald-200 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Address</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Hira Centre, Mavoor Road<br />
                    Kozhikode - 673001
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-emerald-200 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <a
                    href="tel:+914952720101"
                    className="text-emerald-100 text-sm hover:text-white transition"
                  >
                    +91 495 2720 101
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-emerald-200 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:info@masjidcouncilkerala.org"
                    className="text-emerald-100 text-sm hover:text-white transition"
                  >
                    info@masjidcouncilkerala.org
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg h-64 lg:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3913.0048853421154!2d75.7886534!3d11.2610504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDE1JzM5LjgiTiA3NcKwNDcnMTkuMiJF!5e0!3m2!1sen!2sbh!4v1748684741914!5m2!1sen!2sbh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Masjid Council Kerala Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-800 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20">
                <img src={logo} alt="logo" className="object-contain w-full h-full" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-emerald-200 text-sm">
                  © 2025 Masjid Council Kerala. All rights reserved.
                </p>
                <p className="text-emerald-300 text-xs">
                  Powered by{' '}
                  <a
                    href="https://d4dx.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-100 font-medium hover:text-white underline"
                  >
                    D4DX
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
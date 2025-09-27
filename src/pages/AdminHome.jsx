import React from "react";
import { Link } from "react-router-dom";
import { Building, Heart, DollarSign, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

const AdminHome = () => {
  // Sample statistics data
  const stats = {
    affiliation: { total: 45, pending: 12, approved: 28, rejected: 5 },
    medical: { total: 23, pending: 8, approved: 12, rejected: 3 },
    mosque: { total: 31, pending: 15, approved: 14, rejected: 2 }
  };

  const StatCard = ({ title, pending, approved, rejected, icon: Icon, bgColor, route }) => (
    <Link to={route} className="group">
      <div className={`${bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Icon className="w-8 h-8 text-white" />
          </div>

        </div>
        
        <h3 className="text-white text-xl font-bold mb-3">{title}</h3>

        
        <div className="flex items-center text-white/80 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>വിശദാംശങ്ങൾ കാണുക</span>
        </div>
      </div>
    </Link>
  );

  const QuickStatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-white rounded-lg p-4 shadow-md border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-green-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-green-800">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-green-400" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6" style={{ fontFamily: "Anek Malayalam Variable" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            അഡ്മിൻ ഡാഷ്‌ബോർഡ്
          </h1>
          <p className="text-green-600">മസ്ജിദ് കൗൺസിൽ കേരള - അപേക്ഷകളുടെ സമഗ്ര നിയന്ത്രണം</p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-3 rounded-full"></div>
        </div>



        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <StatCard
            title="മസ്ജിദ് അഫിലിയേഷൻ"
            total={stats.affiliation.total}
            pending={stats.affiliation.pending}
            approved={stats.affiliation.approved}
            rejected={stats.affiliation.rejected}
            icon={Building}
            bgColor="bg-gradient-to-br from-blue-500 to-blue-700"
            route="/affliation-list-admin"
          />
          
          <StatCard
            title="മെഡിക്കൽ സഹായം"
            total={stats.medical.total}
            pending={stats.medical.pending}
            approved={stats.medical.approved}
            rejected={stats.medical.rejected}
            icon={Heart}
            bgColor="bg-gradient-to-br from-green-500 to-green-700"
            route="/medical-list-admin"
          />
          
          <StatCard
            title="മസ്ജിദ് ഫണ്ട്"
            total={stats.mosque.total}
            pending={stats.mosque.pending}
            approved={stats.mosque.approved}
            rejected={stats.mosque.rejected}
            icon={DollarSign}
            bgColor="bg-gradient-to-br from-purple-500 to-purple-700"
            route="/mosque-list-admin"
          />
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
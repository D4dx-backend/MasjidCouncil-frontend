import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Heart, Building2 } from "lucide-react";

const SuperAdminMobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/superadmin-dashboard", icon: Home, label: "Dashboard" },
    { path: "/superadmin-affiliation-list", icon: FileText, label: "Affiliation" },
    { path: "/superadmin-medical-list", icon: Heart, label: "Welfare" },
    { path: "/superadmin-mosque-fund-list", icon: Building2, label: "Masjid Fund" },
  ];

  const isActive = (path) => {
    const current = location.pathname;
    if (path === "/superadmin-dashboard") return current === path;
    if (path === "/superadmin-affiliation-list") return current.startsWith("/superadmin-affiliation");
    if (path === "/superadmin-medical-list") return current.startsWith("/superadmin-medical");
    if (path === "/superadmin-mosque-fund-list") return current.startsWith("/superadmin-mosque-fund");
    return current === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 lg:hidden print:hidden">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            aria-label={item.label}
            className={`flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors ${
              isActive(item.path) ? "text-green-700" : "text-gray-500 hover:text-green-600"
            }`}
          >
            <item.icon className="w-6 h-6" />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SuperAdminMobileBottomNav;



import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, Heart, Building2 } from "lucide-react";

const navItems = [
  { key: "dashboard", to: "/admin-home", Icon: Home, match: (p) => p === "/admin-home" },
  {
    key: "affiliation",
    to: "/affiliation-list-admin",
    Icon: FileText,
    match: (p) => p.startsWith("/affiliation-list"),
  },
  {
    key: "medical",
    to: "/medical-list-admin",
    Icon: Heart,
    match: (p) => p.startsWith("/medical-list"),
  },
  {
    key: "mosque",
    to: "/mosque-list-admin",
    Icon: Building2,
    match: (p) => p.startsWith("/mosque-list"),
  },
];

export default function AdminMobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm"
      aria-label="Admin bottom navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-md">
        <div className="grid grid-cols-4">
          {navItems.map(({ key, to, Icon, match }) => {
            const active = match(path);
            return (
              <button
                key={key}
                type="button"
                onClick={() => navigate(to)}
                aria-label={key}
                aria-current={active ? "page" : undefined}
                className={`h-14 flex items-center justify-center transition-colors ${
                  active ? "text-green-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    active ? "bg-green-50" : "bg-transparent"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}



import React, { useState } from 'react';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  Users,
  Database,
  Globe,
  Phone,
  TrendingUp,
  LineChart,
  Network,
  Shield
} from 'lucide-react';

// ... rest of the imports

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout, isAdmin = false }) => {
  // ... rest of the component code

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      <div className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 transition-all duration-300 ${
        isMenuCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-6 flex items-center justify-between">
          {!isMenuCollapsed && (
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <div className="mr-2 bg-blue-500 rounded-lg p-1.5">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  ClearPay<span className="text-blue-500 font-semibold italic">247</span>
                </h1>
              </div>
            </Link>
          )}
          <button
            onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
            className={`text-gray-400 hover:text-white transition-transform duration-300 ${
              isMenuCollapsed ? 'rotate-180' : ''
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Rest of the component remains the same */}
      </div>
    </div>
  );
};

export default DashboardLayout;
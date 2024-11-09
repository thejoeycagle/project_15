import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ConsumerPortal from './pages/consumer/ConsumerPortal';
import ChatWidget from './components/chat/ChatWidget';
import { AuthData } from './types/auth';

const App: React.FC = () => {
  const [authData, setAuthData] = useState<AuthData>(() => {
    const saved = localStorage.getItem('authData');
    return saved ? JSON.parse(saved) : { isLoggedIn: false };
  });

  const handleAuth = (email: string, password: string, rememberMe: boolean) => {
    // Check if it's the master admin
    const isAdmin = email === 'admin@clearpay247.com' && password === 'CP247@dm1n2024!';
    
    const newAuthData = { 
      isLoggedIn: true, 
      email, 
      rememberMe,
      isAdmin,
      userId: isAdmin ? 'admin' : `user-${Date.now()}`
    };
    setAuthData(newAuthData);

    if (rememberMe) {
      localStorage.setItem('authData', JSON.stringify(newAuthData));
    }
  };

  const handleLogout = () => {
    setAuthData({ isLoggedIn: false });
    localStorage.removeItem('authData');
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/creditor" element={<HomePage onAuth={handleAuth} />} />

        <Route path="/consumer/verify" element={<ConsumerPortal />} />
        <Route path="/consumer/demo" element={<ConsumerPortal isDemo={true} />} />
        <Route path="/consumer/*" element={<ConsumerPortal />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard/*" 
          element={
            authData.isLoggedIn ? (
              <DashboardLayout 
                onLogout={handleLogout} 
                isAdmin={authData.isAdmin}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Chat Widget - Available on all pages */}
      <ChatWidget />
    </>
  );
};

export default App;
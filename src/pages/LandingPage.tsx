import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Building2, Shield, Lock, CreditCard, FileCheck, LockKeyhole, Bot } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const formatPhoneNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      setPhone(formatPhoneNumber(cleaned));
      setError('');
    }
  };

  const handleConsumerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    navigate(`/consumer/verify?phone=${cleanPhone}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 animate-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.4),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-blue-900/50"></div>
      </div>

      {/* Animated diagonal line */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] animate-diagonal-slide">
          <div className="absolute w-1 h-[200%] bg-white/10 rotate-45 transform origin-top-left blur-sm"></div>
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-blue opacity-20"></div>

      {/* Content */}
      <div className="relative">
        {/* Trust-building Header */}
        <header className="w-full py-6 bg-blue-900/50 backdrop-blur-sm border-b border-blue-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="mr-2 bg-blue-500 rounded-lg p-1.5">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    ClearPay<span className="text-blue-500 font-semibold italic">247</span>
                  </h1>
                </div>
              </Link>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-green-600" />
                  Bank-Level Security
                </div>
                <div className="flex items-center">
                  <LockKeyhole className="h-4 w-4 mr-1 text-blue-600" />
                  256-bit Encryption
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to ClearPay247
            </h1>
            <p className="text-xl text-blue-100">
              Choose your portal below to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Consumer Portal */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Consumer Portal</h2>
                  <Phone className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-gray-600 mb-6">
                  Make a payment or review your account details
                </p>
                <form onSubmit={handleConsumerSearch} className="mt-auto">
                  <div className="mb-4">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        autoComplete="off"
                        data-lpignore="true"
                      />
                    </div>
                    {error && (
                      <p className="mt-1 text-sm text-red-500">{error}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Access Account
                  </button>
                </form>
              </div>
            </div>

            {/* Creditor Portal */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Creditor Portal</h2>
                  <Building2 className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-gray-600 mb-6">
                  Learn how AI-powered collectors can transform your debt recovery
                </p>
                <button
                  onClick={() => navigate('/creditor')}
                  className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Get More Info
                </button>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="mt-16">
            <div className="flex flex-col items-center">
              <p className="text-blue-100 mb-6 text-center">Secured & Certified By</p>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-24 flex items-center justify-center bg-blue-900/30 rounded-lg border border-blue-700/50">
                    <Shield className="h-8 w-8 text-blue-400" />
                    <span className="ml-1 font-bold text-white">PCI</span>
                  </div>
                  <span className="text-sm text-blue-100 mt-2">PCI DSS Compliant</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-24 flex items-center justify-center bg-blue-900/30 rounded-lg border border-blue-700/50">
                    <Lock className="h-8 w-8 text-blue-400" />
                    <span className="ml-1 font-bold text-white">256</span>
                  </div>
                  <span className="text-sm text-blue-100 mt-2">256-bit Encryption</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-24 flex items-center justify-center bg-blue-900/30 rounded-lg border border-blue-700/50">
                    <FileCheck className="h-8 w-8 text-blue-400" />
                    <span className="ml-1 font-bold text-white">SOC2</span>
                  </div>
                  <span className="text-sm text-blue-100 mt-2">SOC 2 Type II Certified</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
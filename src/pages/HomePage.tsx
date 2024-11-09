import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Bot, 
  Shield, 
  Upload, 
  Database, 
  Clock, 
  Zap,
  ArrowRight,
  FileUp,
  RefreshCcw,
  Workflow,
  Calendar,
  CheckCircle,
  Phone,
  MessageSquare
} from 'lucide-react';
import CollectorCard from '../components/CollectorCard';
import AuthModal from '../components/AuthModal';
import IndustriesSection from '../components/IndustriesSection';
import TestDriveSection from '../components/TestDriveSection';
import { collectors } from '../data/collectors';
import { Collector } from '../types/collector';

interface HomePageProps {
  onAuth: (email: string, password: string, rememberMe: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAuth }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);
  const navigate = useNavigate();

  const integrationFeatures = [
    {
      icon: FileUp,
      title: "Manual Upload",
      description: "Easily upload accounts via CSV or Excel files"
    },
    {
      icon: Database,
      title: "Batch Processing",
      description: "Process thousands of accounts simultaneously"
    },
    {
      icon: RefreshCcw,
      title: "CRM Integration",
      description: "Direct integration with your existing CRM"
    },
    {
      icon: Calendar,
      title: "Automated Triggers",
      description: "Start collections based on aging thresholds"
    }
  ];

  const benefitsList = [
    "24/7 Automated Collections",
    "FDCPA & TCPA Compliant",
    "No Commission Fees",
    "Instant Account Setup"
  ];

  const handleHire = (collector: Collector) => {
    setSelectedCollector(collector);
    setShowAuthModal(true);
  };

  const handleHireAll = () => {
    setSelectedCollector(null);
    setShowAuthModal(true);
  };

  const handleAuth = (email: string, password: string, rememberMe: boolean) => {
    onAuth(email, password, rememberMe);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
            <div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Sign Up / Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Automate Your Accounts<br />Receivable Recovery
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Turn Overdue Invoices into Collected Revenue - Automatically
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {integrationFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transform hover:scale-105 transition-transform"
                  >
                    <div className="bg-blue-500/10 rounded-lg p-3 w-12 h-12 mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => document.getElementById('collectors')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          </div>
        </div>

        {/* Benefits Bridge Section */}
        <div className="relative py-16 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {benefitsList.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center text-center"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300 font-medium">{benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        </div>

        {/* Collectors Section */}
        <div id="collectors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              FDCPA & TCPA Compliant A<span className="text-blue-500">i</span> Collectors
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Attorney-vetted, A<span className="text-blue-500">i</span>-powered virtual collectors work 24/7, maintain perfect compliance,
              and help maximize your recovery rates at a fraction of traditional costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectors.map((collector) => (
              <CollectorCard
                key={collector.id}
                collector={collector}
                onHire={handleHire}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleHireAll}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Hire All Collectors
            </button>
            <p className="text-gray-400 mt-2">
              Get the full team working for maximum efficiency
            </p>
          </div>
        </div>

        <TestDriveSection />
        <IndustriesSection />
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSubmit={handleAuth}
      />
    </div>
  );
};

export default HomePage;
import React, { useState } from 'react';
import { Bell, Users, Mail, Phone } from 'lucide-react';
import PaymentSettings from './PaymentSettings';
import ComplianceSettings from './ComplianceSettings';
import TestCallSettings from './TestCallSettings';
import TeamSettings from './TeamSettings';
import EmailTemplates from './EmailTemplates';

type SettingsSection = 'payment' | 'compliance' | 'notifications' | 'team' | 'email' | 'test-call';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('payment');

  const renderContent = () => {
    switch (activeSection) {
      case 'payment':
        return <PaymentSettings />;
      case 'compliance':
        return <ComplianceSettings />;
      case 'test-call':
        return <TestCallSettings />;
      case 'team':
        return <TeamSettings />;
      case 'email':
        return <EmailTemplates />;
      case 'notifications':
        return (
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
            <p className="text-gray-400">Notification settings configuration coming soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection('payment')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'payment'
                  ? 'text-white bg-blue-600'
                  : 'text-gray-400 hover:bg-gray-800/50'
              }`}
            >
              Payment Options
            </button>
            <button
              onClick={() => setActiveSection('compliance')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'compliance'
                  ? 'text-white bg-blue-600'
                  : 'text-gray-400 hover:bg-gray-800/50'
              }`}
            >
              Compliance
            </button>
            <button
              onClick={() => setActiveSection('test-call')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'test-call'
                  ? 'text-white bg-blue-600'
                  : 'text-gray-400 hover:bg-gray-800/50'
              }`}
            >
              <Phone className="h-5 w-5 mr-3" />
              Test Call
            </button>
            <button
              onClick={() => setActiveSection('notifications')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'notifications'
                  ? 'text-white bg-blue-600'
                  : 'text-gray-400 hover:bg-gray-800/50'
              }`}
            >
              <Bell className="h-5 w-5 mr-3" />
              Notifications
            </button>
            <button
              onClick={() => setActiveSection('team')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'team'
                  ? 'text-white bg-blue-600'
                  : 'text-gray-400 hover:bg-gray-800/50'
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Team
            </button>
            <button
              onClick={() => setActiveSection('email')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'email'
                  ? 'text-white bg-blue-600'
                  : 'text-gray-400 hover:bg-gray-800/50'
              }`}
            >
              <Mail className="h-5 w-5 mr-3" />
              Email Templates
            </button>
          </nav>
        </div>

        <div className="md:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
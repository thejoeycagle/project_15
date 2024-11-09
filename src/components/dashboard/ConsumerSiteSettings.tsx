import React, { useState } from 'react';
import { ExternalLink, Check, AlertCircle } from 'lucide-react';

interface ConsumerSiteConfig {
  enabled: boolean;
  siteUrl: string;
  minSettlementPercent: number;
  maxPaymentPlanMonths: number;
  companyName: string;
  logo?: string;
}

const ConsumerSiteSettings: React.FC = () => {
  const [config, setConfig] = useState<ConsumerSiteConfig>({
    enabled: true,
    siteUrl: '',
    minSettlementPercent: 40,
    maxPaymentPlanMonths: 12,
    companyName: ''
  });

  const getConsumerPortalUrl = () => {
    return `https://clearpay247.com/${config.siteUrl}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Consumer Payment Portal</h2>
          <p className="text-gray-400 mt-1">Configure your consumer-facing payment portal</p>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Payment Portal URL
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700">
                <span className="text-gray-400">clearpay247.com/</span>
                <input
                  type="text"
                  value={config.siteUrl}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    siteUrl: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                  }))}
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 ml-1"
                  placeholder="your-company-name"
                />
              </div>
              <button
                onClick={() => window.open(getConsumerPortalUrl(), '_blank')}
                className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-400">
              This is the URL your consumers will use to access their accounts and make payments
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Display Name
            </label>
            <input
              type="text"
              value={config.companyName}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                companyName: e.target.value
              }))}
              className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Company Name"
            />
            <p className="mt-1 text-sm text-gray-400">
              This name will be displayed to consumers on the payment portal
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Minimum Settlement Percentage
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={config.minSettlementPercent}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  minSettlementPercent: Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
                }))}
                className="w-32 bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
              />
              <span className="text-gray-400">%</span>
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Minimum settlement amount as a percentage of the total balance
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Maximum Payment Plan Length
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={config.maxPaymentPlanMonths}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  maxPaymentPlanMonths: Math.max(1, parseInt(e.target.value) || 1)
                }))}
                className="w-32 bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
              <span className="text-gray-400">months</span>
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Maximum number of months allowed for payment plans
            </p>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Preview Your Payment Portal</h3>
        <div className="aspect-video bg-gray-900/50 rounded-lg overflow-hidden">
          <iframe
            src={getConsumerPortalUrl()}
            className="w-full h-full border-0"
            title="Payment Portal Preview"
          />
        </div>
      </div>
    </div>
  );
};

export default ConsumerSiteSettings;
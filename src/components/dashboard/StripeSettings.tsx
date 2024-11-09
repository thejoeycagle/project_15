import React, { useState } from 'react';
import { Key, AlertCircle, CheckCircle2 } from 'lucide-react';

const StripeSettings: React.FC = () => {
  const [stripeKeys, setStripeKeys] = useState({
    publishableKey: '',
    secretKey: '',
  });
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');

    try {
      // TODO: Implement API call to save Stripe keys
      // This would be handled by your backend
      setStatus('success');
      setMessage('Stripe credentials updated successfully');
    } catch (error) {
      setStatus('error');
      setMessage('Failed to update Stripe credentials');
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Stripe Configuration</h3>
          <p className="text-gray-400 mt-1">Configure your Stripe account for payment processing</p>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
             alt="Stripe" 
             className="h-8 w-auto" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Publishable Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={stripeKeys.publishableKey}
              onChange={(e) => setStripeKeys(prev => ({
                ...prev,
                publishableKey: e.target.value
              }))}
              className="w-full bg-gray-900/50 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="pk_test_..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Secret Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showSecretKey ? "text" : "password"}
              value={stripeKeys.secretKey}
              onChange={(e) => setStripeKeys(prev => ({
                ...prev,
                secretKey: e.target.value
              }))}
              className="w-full bg-gray-900/50 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="sk_test_..."
            />
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showSecretKey}
                onChange={() => setShowSecretKey(!showSecretKey)}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-sm text-gray-400">Show secret key</span>
            </label>
          </div>
        </div>

        {status !== 'idle' && (
          <div className={`flex items-center p-4 rounded-lg ${
            status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {status === 'success' ? (
              <CheckCircle2 className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {message}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="test_mode"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-2">
              <label htmlFor="test_mode" className="text-sm text-gray-300">
                Test Mode
              </label>
              <p className="text-xs text-gray-400">
                Use test keys for development and testing
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-400">Important Note</h4>
            <p className="text-sm text-gray-400 mt-1">
              Your Stripe secret key should never be exposed to your users. Make sure to keep it secure and only use it in your backend environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeSettings;
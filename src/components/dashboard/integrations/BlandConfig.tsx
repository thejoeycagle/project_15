import React, { useState, useEffect } from 'react';
import { Phone, Bot, X, RefreshCw, Save, AlertCircle } from 'lucide-react';
import TestCallModal from './TestCallModal';

interface BlandConfigProps {
  credentials: {
    apiKey: string;
    pathwayId: string;
    fromNumber?: string;
    model?: string;
    voice?: string;
    maxDuration?: string;
    record?: string;
  };
  onUpdateCredentials: (credentials: any) => void;
  onTestConnection: () => Promise<void>;
  onSaveSettings: () => Promise<void>;
  status: 'idle' | 'pending' | 'success' | 'error';
  message: string;
  onLogApiCall: (log: string) => void;
}

const BlandConfig: React.FC<BlandConfigProps> = ({
  credentials,
  onUpdateCredentials,
  onTestConnection,
  onSaveSettings,
  status,
  message,
  onLogApiCall
}) => {
  const [showTestCallModal, setShowTestCallModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [testCallError, setTestCallError] = useState('');

  useEffect(() => {
    if (credentials.apiKey) {
      fetchAvailableNumbers();
    }
  }, [credentials.apiKey]);

  const fetchAvailableNumbers = async () => {
    try {
      const timestamp = new Date().toLocaleTimeString();
      onLogApiCall(`${timestamp} - GET /v1/inbound - Fetching available numbers`);

      const response = await fetch('https://api.bland.ai/v1/inbound', {
        headers: {
          'Authorization': credentials.apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch numbers');
      }

      const data = await response.json();
      const numbers = data.inbound_numbers?.map((n: any) => n.phone_number) || [];
      setAvailableNumbers(numbers);

      onLogApiCall(`${timestamp} - GET /v1/inbound - Successfully fetched ${numbers.length} numbers`);
    } catch (error) {
      console.error('Failed to fetch numbers:', error);
      onLogApiCall(`${new Date().toLocaleTimeString()} - GET /v1/inbound - Error: Failed to fetch numbers`);
    }
  };

  const validateTestCallParams = () => {
    if (!credentials.apiKey) {
      throw new Error('API Key is required');
    }
    if (!credentials.pathwayId) {
      throw new Error('Pathway ID is required');
    }
  };

  const handleTestCall = async (phoneNumber: string) => {
    setIsSubmitting(true);
    setTestCallError('');

    try {
      validateTestCallParams();

      const timestamp = new Date().toLocaleTimeString();
      onLogApiCall(`${timestamp} - POST /v1/calls - Initiating call to +1${phoneNumber}`);

      const response = await fetch('https://api.bland.ai/v1/calls', {
        method: 'POST',
        headers: {
          'Authorization': credentials.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: `+1${phoneNumber}`,
          from: credentials.fromNumber || undefined,
          model: credentials.model || 'enhanced',
          voice: credentials.voice || 'nat',
          max_duration: parseInt(credentials.maxDuration || '300'),
          record: credentials.record === 'true',
          pathway_id: credentials.pathwayId,
          wait_for_greeting: true,
          amd: true
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to initiate call');
      }

      if (!data.call_id) {
        throw new Error('No call ID received from API');
      }

      onLogApiCall(`${timestamp} - POST /v1/calls - Call initiated successfully (ID: ${data.call_id})`);
      onLogApiCall(`${timestamp} - Call details: Using ${credentials.model} model with ${credentials.voice} voice`);
      setShowTestCallModal(false);
    } catch (error) {
      const timestamp = new Date().toLocaleTimeString();
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setTestCallError(errorMessage);
      console.error('Test call failed:', error);
      onLogApiCall(`${timestamp} - POST /v1/calls - Failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveSettings();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            API Key <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            value={credentials.apiKey}
            onChange={(e) => onUpdateCredentials({ ...credentials, apiKey: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="sk-..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Pathway ID <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={credentials.pathwayId}
            onChange={(e) => onUpdateCredentials({ ...credentials, pathwayId: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Pathway ID"
            required
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
          <button
            onClick={onTestConnection}
            disabled={status === 'pending'}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${status === 'pending' ? 'animate-spin' : ''}`} />
            Test Connection
          </button>
          {message && (
            <span className={status === 'success' ? 'text-green-400' : 'text-red-400'}>
              {message}
            </span>
          )}
        </div>

        {testCallError && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{testCallError}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            From Number
          </label>
          <select
            value={credentials.fromNumber}
            onChange={(e) => onUpdateCredentials({ ...credentials, fromNumber: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select From Number</option>
            {availableNumbers.map((number) => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Model
          </label>
          <select
            value={credentials.model}
            onChange={(e) => onUpdateCredentials({ ...credentials, model: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="enhanced">Enhanced</option>
            <option value="base">Base</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Voice
          </label>
          <select
            value={credentials.voice}
            onChange={(e) => onUpdateCredentials({ ...credentials, voice: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nat">Nat</option>
            <option value="josh">Josh</option>
            <option value="rachel">Rachel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Max Duration (seconds)
          </label>
          <input
            type="number"
            value={credentials.maxDuration}
            onChange={(e) => onUpdateCredentials({ ...credentials, maxDuration: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Record Calls
          </label>
          <select
            value={credentials.record}
            onChange={(e) => onUpdateCredentials({ ...credentials, record: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowTestCallModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Test Call
        </button>
      </div>

      <TestCallModal
        isOpen={showTestCallModal}
        onClose={() => setShowTestCallModal(false)}
        onSubmit={handleTestCall}
        isSubmitting={isSubmitting}
        error={testCallError}
      />
    </div>
  );
};

export default BlandConfig;
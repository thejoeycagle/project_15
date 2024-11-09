import React, { useState, useEffect } from 'react';
import { Bot, Mail, MessageSquare, Phone, Volume2 } from 'lucide-react';
import BlandConfig from './integrations/BlandConfig';
import { integrationService } from '../../lib/database';

const IntegrationsPage: React.FC = () => {
  const [activeIntegration, setActiveIntegration] = useState<string>('bland');
  const [credentials, setCredentials] = useState<Record<string, Record<string, string>>>({
    bland: {
      apiKey: '',
      pathwayId: '',
      fromNumber: '',
      model: 'enhanced',
      voice: 'nat',
      maxDuration: '300',
      record: 'false'
    },
    synthflow: {
      apiKey: '',
      workspaceId: '',
      region: ''
    },
    elevenlabs: {
      apiKey: '',
      modelId: ''
    },
    sendgrid: {
      apiKey: '',
      fromEmail: ''
    },
    openai: {
      apiKey: '',
      model: 'gpt-4'
    }
  });
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [apiLogs, setApiLogs] = useState<string[]>([]);

  useEffect(() => {
    loadBlandSettings();
  }, []);

  const loadBlandSettings = async () => {
    const settings = await integrationService.getBlandSettings();
    if (settings) {
      setCredentials(prev => ({
        ...prev,
        bland: settings
      }));
    }
  };

  const handleTestConnection = async () => {
    setStatus('pending');
    setMessage('');

    try {
      const response = await fetch('https://api.bland.ai/v1/calls', {
        headers: {
          'Authorization': credentials.bland.apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to connect to Bland AI');
      }

      setStatus('success');
      setMessage('Connection successful');
      logApiCall('Test connection successful');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Connection failed');
      logApiCall('Test connection failed');
    }
  };

  const handleSaveSettings = async () => {
    setStatus('pending');
    setMessage('');

    try {
      const success = await integrationService.saveBlandSettings(credentials.bland);
      if (success) {
        setStatus('success');
        setMessage('Settings saved successfully');
        logApiCall('Settings saved successfully');
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to save settings');
      logApiCall('Failed to save settings');
    }
  };

  const logApiCall = (message: string) => {
    setApiLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const renderActiveConfig = () => {
    switch (activeIntegration) {
      case 'bland':
        return (
          <BlandConfig
            credentials={credentials.bland}
            onUpdateCredentials={(newCreds) => {
              setCredentials(prev => ({
                ...prev,
                bland: newCreds
              }));
            }}
            onTestConnection={handleTestConnection}
            onSaveSettings={handleSaveSettings}
            status={status}
            message={message}
            onLogApiCall={logApiCall}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Integrations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <button
            onClick={() => setActiveIntegration('bland')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeIntegration === 'bland'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800/50'
            }`}
          >
            <Phone className="h-5 w-5 mr-3" />
            Bland AI
          </button>
          <button
            onClick={() => setActiveIntegration('synthflow')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeIntegration === 'synthflow'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800/50'
            }`}
          >
            <Bot className="h-5 w-5 mr-3" />
            SynthFlow
          </button>
          <button
            onClick={() => setActiveIntegration('elevenlabs')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeIntegration === 'elevenlabs'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800/50'
            }`}
          >
            <Volume2 className="h-5 w-5 mr-3" />
            ElevenLabs
          </button>
          <button
            onClick={() => setActiveIntegration('sendgrid')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeIntegration === 'sendgrid'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800/50'
            }`}
          >
            <Mail className="h-5 w-5 mr-3" />
            SendGrid
          </button>
          <button
            onClick={() => setActiveIntegration('openai')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeIntegration === 'openai'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800/50'
            }`}
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            OpenAI
          </button>
        </div>

        <div className="md:col-span-3">
          <div className="bg-gray-800/50 rounded-lg p-6">
            {renderActiveConfig()}

            {/* API Logs */}
            {apiLogs.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">API Logs</h3>
                <div className="bg-gray-900/50 rounded-lg p-4 max-h-60 overflow-y-auto">
                  {apiLogs.map((log, index) => (
                    <div key={index} className="text-sm text-gray-400 mb-2">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
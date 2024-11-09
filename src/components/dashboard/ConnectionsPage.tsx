import React, { useState } from 'react';
import { Phone, Key, AlertCircle, Check, Globe, MessageSquare, Mail, Volume2, Mic } from 'lucide-react';

interface ApiConnection {
  name: string;
  icon: React.ElementType;
  description: string;
  fields: {
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
  }[];
}

const ConnectionsPage: React.FC = () => {
  const [activeConnection, setActiveConnection] = useState<string>('twilio');
  const [credentials, setCredentials] = useState<Record<string, Record<string, string>>>({
    twilio: {
      accountSid: '',
      authToken: '',
      phoneNumber: ''
    }
  });
  const [showSecret, setShowSecret] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const connections: Record<string, ApiConnection> = {
    twilio: {
      name: 'Twilio',
      icon: Phone,
      description: 'Voice and SMS communication platform for automated calls and messages.',
      fields: [
        { name: 'accountSid', type: 'text', placeholder: 'Account SID', required: true },
        { name: 'authToken', type: 'password', placeholder: 'Auth Token', required: true },
        { name: 'phoneNumber', type: 'tel', placeholder: 'Twilio Phone Number', required: true }
      ]
    },
    synthflow: {
      name: 'SynthFlow',
      icon: Mic,
      description: 'Advanced voice synthesis and audio processing for natural conversations.',
      fields: [
        { name: 'apiKey', type: 'password', placeholder: 'API Key', required: true },
        { name: 'organizationId', type: 'text', placeholder: 'Organization ID', required: true },
        { name: 'region', type: 'text', placeholder: 'Region (e.g., us-east-1)', required: false },
        { name: 'modelId', type: 'text', placeholder: 'Default Model ID', required: false }
      ]
    },
    elevenlabs: {
      name: 'ElevenLabs',
      icon: Volume2,
      description: 'Advanced AI voice synthesis for natural-sounding speech.',
      fields: [
        { name: 'apiKey', type: 'password', placeholder: 'API Key', required: true },
        { name: 'modelId', type: 'text', placeholder: 'Model ID', required: false }
      ]
    },
    sendgrid: {
      name: 'SendGrid',
      icon: Mail,
      description: 'Email delivery service for transactional and marketing emails.',
      fields: [
        { name: 'apiKey', type: 'password', placeholder: 'API Key', required: true },
        { name: 'fromEmail', type: 'email', placeholder: 'From Email', required: true }
      ]
    },
    openai: {
      name: 'OpenAI',
      icon: MessageSquare,
      description: 'AI language model for natural conversations and text processing.',
      fields: [
        { name: 'apiKey', type: 'password', placeholder: 'API Key', required: true },
        { name: 'model', type: 'text', placeholder: 'Model Name (e.g., gpt-4)', required: true }
      ]
    }
  };

  const handleSave = async () => {
    setStatus('idle');
    setMessage('');

    try {
      // Simulate API call to save credentials
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage(`${connections[activeConnection].name} credentials updated successfully`);
    } catch (error) {
      setStatus('error');
      setMessage(`Failed to update ${connections[activeConnection].name} credentials`);
    }
  };

  const toggleSecret = (field: string) => {
    setShowSecret(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const IconComponent = connections[activeConnection].icon;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">API Connections</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-2">
          {Object.entries(connections).map(([key, connection]) => {
            const ConnectionIcon = connection.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveConnection(key)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeConnection === key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800/50'
                }`}
              >
                <ConnectionIcon className="h-5 w-5 mr-3" />
                {connection.name}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {connections[activeConnection].name} Configuration
                </h3>
                <p className="text-gray-400 mt-1">
                  {connections[activeConnection].description}
                </p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
                <IconComponent className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
              {connections[activeConnection].fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {field.placeholder}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showSecret[field.name] ? 'text' : field.type}
                      value={credentials[activeConnection]?.[field.name] || ''}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        [activeConnection]: {
                          ...prev[activeConnection],
                          [field.name]: e.target.value
                        }
                      }))}
                      className="w-full bg-gray-900/50 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                    {field.type === 'password' && (
                      <button
                        type="button"
                        onClick={() => toggleSecret(field.name)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showSecret[field.name] ? 'Hide' : 'Show'}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {status !== 'idle' && (
                <div className={`flex items-center p-4 rounded-lg ${
                  status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {status === 'success' ? (
                    <Check className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  {message}
                </div>
              )}

              <div className="flex justify-end">
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
                  <h4 className="text-sm font-medium text-blue-400">Security Note</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Your API credentials are encrypted before being stored. We follow industry best practices
                    to ensure your sensitive data remains secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
import React, { useState } from 'react';
import { Bot, Phone, AlertCircle, Check } from 'lucide-react';
import { synthFlow } from '../../services/synthflow';
import { CallRequest } from '../../types/synthflow';

const TestCallSettings: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
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
    }
  };

  const handleTestCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      setIsSubmitting(false);
      return;
    }

    try {
      const callRequest: CallRequest = {
        phoneNumber: `+1${cleanedPhone}`,
        recordCall: true,
        transcribe: true,
        maxDuration: 300, // 5 minutes
        compliance: {
          maxAttempts: 1,
          retryDelay: 60,
        },
        metadata: {
          type: 'test-call',
          initiatedBy: 'admin',
        }
      };

      const response = await synthFlow.initiateCall(callRequest);
      
      if (response.success) {
        setSuccess('Test call initiated! You will receive a call within 2 minutes.');
        setPhone('');
      } else {
        throw new Error(response.error?.message || 'Failed to initiate call');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to make test call');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Test Your A<span className="text-blue-500">i</span> Collector</h3>
          <p className="text-gray-400 mt-1">
            Verify your collector's behavior and compliance settings
          </p>
        </div>
        <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
          <Bot className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <form onSubmit={handleTestCall} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Enter phone number for test call
          </label>
          <div className="relative w-64">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full bg-gray-900/50 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(555) 555-5555"
              required
              autoComplete="off"
              data-lpignore="true"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center text-green-400 text-sm">
            <Check className="h-4 w-4 mr-2" />
            {success}
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Test calls help verify your compliance rules and custom instructions
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Initiating Call...' : 'Start Test Call'}
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-400">What to Expect</h4>
            <p className="text-sm text-gray-400 mt-1">
              You'll receive a call within 2 minutes from your A<span className="text-blue-500">i</span> collector. 
              The call will demonstrate your current compliance settings and custom instructions in action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCallSettings;
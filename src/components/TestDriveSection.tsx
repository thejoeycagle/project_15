import React, { useState, useEffect } from 'react';
import { Phone, Shield, AlertCircle, Check } from 'lucide-react';
import { integrationService } from '../lib/database';
import { BlandSettings } from '../hooks/useBlandSettings';

const TEST_DRIVE_FROM_NUMBER = '+17869525841';

const TestDriveSection: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [blandSettings, setBlandSettings] = useState<BlandSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlandSettings();
  }, []);

  const fetchBlandSettings = async () => {
    try {
      setIsLoading(true);
      const settings = await integrationService.getBlandSettings();
      setBlandSettings(settings);
      if (!settings?.apiKey) {
        setError('System configuration error. Please try again later.');
      }
    } catch (err) {
      console.error('Failed to fetch Bland settings:', err);
      setError('System configuration error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

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

    if (!blandSettings?.apiKey || !blandSettings?.pathwayId) {
      setError('System configuration error. Please try again later.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.bland.ai/v1/calls', {
        method: 'POST',
        headers: {
          'Authorization': blandSettings.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: `+1${cleanedPhone}`,
          from: TEST_DRIVE_FROM_NUMBER,
          model: blandSettings.model || 'enhanced',
          voice: blandSettings.voice || 'nat',
          max_duration: blandSettings.maxDuration || 300,
          record: blandSettings.record || false,
          pathway_id: blandSettings.pathwayId,
          language: 'en',
          local_dialing: false,
          answered_by_enabled: false,
          wait_for_greeting: true,
          amd: true,
          interruption_threshold: 100
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to initiate call');
      }

      setSuccess('Ai Agent deployed! You will receive a call within 2 minutes.');
      setPhone('');
    } catch (err) {
      console.error('Test call failed:', err);
      setError('Failed to deploy Ai Agent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = () => {
    const cleanedPhone = phone.replace(/\D/g, '');
    return isSubmitting || isLoading || cleanedPhone.length !== 10 || !blandSettings?.apiKey;
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900/20">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Test Drive Our A<span className="text-blue-500">i</span> Collectors
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience our virtual collectors firsthand with a free test call.
            No signup required - limited to 5 calls per phone number.
          </p>
        </div>

        <div className="max-w-md mx-auto relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-lg opacity-75"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
                <Phone className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <form onSubmit={handleTestCall} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter your phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 555-5555"
                  required
                  autoComplete="off"
                  data-lpignore="true"
                />
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

              <button
                type="submit"
                disabled={isButtonDisabled()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? 'Deploying Ai Agent...' : 'Deploy Ai Agent'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                By requesting a test call, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">0.012s</div>
            <p className="text-gray-400">Average response time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <p className="text-gray-400">Compliance rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">5 calls</div>
            <p className="text-gray-400">Free trial limit</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestDriveSection;
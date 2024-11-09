import React, { useState } from 'react';
import { X, Phone } from 'lucide-react';

interface TestCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
  isSubmitting: boolean;
}

const TestCallModal: React.FC<TestCallModalProps> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length === 10) {
      onSubmit(cleanedPhone);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center justify-center mb-6">
          <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
            <Phone className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white text-center mb-2">
          Test Call
        </h3>
        <p className="text-gray-400 text-center mb-6">
          Enter a phone number to test your Bland AI configuration
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(555) 555-5555"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Initiating Call...</span>
              </>
            ) : (
              <>
                <Phone className="h-5 w-5 mr-2" />
                Start Test Call
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-400 text-center">
          Test calls help verify your configuration is working correctly
        </p>
      </div>
    </div>
  );
};

export default TestCallModal;
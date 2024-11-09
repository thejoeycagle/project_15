import React, { useState } from 'react';
import { Plus, Phone, AlertCircle, PhoneCall } from 'lucide-react';
import { Account } from './types';
import { synthFlow } from '../../../services/synthflow';

interface PhoneNumbersProps {
  account: Account;
  onUpdate: (account: Account) => void;
}

export const PhoneNumbers: React.FC<PhoneNumbersProps> = ({ account, onUpdate }) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [callingNumber, setCallingNumber] = useState<string | null>(null);

  const formatPhoneNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 10) {
      setNewPhoneNumber(formatPhoneNumber(cleaned));
      setError('');
    }
  };

  const handleAddPhoneNumber = () => {
    const cleanNumber = newPhoneNumber.replace(/\D/g, '');
    
    if (cleanNumber.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    setError('');
    onUpdate({
      ...account,
      phoneNumbers: [
        ...account.phoneNumbers,
        { id: Date.now().toString(), number: cleanNumber, status: 'unknown' }
      ]
    });
    setNewPhoneNumber('');
  };

  const handlePhoneStatusChange = (id: string, status: 'good' | 'bad' | 'unknown') => {
    onUpdate({
      ...account,
      phoneNumbers: account.phoneNumbers.map(phone =>
        phone.id === id ? { ...phone, status } : phone
      )
    });
  };

  const handleCallNumber = async (phoneNumber: string) => {
    if (callingNumber) return; // Prevent multiple simultaneous calls
    
    setCallingNumber(phoneNumber);
    setError('');
    
    try {
      const callRequest = {
        phoneNumber: `+1${phoneNumber.replace(/\D/g, '')}`,
        metadata: {
          accountId: account.accountNumber,
          debtorName: `${account.firstName} ${account.lastName}`,
          type: 'outbound'
        }
      };

      const response = await synthFlow.initiateCall(callRequest);
      
      if (response.success) {
        // Add note about the call
        const now = new Date().toLocaleString();
        onUpdate({
          ...account,
          notes: [
            {
              id: Date.now().toString(),
              text: `Outbound call initiated to ${formatPhoneNumber(phoneNumber)}`,
              createdBy: 'System',
              createdAt: now
            },
            ...account.notes
          ]
        });
      } else {
        throw new Error(response.error?.message || 'Failed to initiate call');
      }
    } catch (err) {
      console.error('Call error:', err);
      setError('Failed to initiate call. Please check SynthFlow configuration.');
    } finally {
      // Reset calling state after a short delay to show the animation
      setTimeout(() => setCallingNumber(null), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'bad': return 'bg-red-500';
      case 'unknown': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Phone Numbers</h3>
      
      <div className="flex gap-4 mb-4">
        <div className="w-64">
          <input
            type="tel"
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="(555) 555-5555"
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
          />
          {error && (
            <div className="flex items-center mt-1 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <button
          onClick={handleAddPhoneNumber}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center h-10"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Number
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {account.phoneNumbers.map((phone) => (
          <div key={phone.id} className="bg-gray-900/50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <button
                onClick={() => handleCallNumber(phone.number)}
                disabled={callingNumber === phone.number}
                className="text-white hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <span>{formatPhoneNumber(phone.number)}</span>
                <PhoneCall className={`h-4 w-4 ${
                  callingNumber === phone.number ? 'animate-pulse text-green-500' : ''
                }`} />
              </button>
            </div>
            <select
              value={phone.status}
              onChange={(e) => handlePhoneStatusChange(phone.id, e.target.value as 'good' | 'bad' | 'unknown')}
              className={`${getStatusColor(phone.status)} text-white rounded px-3 py-1`}
            >
              <option value="good">Good</option>
              <option value="bad">Bad</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
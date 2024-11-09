import React from 'react';
import { Account } from './types';

interface AccountDetailsProps {
  account: Account;
  onUpdate: (account: Account) => void;
}

const accountStatusOptions = [
  '[Open] - Online Login No Pay',
  'Paid',
  'Settled',
  'Uncollectible',
  'In Progress',
  'Legal',
  'Disputed'
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const AccountDetails: React.FC<AccountDetailsProps> = ({ account, onUpdate }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Account Details</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Account #</label>
          <input
            type="text"
            value={account.accountNumber}
            readOnly
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Client Account #</label>
          <input
            type="text"
            value={account.clientAccountNumber}
            readOnly
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Original Creditor</label>
        <input
          type="text"
          value={account.originalCreditor}
          readOnly
          className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Account Status</label>
          <select
            value={account.accountStatus}
            onChange={(e) => onUpdate({ ...account, accountStatus: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accountStatusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Account Balance</label>
          <input
            type="text"
            value={formatCurrency(account.accountBalance)}
            readOnly
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
        </div>
      </div>
    </div>
  );
};
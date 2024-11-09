import React from 'react';
import { Account } from './types';

interface PersonalDetailsProps {
  account: Account;
  onUpdate: (account: Account) => void;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ account, onUpdate }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Personal Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            value={account.firstName}
            onChange={(e) => onUpdate({ ...account, firstName: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            value={account.lastName}
            onChange={(e) => onUpdate({ ...account, lastName: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
        <input
          type="text"
          value={account.address}
          onChange={(e) => onUpdate({ ...account, address: e.target.value })}
          className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
          data-lpignore="true"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
          <input
            type="text"
            value={account.city}
            onChange={(e) => onUpdate({ ...account, city: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
          <input
            type="text"
            value={account.state}
            onChange={(e) => onUpdate({ ...account, state: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Zip Code</label>
          <input
            type="text"
            value={account.zip_code}
            onChange={(e) => onUpdate({ ...account, zip_code: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">SSN</label>
          <input
            type="text"
            value={account.ssn}
            onChange={(e) => onUpdate({ ...account, ssn: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
          <input
            type="date"
            value={account.date_of_birth}
            onChange={(e) => onUpdate({ ...account, date_of_birth: e.target.value })}
            className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input
          type="email"
          value={account.email}
          onChange={(e) => onUpdate({ ...account, email: e.target.value })}
          className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
          data-lpignore="true"
        />
      </div>
    </div>
  );
};
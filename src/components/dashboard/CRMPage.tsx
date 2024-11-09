import React, { useState } from 'react';
import { Search, Plus, Phone, X } from 'lucide-react';
import { PersonalDetails } from './crm/PersonalDetails';
import { AccountDetails } from './crm/AccountDetails';
import { PhoneNumbers } from './crm/PhoneNumbers';
import { Notes } from './crm/Notes';
import { Account, PhoneNumber, Note } from './crm/types';

const CRMPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account>({
    id: '1',
    firstName: 'Joey',
    lastName: 'Cagle',
    accountNumber: 'aab30461-4157-c3fg-bbd',
    clientAccountNumber: 'Bloom #4',
    originalCreditor: 'ACE CASH EXPRESS INC',
    dateOpened: '12/31/2009',
    lastPaymentDate: '',
    lastPaymentAmount: 0,
    accountStatus: '[Open] - Online Login No Pay',
    accountBalance: 1630.36,
    ssn: '1371234',
    dob: '01-01-2000',
    email: '',
    address: '1234 TEST',
    city: 'DASAS',
    state: 'Texas',
    zipCode: '77777',
    phoneNumbers: [
      { id: '1', number: '8646014834', status: 'unknown' }
    ],
    notes: [
      {
        id: '1',
        text: 'Phone (186) 630-7518 was added with the status Valid',
        createdBy: 'SWK',
        createdAt: '11/01/2024 07:32:10 AM'
      }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by phone, SSN, or account number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            data-lpignore="true"
            spellCheck="false"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
      </div>

      {/* Account Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div key="personal-details">
          <PersonalDetails account={selectedAccount} onUpdate={setSelectedAccount} />
        </div>
        <div key="account-details">
          <AccountDetails account={selectedAccount} onUpdate={setSelectedAccount} />
        </div>
      </div>

      {/* Phone Numbers */}
      <div key="phone-numbers">
        <PhoneNumbers account={selectedAccount} onUpdate={setSelectedAccount} />
      </div>

      {/* Notes */}
      <div key="notes">
        <Notes account={selectedAccount} onUpdate={setSelectedAccount} />
      </div>
    </div>
  );
};

export default CRMPage;
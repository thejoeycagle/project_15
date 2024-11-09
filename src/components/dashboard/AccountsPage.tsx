import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  FileText,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  MoreVertical,
} from 'lucide-react';
import { Card, Title, Text } from '@tremor/react';
import { DebtAccount } from '../../types/account';

// Sample data for development
const sampleBatches = [
  {
    id: 'batch-1',
    uploadDate: '2024-03-15T10:30:00Z',
    fileName: 'march_accounts.csv',
    accountCount: 156,
    totalValue: 234500,
    accounts: Array(156).fill(null).map((_, i) => ({
      id: `acc-${i}`,
      debtorName: `John Doe ${i}`,
      accountNumber: `ACC-${1000 + i}`,
      debtorPhone: '(555) 555-5555',
      debtorEmail: 'john@example.com',
      originalAmount: 1500,
      currentBalance: 1500,
      status: ['new', 'in_progress', 'paid'][Math.floor(Math.random() * 3)],
      dateOfService: '2024-01-15',
      creditorName: 'ABC Hospital',
      createdAt: '2024-03-15T10:30:00Z',
      updatedAt: '2024-03-15T10:30:00Z',
    })),
  },
  // Add more batches as needed
];

const AccountsPage: React.FC = () => {
  const [expandedBatches, setExpandedBatches] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<DebtAccount | null>(null);

  const toggleBatch = (batchId: string) => {
    setExpandedBatches(prev =>
      prev.includes(batchId)
        ? prev.filter(id => id !== batchId)
        : [...prev, batchId]
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-500/10 text-blue-500',
      in_progress: 'bg-yellow-500/10 text-yellow-500',
      paid: 'bg-green-500/10 text-green-500',
      settled: 'bg-purple-500/10 text-purple-500',
      uncollectible: 'bg-red-500/10 text-red-500',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/10 text-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Accounts</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-4 pr-10 py-2 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="paid">Paid</option>
              <option value="settled">Settled</option>
              <option value="uncollectible">Uncollectible</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sampleBatches.map((batch) => (
          <Card key={batch.id} className="bg-gray-800/50 border-gray-700">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleBatch(batch.id)}
            >
              <div className="flex items-center space-x-4">
                {expandedBatches.includes(batch.id) ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <Title className="text-white">{batch.fileName}</Title>
                  <Text className="text-gray-400">
                    Uploaded {format(new Date(batch.uploadDate), 'MMM d, yyyy h:mm a')}
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <Text className="text-gray-400">Accounts</Text>
                  <Title className="text-white">{batch.accountCount}</Title>
                </div>
                <div className="text-right">
                  <Text className="text-gray-400">Total Value</Text>
                  <Title className="text-white">
                    ${batch.totalValue.toLocaleString()}
                  </Title>
                </div>
              </div>
            </div>

            {expandedBatches.includes(batch.id) && (
              <div className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="pb-3 text-gray-400 font-medium">Account</th>
                        <th className="pb-3 text-gray-400 font-medium">Contact</th>
                        <th className="pb-3 text-gray-400 font-medium">Balance</th>
                        <th className="pb-3 text-gray-400 font-medium">Status</th>
                        <th className="pb-3 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {batch.accounts.slice(0, 10).map((account) => (
                        <tr
                          key={account.id}
                          className="hover:bg-gray-700/30 cursor-pointer"
                          onClick={() => setSelectedAccount(account)}
                        >
                          <td className="py-3">
                            <div>
                              <div className="text-white font-medium">
                                {account.debtorName}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {account.accountNumber}
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center space-x-2 text-gray-400">
                              <Phone className="h-4 w-4" />
                              <span>{account.debtorPhone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                              <Mail className="h-4 w-4" />
                              <span>{account.debtorEmail}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-green-500" />
                              <span className="text-white">
                                ${account.currentBalance.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>{account.dateOfService}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                account.status
                              )}`}
                            >
                              {account.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3">
                            <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                              <MoreVertical className="h-4 w-4 text-gray-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {batch.accounts.length > 10 && (
                  <div className="mt-4 text-center">
                    <button className="text-blue-400 hover:text-blue-300">
                      View all {batch.accounts.length} accounts
                    </button>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Account Detail Modal would go here */}
    </div>
  );
};

export default AccountsPage;
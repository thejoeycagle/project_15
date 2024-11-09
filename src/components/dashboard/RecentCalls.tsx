import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Search,
  Filter,
  Phone,
  PhoneOff,
  Voicemail,
  Play,
  Download,
  Info,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Card } from '@tremor/react';
import { CallRecord } from '../../types/account';

// Sample data for development
const sampleCalls: CallRecord[] = Array(50).fill(null).map((_, i) => ({
  id: `call-${i}`,
  accountId: `acc-${1000 + i}`,
  collectorId: ['1', '2', '3'][Math.floor(Math.random() * 3)],
  startTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  duration: Math.floor(Math.random() * 300) + 60, // 1-6 minutes
  status: ['completed', 'no_answer', 'voicemail', 'failed'][Math.floor(Math.random() * 4)],
  recording: Math.random() > 0.3 ? 'recording-url' : undefined,
  summary: 'Customer acknowledged the debt and agreed to make a payment by the end of the month.',
  nextActionDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
  nextAction: 'Follow up on payment commitment',
}));

const RecentCalls: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCollector, setSelectedCollector] = useState<string>('all');
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'no_answer':
        return <PhoneOff className="h-5 w-5 text-red-500" />;
      case 'voicemail':
        return <Voicemail className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const filteredCalls = sampleCalls.filter(call => {
    const matchesSearch = searchTerm === '' || 
      call.accountId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || call.status === selectedStatus;
    const matchesCollector = selectedCollector === 'all' || call.collectorId === selectedCollector;
    return matchesSearch && matchesStatus && matchesCollector;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Recent Calls</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search calls..."
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
              <option value="completed">Completed</option>
              <option value="no_answer">No Answer</option>
              <option value="voicemail">Voicemail</option>
              <option value="failed">Failed</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={selectedCollector}
              onChange={(e) => setSelectedCollector(e.target.value)}
              className="pl-4 pr-10 py-2 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">All Collectors</option>
              <option value="1">Alex Morgan</option>
              <option value="2">Sarah Chen</option>
              <option value="3">James Wilson</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-gray-400 font-medium">Status</th>
                <th className="pb-3 text-gray-400 font-medium">Account</th>
                <th className="pb-3 text-gray-400 font-medium">Collector</th>
                <th className="pb-3 text-gray-400 font-medium">Time</th>
                <th className="pb-3 text-gray-400 font-medium">Duration</th>
                <th className="pb-3 text-gray-400 font-medium">Next Action</th>
                <th className="pb-3 text-gray-400 font-medium">Recording</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCalls.map((call) => (
                <tr
                  key={call.id}
                  className="hover:bg-gray-700/30 cursor-pointer"
                  onClick={() => setSelectedCall(call)}
                >
                  <td className="py-3">
                    <div className="flex items-center">
                      {getStatusIcon(call.status)}
                      <span className="ml-2 text-gray-300 capitalize">
                        {call.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-white">{call.accountId}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-gray-300">
                      {['Alex Morgan', 'Sarah Chen', 'James Wilson'][
                        parseInt(call.collectorId) - 1
                      ]}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(call.startTime), 'MMM d, h:mm a')}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatDuration(call.duration)}
                    </div>
                  </td>
                  <td className="py-3">
                    {call.nextActionDate && (
                      <div className="text-gray-300">
                        <div className="text-sm">
                          {format(new Date(call.nextActionDate), 'MMM d')}
                        </div>
                        <div className="text-xs text-gray-400">{call.nextAction}</div>
                      </div>
                    )}
                  </td>
                  <td className="py-3">
                    {call.recording ? (
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                          <Play className="h-4 w-4 text-blue-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                          <Download className="h-4 w-4 text-blue-400" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">No recording</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Call Detail Modal would go here */}
    </div>
  );
};

export default RecentCalls;
import React, { useState } from 'react';
import { Card, Title, Text, BarChart, DonutChart, AreaChart } from '@tremor/react';
import { Phone, DollarSign, UserCheck, Clock, Bot, X, TrendingUp, TrendingDown } from 'lucide-react';

// Sample data for charts
const chartData = [
  { date: 'Jan 23', Calls: 167, Resolved: 145 },
  { date: 'Feb 23', Calls: 125, Resolved: 110 },
  { date: 'Mar 23', Calls: 156, Resolved: 123 },
  // Add more data points as needed
];

const Overview: React.FC = () => {
  const [showTestCallModal, setShowTestCallModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const handleTestCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccess('Test call scheduled! You will receive a call within 2 minutes.');
      setIsSubmitting(false);
      setTimeout(() => {
        setShowTestCallModal(false);
        setSuccess('');
        setPhone('');
      }, 3000);
    }, 1500);
  };

  const metrics = [
    {
      title: 'Total Calls',
      value: '1,234',
      icon: Phone,
      iconColor: 'text-blue-500',
      trend: { value: '+12%', positive: true }
    },
    {
      title: 'Amount Collected',
      value: '$45,678',
      icon: DollarSign,
      iconColor: 'text-green-500',
      trend: { value: '+8%', positive: true }
    },
    {
      title: 'Resolution Rate',
      value: '87%',
      icon: UserCheck,
      iconColor: 'text-purple-500',
      trend: { value: '-2%', positive: false }
    },
    {
      title: 'Avg Response Time',
      value: '0.012s',
      icon: Clock,
      iconColor: 'text-yellow-500',
      trend: { value: '-15%', positive: true }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
        <button
          onClick={() => setShowTestCallModal(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          <Phone className="h-5 w-5 mr-2" />
          Make Test Call
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-gray-400">{metric.title}</Text>
                <div className="flex items-center space-x-2">
                  <Title className="text-white">{metric.value}</Title>
                  <div className={`flex items-center ${
                    metric.trend.positive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.trend.positive ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm ml-1">{metric.trend.value}</span>
                  </div>
                </div>
              </div>
              <metric.icon className={`h-8 w-8 ${metric.iconColor}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <Title className="text-white mb-4">Collection Performance</Title>
          <AreaChart
            className="h-72"
            data={chartData}
            index="date"
            categories={["Calls", "Resolved"]}
            colors={["blue", "green"]}
          />
        </Card>
        <Card className="bg-gray-800/50 border-gray-700">
          <Title className="text-white mb-4">Resolution by Industry</Title>
          <DonutChart
            className="h-72"
            data={[
              { name: "Healthcare", value: 45 },
              { name: "Financial", value: 30 },
              { name: "Business", value: 25 },
            ]}
            category="value"
            index="name"
            colors={["blue", "cyan", "indigo"]}
            valueFormatter={(value) => `${value}%`}
          />
        </Card>
      </div>

      {/* Test Call Modal */}
      {showTestCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full m-4">
            <button
              onClick={() => setShowTestCallModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-center justify-center mb-6">
              <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
                <Bot className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white text-center mb-2">
              Test Your A<span className="text-blue-500">i</span> Collector
            </h3>
            <p className="text-gray-400 text-center mb-6">
              Experience how your configured A<span className="text-blue-500">i</span> collector handles calls with your current settings
            </p>

            <form onSubmit={handleTestCall} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter phone number for test call
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 555-5555"
                  required
                />
              </div>

              {success && (
                <div className="bg-green-500/10 text-green-400 p-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Scheduling Call...' : 'Start Test Call'}
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-400 text-center">
              Test calls help verify your compliance rules and custom instructions are working as expected
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
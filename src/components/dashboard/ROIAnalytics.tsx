import React, { useState } from 'react';
import { Card, Title, Text, BarChart, DonutChart, AreaChart } from '@tremor/react';
import { TrendingUp, TrendingDown, DollarSign, Users, Phone, Calendar } from 'lucide-react';
import HeatMap from './analytics/HeatMap';

// Sample data for demonstration
const roiData = [
  { source: 'Direct Mail', spend: 5000, collected: 15000, accounts: 120, roi: 200 },
  { source: 'Email Campaign', spend: 2000, collected: 8000, accounts: 80, roi: 300 },
  { source: 'SMS', spend: 1000, collected: 4000, accounts: 40, roi: 300 },
  { source: 'Voice', spend: 3000, collected: 12000, accounts: 100, roi: 300 },
  { source: 'Skip Tracing', spend: 2500, collected: 7500, accounts: 60, roi: 200 }
];

const monthlyData = [
  { month: 'Jan', spend: 13500, collected: 46500 },
  { month: 'Feb', spend: 12000, collected: 42000 },
  { month: 'Mar', spend: 14500, collected: 51000 },
  { month: 'Apr', spend: 15000, collected: 54000 },
  { month: 'May', spend: 13000, collected: 47000 }
];

const ROIAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('roi');

  const totalSpend = roiData.reduce((acc, curr) => acc + curr.spend, 0);
  const totalCollected = roiData.reduce((acc, curr) => acc + curr.collected, 0);
  const totalROI = ((totalCollected - totalSpend) / totalSpend * 100).toFixed(1);
  const totalAccounts = roiData.reduce((acc, curr) => acc + curr.accounts, 0);

  const metrics = [
    {
      title: 'Total ROI',
      value: `${totalROI}%`,
      trend: { value: '+12.3%', positive: true },
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Total Spend',
      value: `$${totalSpend.toLocaleString()}`,
      trend: { value: '-5.2%', positive: false },
      icon: DollarSign,
      color: 'text-blue-500'
    },
    {
      title: 'Total Collected',
      value: `$${totalCollected.toLocaleString()}`,
      trend: { value: '+8.1%', positive: true },
      icon: DollarSign,
      color: 'text-purple-500'
    },
    {
      title: 'Accounts Reached',
      value: totalAccounts,
      trend: { value: '+15.3%', positive: true },
      icon: Users,
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">ROI Analytics</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-gray-800/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      {/* Metrics Grid */}
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
              <metric.icon className={`h-8 w-8 ${metric.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* ROI by Source */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <Title className="text-white mb-4">ROI by Source</Title>
          <BarChart
            className="h-72"
            data={roiData}
            index="source"
            categories={["roi"]}
            colors={["blue"]}
            valueFormatter={(value) => `${value}%`}
          />
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <Title className="text-white mb-4">Spend vs. Collection</Title>
          <AreaChart
            className="h-72"
            data={monthlyData}
            index="month"
            categories={["spend", "collected"]}
            colors={["red", "green"]}
            valueFormatter={(value) => `$${value.toLocaleString()}`}
          />
        </Card>
      </div>

      {/* Heat Maps */}
      <Card className="bg-gray-800/50 border-gray-700">
        <Title className="text-white mb-4">Collection Activity Heat Map</Title>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Text className="text-gray-400 mb-2">Time of Day Performance</Text>
            <HeatMap
              data={[
                { hour: '9am', value: 85 },
                { hour: '10am', value: 92 },
                { hour: '11am', value: 88 },
                { hour: '12pm', value: 75 },
                { hour: '1pm', value: 80 },
                { hour: '2pm', value: 95 },
                { hour: '3pm', value: 90 },
                { hour: '4pm', value: 85 },
                { hour: '5pm', value: 70 }
              ]}
              valueKey="value"
              labelKey="hour"
            />
          </div>
          <div>
            <Text className="text-gray-400 mb-2">Day of Week Performance</Text>
            <HeatMap
              data={[
                { day: 'Monday', value: 82 },
                { day: 'Tuesday', value: 90 },
                { day: 'Wednesday', value: 88 },
                { day: 'Thursday', value: 85 },
                { day: 'Friday', value: 75 }
              ]}
              valueKey="value"
              labelKey="day"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ROIAnalytics;
import React, { useState } from 'react';
import { Phone, Bot, X, Shield, AlertCircle, Clock, Calendar } from 'lucide-react';

const ComplianceSettings: React.FC = () => {
  // ... state and other code remains the same until the header part

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-2 bg-blue-500 rounded-lg p-1.5">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                ClearPay<span className="text-blue-500 font-semibold italic">247</span>
              </h1>
            </div>
            <p className="text-gray-400">Configure your compliance rules and settings</p>
          </div>
        </div>

        {/* Rest of the component remains unchanged */}
      </div>
    </div>
  );
};

export default ComplianceSettings;
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface ApiCallLogProps {
  calls: string[];
}

const ApiCallLog: React.FC<ApiCallLogProps> = ({ calls }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [calls]);

  return (
    <div className="mt-8 border-t border-gray-700 pt-6">
      <div className="flex items-center mb-4">
        <Terminal className="h-5 w-5 text-blue-500 mr-2" />
        <h4 className="text-lg font-medium text-white">API Call Log</h4>
      </div>
      <div className="bg-gray-900/50 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
        {calls.length === 0 ? (
          <p className="text-gray-400">No API calls logged yet</p>
        ) : (
          <div className="space-y-2">
            {calls.map((call, index) => (
              <div 
                key={index} 
                className={`${
                  call.includes('Failed') || call.includes('Error')
                    ? 'text-red-400'
                    : call.includes('Success') || call.includes('initiated successfully')
                    ? 'text-green-400'
                    : 'text-gray-300'
                }`}
              >
                {call}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiCallLog;
import React from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

interface ImportResultsProps {
  isOpen: boolean;
  onClose: () => void;
  results: {
    total: number;
    successful: number;
    failed: number;
    errors: Array<{ row: number; error: string }>;
  };
}

const ImportResults: React.FC<ImportResultsProps> = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Import Results</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Total Records</div>
              <div className="text-2xl font-bold text-white">{results.total}</div>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg">
              <div className="text-green-400 text-sm">Successful</div>
              <div className="text-2xl font-bold text-green-400">{results.successful}</div>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg">
              <div className="text-red-400 text-sm">Failed</div>
              <div className="text-2xl font-bold text-red-400">{results.failed}</div>
            </div>
          </div>

          {results.errors.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white mb-4">Errors</h4>
              <div className="bg-gray-900/50 rounded-lg p-4 max-h-60 overflow-y-auto">
                {results.errors.map((error, index) => (
                  <div key={index} className="flex items-start space-x-2 text-red-400 mb-2">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Row {error.row}:</span> {error.error}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportResults;
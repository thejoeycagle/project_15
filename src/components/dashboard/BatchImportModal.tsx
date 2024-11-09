import React, { useState, useEffect } from 'react';
import { X, Edit2, Check, AlertCircle } from 'lucide-react';

interface BatchImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mappings: Record<string, string>) => void;
  headers: string[];
}

const BatchImportModal: React.FC<BatchImportModalProps> = ({ isOpen, onClose, onConfirm, headers }) => {
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [editingField, setEditingField] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Smart mapping based on common field names
    const smartMap: Record<string, string> = {};
    headers.forEach(header => {
      const headerLower = header.toLowerCase().trim();
      
      // Map debtor name (required field)
      if (headerLower.includes('debtor') || 
          headerLower.includes('name') || 
          headerLower.includes('customer') ||
          headerLower.includes('consumer')) {
        smartMap.debtor_name = header;
      }
      
      // Map account number
      if (headerLower.includes('account') || 
          headerLower.includes('acct') || 
          headerLower === 'number' || 
          headerLower === '#' ||
          headerLower.includes('reference')) {
        smartMap.original_account_number = header;
      }
      
      // Map creditor
      if (headerLower.includes('creditor') || 
          headerLower.includes('client') || 
          headerLower.includes('company') ||
          headerLower.includes('vendor')) {
        smartMap.original_creditor = header;
      }
      
      // Map current balance
      if ((headerLower.includes('balance') && !headerLower.includes('original')) || 
          headerLower.includes('amount') || 
          headerLower.includes('due') ||
          headerLower.includes('current')) {
        smartMap.current_balance = header;
      }
      
      // Map phone number
      if (headerLower.includes('phone') || 
          headerLower.includes('tel') || 
          headerLower.includes('mobile') ||
          headerLower.includes('cell') ||
          headerLower.includes('contact')) {
        smartMap.phone_number = header;
      }

      // Map SSN
      if (headerLower.includes('ssn') || 
          headerLower.includes('social') || 
          headerLower.includes('security') ||
          headerLower.includes('tax id')) {
        smartMap.ssn = header;
      }

      // Map email address
      if (headerLower.includes('email') || 
          headerLower.includes('e-mail') || 
          headerLower.includes('mail') ||
          headerLower.includes('@')) {
        smartMap.email = header;
      }
    });

    setMappings(smartMap);
  }, [headers]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Check if debtor_name is mapped
    const debtorNameField = Object.entries(mappings).find(([field, _]) => field === 'debtor_name');
    
    if (!debtorNameField) {
      setError('Please map a field to Debtor Name - it is required');
      return;
    }
    
    setError('');
    onConfirm(mappings);
  };

  const handleFieldEdit = (csvField: string, dbField: string) => {
    // Remove any existing mapping for this database field
    const newMappings = { ...mappings };
    Object.keys(newMappings).forEach(key => {
      if (newMappings[key] === csvField) {
        delete newMappings[key];
      }
    });

    // Add new mapping if a database field is selected
    if (dbField) {
      newMappings[dbField] = csvField;
    }

    setMappings(newMappings);
    setEditingField(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Map CSV Fields</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          {headers.map((header) => (
            <div key={header} className="flex items-center space-x-4">
              <div className="flex-1 text-white bg-gray-900/50 p-2 rounded">
                {header}
              </div>
              <div className="text-white">→</div>
              <div className="flex-1">
                {editingField === header ? (
                  <select
                    autoFocus
                    className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={Object.keys(mappings).find(key => mappings[key] === header) || ''}
                    onChange={(e) => handleFieldEdit(header, e.target.value)}
                  >
                    <option value="">Not Mapped</option>
                    <option value="debtor_name">Debtor Name</option>
                    <option value="original_account_number">Account Number</option>
                    <option value="original_creditor">Original Creditor</option>
                    <option value="current_balance">Current Balance</option>
                    <option value="phone_number">Phone Number</option>
                    <option value="email">Email</option>
                    <option value="ssn">SSN</option>
                    <option value="address">Address</option>
                    <option value="city">City</option>
                    <option value="state">State</option>
                    <option value="zip_code">ZIP Code</option>
                  </select>
                ) : (
                  <div className="flex items-center justify-between bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700">
                    <span>
                      {Object.entries(mappings).find(([_, value]) => value === header)?.[0] || 'Not Mapped'}
                    </span>
                    <button
                      onClick={() => setEditingField(header)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Import Accounts
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchImportModal;
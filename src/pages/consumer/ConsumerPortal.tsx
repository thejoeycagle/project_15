import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Phone, Lock, AlertCircle, Check, Shield, FileCheck, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import AccountView from './AccountView';
import { supabase } from '../../lib/supabase';

interface ConsumerPortalProps {
  isDemo?: boolean;
}

interface AccountMatch {
  debtor_name: string;
  account_id: string;
}

const ConsumerPortal: React.FC<ConsumerPortalProps> = ({ isDemo = false }) => {
  const { clientUrl } = useParams<{ clientUrl: string }>();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<'phone' | 'verify' | 'account'>(
    searchParams.get('phone') ? 'verify' : 'phone'
  );
  const [verification, setVerification] = useState<{ phone: string; ssn?: string }>({ 
    phone: searchParams.get('phone') || '',
    ssn: '' 
  });
  const [error, setError] = useState('');
  const [debtorName, setDebtorName] = useState('');
  const [accountData, setAccountData] = useState<any>(null);
  const [showSSN, setShowSSN] = useState(false);
  const [accountMatches, setAccountMatches] = useState<AccountMatch[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');

  useEffect(() => {
    const fetchAccounts = async () => {
      if (verification.phone) {
        try {
          const cleanPhone = verification.phone.replace(/\D/g, '');
          const { data, error } = await supabase
            .from('phone_numbers')
            .select(`
              account_id,
              accounts!inner(
                debtor_name
              )
            `)
            .eq('number', cleanPhone);

          if (error) throw error;

          if (data && data.length > 0) {
            const matches = data.map(item => ({
              debtor_name: item.accounts.debtor_name,
              account_id: item.account_id
            }));
            setAccountMatches(matches);
            
            // If only one match, auto-select it
            if (matches.length === 1) {
              setSelectedAccountId(matches[0].account_id);
              setDebtorName(matches[0].debtor_name);
            }
          }
        } catch (err) {
          console.error('Error fetching accounts:', err);
          setError('Failed to fetch account information');
        }
      }
    };

    fetchAccounts();
  }, [verification.phone]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isDemo) {
      setCurrentStep('verify');
      return;
    }

    try {
      const cleanPhone = verification.phone.replace(/\D/g, '');
      const { data, error } = await supabase
        .from('phone_numbers')
        .select('number')
        .eq('number', cleanPhone);

      if (error) throw error;
      if (data && data.length > 0) {
        setCurrentStep('verify');
      } else {
        setError('Phone number not found. Please enter the number we called you at.');
      }
    } catch (err) {
      setError('Phone number not found. Please enter the number we called you at.');
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isDemo) {
      setCurrentStep('account');
      return;
    }

    if (!selectedAccountId && accountMatches.length > 1) {
      setError('Please select an account to continue');
      return;
    }

    try {
      const accountId = selectedAccountId || accountMatches[0]?.account_id;

      // Get account details
      const { data: accountData, error: accountError } = await supabase
        .from('accounts')
        .select('*')
        .eq('id', accountId)
        .single();

      if (accountError) throw accountError;
      if (!accountData) {
        setError('Account not found.');
        return;
      }

      // Verify last 4 of SSN
      const dbSsnLast4 = accountData.ssn?.replace(/\D/g, '').slice(-4);
      const inputSsnLast4 = verification.ssn?.replace(/\D/g, '').slice(-4);

      if (!dbSsnLast4 || !inputSsnLast4 || dbSsnLast4 !== inputSsnLast4) {
        setError('Invalid SSN. Please try again.');
        return;
      }

      setAccountData(accountData);
      setCurrentStep('account');
    } catch (err) {
      console.error('SSN verification error:', err);
      setError('Invalid SSN. Please try again.');
    }
  };

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId);
    const account = accountMatches.find(match => match.account_id === accountId);
    if (account) {
      setDebtorName(account.debtor_name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="mr-2 bg-blue-500 rounded-lg p-1.5">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    ClearPay<span className="text-blue-500 font-semibold italic">247</span>
                  </h1>
                </div>
              </Link>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-green-600" />
                  Bank-Level Security
                </div>
                <div className="flex items-center">
                  <LockKeyhole className="h-4 w-4 mr-1 text-blue-600" />
                  256-bit Encryption
                </div>
              </div>
            </div>
          </div>
          
          {currentStep === 'verify' && (
            <div className="px-4 sm:px-6 lg:px-8 py-3 bg-blue-50">
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Lock className="h-4 w-4 mr-2 text-blue-600" />
                  Secure Identity Verification
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FileCheck className="h-4 w-4 mr-2 text-green-600" />
                  SOC 2 Type II Certified
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                  FDCPA Compliant
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {currentStep === 'account' ? (
        <AccountView isDemo={isDemo} accountData={accountData} />
      ) : (
        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentStep === 'verify' ? 'Verify Your Identity' : 'Secure Account Access'}
            </h1>
            {currentStep === 'verify' && accountMatches.length > 1 && (
              <div className="mt-4">
                <p className="text-lg text-gray-600 mb-2">Multiple accounts found. Please select one:</p>
                <div className="space-y-2">
                  {accountMatches.map((match) => (
                    <button
                      key={match.account_id}
                      onClick={() => handleAccountSelect(match.account_id)}
                      className={`w-full p-3 rounded-lg border ${
                        selectedAccountId === match.account_id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      } transition-colors`}
                    >
                      <span className="font-medium">{match.debtor_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 'verify' && debtorName && accountMatches.length === 1 && (
              <p className="text-lg text-gray-600 mt-2">
                Name associated with phone number: <span className="font-medium">{debtorName}</span>
              </p>
            )}
            <p className="text-gray-600 mt-2">
              {currentStep === 'verify' 
                ? 'Please verify your identity to access your account securely'
                : 'Verify your identity to access your account and payment options'
              }
            </p>
            {isDemo && (
              <div className="mt-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                Demo Mode - Any input will be accepted
              </div>
            )}
          </div>

          {currentStep === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={verification.phone}
                    onChange={(e) => setVerification(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 555-5555"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last 4 Digits of SSN
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showSSN ? "text" : "password"}
                    maxLength={4}
                    value={verification.ssn}
                    onChange={(e) => setVerification(prev => ({
                      ...prev,
                      ssn: e.target.value.replace(/\D/g, '').slice(0, 4)
                    }))}
                    className="w-full bg-white text-gray-900 rounded-lg pl-10 pr-12 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowSSN(!showSSN)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showSSN ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Verify Identity
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Secure payment portal powered by ClearPay247
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsumerPortal;
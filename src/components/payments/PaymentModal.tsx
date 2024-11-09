import React, { useState } from 'react';
import { X, CreditCard, Building2, Calendar, Eye, EyeOff, Lock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSubmit: (paymentData: PaymentData) => void;
  isCustomPlan?: boolean;
}

export interface PaymentData {
  type: 'card' | 'check';
  amount: number;
  postDate?: Date;
  monthlyPayment?: number;
  card?: {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
    zip: string;
  };
  check?: {
    routingNumber: string;
    accountNumber: string;
    accountType: 'checking' | 'savings';
    name: string;
  };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, onSubmit, isCustomPlan = false }) => {
  const [paymentType, setPaymentType] = useState<'card' | 'check'>('card');
  const [postDate, setPostDate] = useState<string>('');
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [paymentData, setPaymentData] = useState<PaymentData>({
    type: 'card',
    amount,
    card: {
      number: '',
      expiry: '',
      cvv: '',
      name: '',
      zip: ''
    },
    check: {
      routingNumber: '',
      accountNumber: '',
      accountType: 'checking',
      name: ''
    }
  });

  if (!isOpen) return null;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 16);
    return v.length > 0 ? v.match(/.{1,4}/g)?.join(' ') || '' : '';
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...paymentData,
      type: paymentType,
      postDate: postDate ? new Date(postDate) : undefined,
      monthlyPayment: monthlyPayment ? parseFloat(monthlyPayment) : undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Make Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Payment Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentType('card')}
              className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-colors ${
                paymentType === 'card'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentType('check')}
              className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-colors ${
                paymentType === 'check'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <Building2 className="h-5 w-5 mr-2" />
              Check
            </button>
          </div>

          {/* Monthly Payment Amount (for custom plan only) */}
          {isCustomPlan && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How much can you pay per month?
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter monthly payment amount"
                  required={isCustomPlan}
                  min="1"
                  step="0.01"
                />
              </div>
            </div>
          )}

          {/* Post Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Date (Optional)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={postDate}
                onChange={(e) => setPostDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {paymentType === 'card' ? (
            <>
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showCardNumber ? "text" : "password"}
                    value={paymentData.card?.number || ''}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      card: {
                        ...paymentData.card!,
                        number: formatCardNumber(e.target.value)
                      }
                    })}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="•••• •••• •••• ••••"
                    maxLength={19}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCardNumber(!showCardNumber)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCardNumber ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry
                  </label>
                  <input
                    type="text"
                    value={paymentData.card?.expiry || ''}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      card: {
                        ...paymentData.card!,
                        expiry: formatExpiry(e.target.value)
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={paymentData.card?.cvv || ''}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      card: {
                        ...paymentData.card!,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="•••"
                    maxLength={4}
                  />
                </div>
              </div>

              {/* Name and ZIP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={paymentData.card?.name || ''}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      card: {
                        ...paymentData.card!,
                        name: e.target.value
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={paymentData.card?.zip || ''}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      card: {
                        ...paymentData.card!,
                        zip: e.target.value.replace(/\D/g, '').slice(0, 5)
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="12345"
                    maxLength={5}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Routing Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Routing Number
                </label>
                <input
                  type="text"
                  value={paymentData.check?.routingNumber || ''}
                  onChange={(e) => setPaymentData({
                    ...paymentData,
                    check: {
                      ...paymentData.check!,
                      routingNumber: e.target.value.replace(/\D/g, '').slice(0, 9)
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123456789"
                  maxLength={9}
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <div className="relative">
                  <input
                    type={showAccountNumber ? "text" : "password"}
                    value={paymentData.check?.accountNumber || ''}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      check: {
                        ...paymentData.check!,
                        accountNumber: e.target.value.replace(/\D/g, '')
                      }
                    })}
                    className="w-full pr-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAccountNumber(!showAccountNumber)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showAccountNumber ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Account Type and Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <select
                    value={paymentData.check?.accountType || 'checking'}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      check: {
                        ...paymentData.check!,
                        accountType: e.target.value as 'checking' | 'savings'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Account
                  </label>
                  <input
                    type="text"
                    value={paymentData.check?.name || ''}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      check: {
                        ...paymentData.check!,
                        name: e.target.value
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <Lock className="h-5 w-5 mr-2" />
            {isCustomPlan ? 'Set Up Payment Plan' : `Pay $${amount.toLocaleString()}`}
          </button>

          {/* Security Note */}
          <p className="text-center text-sm text-gray-500">
            Your payment information is encrypted and secure
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
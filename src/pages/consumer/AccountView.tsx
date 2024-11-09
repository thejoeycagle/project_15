import React, { useState } from 'react';
import { ArrowRight, Check, AlertCircle, Phone, Lock, Shield, FileCheck, LockKeyhole, Bot, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import PaymentModal, { PaymentData } from '../../components/payments/PaymentModal';
import { supabase } from '../../lib/supabase';

interface AccountViewProps {
  isDemo?: boolean;
  accountData?: any;
}

const AccountView: React.FC<AccountViewProps> = ({ isDemo = false, accountData }) => {
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [showCustomSlider, setShowCustomSlider] = useState(false);
  const [customAmount, setCustomAmount] = useState(978);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  const paymentOptions = [
    {
      type: 'settlement',
      savings: '40%',
      amount: accountData ? accountData.current_balance * 0.6 : 0,
      description: 'One-Time Settlement',
      features: [
        'Easy one-time settlement',
        'Need time? Post date your payment!',
        'Clear debt from credit for good',
        'Immediate Paid In Full Letter Sent'
      ]
    },
    {
      type: 'payment-plan',
      savings: '10% - 40%',
      amount: accountData ? accountData.current_balance : 0,
      description: 'Partial Payment Plan',
      features: [
        'Choose option that works for you',
        'Need time? Post date your payment!',
        'Clear debt from credit for good',
        'Paid In Full Letter when complete'
      ]
    }
  ];

  const faqs = [
    {
      id: 'calls',
      question: 'How do I know I won\'t get a call from another agency after settling or making a payment?',
      answer: 'Once you settle or establish a payment plan, we will provide written confirmation. This account will be marked as resolved in our system and no other agencies will contact you about this debt.'
    },
    {
      id: 'statute',
      question: 'Is my account past the statute of limitations?',
      answer: 'The statute of limitations varies by state and type of debt. We recommend consulting with a financial advisor or legal counsel to understand your specific situation.'
    },
    {
      id: 'documentation',
      question: 'Can you provide more information or documentation?',
      answer: 'Yes, we can provide account documentation upon request. Please contact our office directly to request specific documents.'
    },
    {
      id: 'reporting',
      question: 'Will you report my account to the credit bureau or a law firm?',
      answer: 'We are required to report accurate information to credit bureaus. Settling your account or maintaining a payment plan will be reported positively.'
    }
  ];

  const handleMakePayment = (amount: number, isPaymentPlan: boolean = false) => {
    setSelectedAmount(amount);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    try {
      // TODO: Process payment through payment gateway
      console.log('Processing payment:', paymentData);
      
      // Simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowPaymentModal(false);
      setPaymentSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setPaymentSuccess(false), 5000);
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment error
    }
  };

  const handleResolveNow = () => {
    const settlementOption = document.querySelector('[data-payment-type="settlement"]');
    if (settlementOption) {
      settlementOption.scrollIntoView({ behavior: 'smooth' });
      handleMakePayment(accountData?.current_balance * 0.6 || 0, false);
    }
  };

  if (!accountData) {
    return <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
      <div className="text-red-500">Account data not found</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Account Summary Card */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Summary</h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              ${accountData?.current_balance?.toLocaleString() || '0.00'}
            </div>
            <div className="text-gray-600">
              Original Creditor: <span className="font-medium">{accountData?.original_creditor || 'N/A'}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start md:items-end">
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg mb-4">
              <div className="font-medium">Settlement Offer Available</div>
              <div className="text-sm">Save up to 40% today</div>
            </div>
            <button
              onClick={handleResolveNow}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center group"
            >
              Resolve Now
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {paymentOptions.map((option) => (
          <div 
            key={option.type}
            data-payment-type={option.type}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{option.description}</h3>
                <div className="text-green-600 font-medium">Save {option.savings}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  {option.type === 'payment-plan' ? 'Payoff w/o Interest' : 'Settlement Amount'}
                </div>
                <div className="text-2xl font-bold text-gray-900">${option.amount.toLocaleString()}</div>
              </div>
            </div>
            <ul className="space-y-2 mb-6">
              {option.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleMakePayment(option.amount, option.type === 'payment-plan')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {option.type === 'payment-plan' ? 'Set Up Payment Plan' : 'Make Payment'}
            </button>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Resolve Your Account Today?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4">
            <DollarSign className="h-8 w-8 text-blue-500 mb-3" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Save Money</h4>
            <p className="text-gray-600">Take advantage of our settlement offer and save up to 40% on your balance</p>
          </div>
          <div className="p-4">
            <Shield className="h-8 w-8 text-blue-500 mb-3" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Improve Credit</h4>
            <p className="text-gray-600">Resolution will be reported to credit bureaus, helping your credit score recover</p>
          </div>
          <div className="p-4">
            <Phone className="h-8 w-8 text-blue-500 mb-3" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Stop Collection Calls</h4>
            <p className="text-gray-600">End collection attempts and get peace of mind knowing your debt is resolved</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-gray-900 font-medium">{faq.question}</span>
                {selectedFaq === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {selectedFaq === faq.id && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Contact */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">Need assistance? Contact our support team</p>
        <a href="tel:(800)555-0123" className="text-blue-600 font-medium hover:text-blue-500">
          (800) 555-0123
        </a>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedAmount}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
};

export default AccountView;
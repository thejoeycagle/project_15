import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';
import { paymentService } from '../../lib/database';
import { Payment } from '../../types/payment';
import { encryptData, decryptData } from '../../utils/encryption';

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visiblePaymentDetails, setVisiblePaymentDetails] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await paymentService.getPayments();
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Fetch payments error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePaymentDetails = (paymentId: string) => {
    setVisiblePaymentDetails(prev => ({
      ...prev,
      [paymentId]: !prev[paymentId]
    }));
  };

  const handleStatusUpdate = async (paymentId: string, status: 'processed' | 'declined') => {
    try {
      setError(null);
      await paymentService.updatePaymentStatus(paymentId, status);
      await fetchPayments(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment status');
      console.error('Update status error:', err);
    }
  };

  const formatPaymentMethod = (payment: Payment) => {
    if (payment.payment_type === 'card') {
      const cardInfo = payment.payment_method.card;
      return visiblePaymentDetails[payment.id] 
        ? `${decryptData(cardInfo!.number)} - ${cardInfo!.exp_month}/${cardInfo!.exp_year}`
        : '•••• •••• •••• ' + decryptData(cardInfo!.number).slice(-4);
    } else {
      const checkInfo = payment.payment_method.check;
      return visiblePaymentDetails[payment.id]
        ? `${decryptData(checkInfo!.routing_number)} - ${decryptData(checkInfo!.account_number)}`
        : '••••••••' + decryptData(checkInfo!.account_number).slice(-4);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Payments</h2>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="bg-gray-800/50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900/50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Account</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Payment Method</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Post Date</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4">
                    <div className="text-white">{payment.account_id}</div>
                    <div className="text-sm text-gray-400">
                      {payment.accounts?.debtor_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-white">{formatPaymentMethod(payment)}</span>
                      <button
                        onClick={() => togglePaymentDetails(payment.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        {visiblePaymentDetails[payment.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      payment.status === 'processed' ? 'bg-green-500/10 text-green-500' :
                      payment.status === 'declined' ? 'bg-red-500/10 text-red-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    {payment.post_date ? new Date(payment.post_date).toLocaleDateString() : 'Immediate'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {payment.status === 'pending' && (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(payment.id, 'processed')}
                          className="p-1 hover:bg-green-500/10 rounded-lg text-green-500"
                          title="Mark as Processed"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(payment.id, 'declined')}
                          className="p-1 hover:bg-red-500/10 rounded-lg text-red-500"
                          title="Mark as Declined"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsPage;
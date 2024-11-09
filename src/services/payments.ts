import { supabase } from '../lib/supabase';
import { encryptData, decryptData } from '../utils/encryption';
import { PaymentData } from '../components/payments/PaymentModal';

export interface StoredPayment {
  id: string;
  account_id: string;
  debtor_name: string;
  amount: number;
  payment_type: 'card' | 'check';
  payment_date: string;
  post_date?: string;
  status: 'pending' | 'processed';
  encrypted_details: string;
  created_at: string;
}

export const paymentsService = {
  async createPayment(accountId: string, debtorName: string, paymentData: PaymentData): Promise<StoredPayment | null> {
    try {
      // Encrypt sensitive payment details
      const sensitiveData = paymentData.type === 'card' ? paymentData.card : paymentData.check;
      const encryptedDetails = await encryptData(JSON.stringify(sensitiveData));

      const { data, error } = await supabase
        .from('payments')
        .insert({
          account_id: accountId,
          debtor_name: debtorName,
          amount: paymentData.amount,
          payment_type: paymentData.type,
          payment_date: new Date().toISOString(),
          post_date: paymentData.postDate?.toISOString(),
          status: 'pending',
          encrypted_details: encryptedDetails
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to create payment:', error);
      return null;
    }
  },

  async getPayments(): Promise<StoredPayment[]> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      return [];
    }
  },

  async getDecryptedPaymentDetails(payment: StoredPayment): Promise<any> {
    try {
      const decryptedData = await decryptData(payment.encrypted_details);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Failed to decrypt payment details:', error);
      return null;
    }
  },

  async markAsProcessed(paymentId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('payments')
        .update({ status: 'processed' })
        .eq('id', paymentId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Failed to mark payment as processed:', error);
      return false;
    }
  }
};
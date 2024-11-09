import { supabase } from './supabase';
import { Account, PhoneNumber } from '../types/account';
import { Payment } from '../types/payment';
import { BlandSettings } from '../hooks/useBlandSettings';

const formatSSN = (ssn: string | undefined): string | null => {
  if (!ssn) return null;
  const cleaned = ssn.replace(/\D/g, '');
  if (cleaned.length !== 9) return null;
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
};

export const accountService = {
  async batchImportAccounts(accounts: Partial<Account>[], phoneNumbers: Record<string, string[]>) {
    try {
      const { data: accountData, error: accountError } = await supabase
        .from('accounts')
        .insert(accounts.map(account => ({
          account_number: account.account_number || `ACC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          original_account_number: account.original_account_number,
          debtor_name: account.debtor_name,
          address: account.address,
          city: account.city,
          state: account.state,
          zip_code: account.zip_code,
          ssn: formatSSN(account.ssn),
          date_of_birth: account.date_of_birth,
          email: account.email,
          current_balance: account.current_balance,
          original_creditor: account.original_creditor,
          status: 'new',
          add_date: new Date().toISOString(),
          add_notes: account.add_notes
        })))
        .select();

      if (accountError) throw accountError;

      if (accountData) {
        const phoneNumberInserts = accountData.flatMap(account => {
          const numbers = phoneNumbers[account.account_number] || [];
          return numbers.map(number => ({
            account_id: account.id,
            number: number,
            status: 'unknown'
          }));
        });

        if (phoneNumberInserts.length > 0) {
          const { error: phoneError } = await supabase
            .from('phone_numbers')
            .insert(phoneNumberInserts);

          if (phoneError) throw phoneError;
        }
      }

      return accountData;
    } catch (error) {
      console.error('Failed to batch import accounts:', error);
      throw error;
    }
  },

  async getAccounts() {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select(`
          *,
          phone_numbers (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      throw error;
    }
  }
};

export const integrationService = {
  async getBlandSettings(): Promise<BlandSettings | null> {
    try {
      const { data, error } = await supabase
        .from('integration_settings')
        .select('settings')
        .eq('provider', 'bland')
        .single();

      if (error) throw error;
      return data?.settings || null;
    } catch (error) {
      console.error('Failed to get Bland settings:', error);
      return null;
    }
  },

  async saveBlandSettings(settings: BlandSettings): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('integration_settings')
        .upsert({
          provider: 'bland',
          settings,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'provider'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Failed to save Bland settings:', error);
      return false;
    }
  }
};

export const paymentService = {
  async getPayments() {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      throw error;
    }
  },

  async addPayment(payment: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert({
          ...payment,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to add payment:', error);
      return null;
    }
  },

  async updatePaymentStatus(id: string, status: 'pending' | 'processed' | 'declined') {
    try {
      const { data, error } = await supabase
        .from('payments')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to update payment status:', error);
      return false;
    }
  }
};
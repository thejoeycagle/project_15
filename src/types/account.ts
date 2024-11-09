export interface Account {
  id: string;
  account_number: string;
  original_account_number?: string;
  debtor_name: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  ssn?: string;
  date_of_birth?: string;
  email?: string;
  current_balance?: number | null;
  original_creditor?: string;
  account_status?: string;
  add_date?: string;
  add_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PhoneNumber {
  id: string;
  account_id: string;
  number: string;
  status: 'good' | 'bad' | 'unknown';
  created_at?: string;
  updated_at?: string;
}

export interface Payment {
  id: string;
  account_id: string;
  amount: number;
  payment_type: 'card' | 'check';
  payment_method: {
    card?: {
      number: string;
      exp_month: string;
      exp_year: string;
      cvv: string;
      name: string;
    };
    check?: {
      routing_number: string;
      account_number: string;
      account_type: 'checking' | 'savings';
      name: string;
    };
  };
  status: 'pending' | 'processed' | 'declined';
  post_date?: string;
  created_at: string;
  updated_at: string;
}
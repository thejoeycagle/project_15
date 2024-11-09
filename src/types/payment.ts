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
  accounts?: {
    debtor_name: string;
    account_number: string;
  };
}
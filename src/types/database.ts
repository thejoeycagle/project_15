// Previous interfaces remain the same...

export interface PhoneNumber {
  id: string;
  account_id: string;
  number: string;
  type: 'mobile' | 'home' | 'work' | 'other';
  status: 'good' | 'bad' | 'unknown';
  last_called?: string;
  last_status_update?: string;
  created_at: string;
  updated_at: string;
}

// Rest of the interfaces remain the same...
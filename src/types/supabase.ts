export interface Database {
  public: {
    Tables: {
      payments: {
        Row: {
          id: string
          account_id: string
          amount: number
          payment_type: 'card' | 'check'
          payment_method_encrypted: string
          payment_status: 'pending' | 'processed' | 'failed'
          post_date: string | null
          created_at: string
          updated_at: string
          processed_by: string | null
          processed_at: string | null
        }
        Insert: {
          id?: string
          account_id: string
          amount: number
          payment_type: 'card' | 'check'
          payment_method_encrypted: string
          payment_status?: 'pending' | 'processed' | 'failed'
          post_date?: string | null
          created_at?: string
          updated_at?: string
          processed_by?: string | null
          processed_at?: string | null
        }
        Update: {
          id?: string
          account_id?: string
          amount?: number
          payment_type?: 'card' | 'check'
          payment_method_encrypted?: string
          payment_status?: 'pending' | 'processed' | 'failed'
          post_date?: string | null
          created_at?: string
          updated_at?: string
          processed_by?: string | null
          processed_at?: string | null
        }
      }
    }
  }
}
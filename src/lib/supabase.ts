import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

// Create Supabase client with enhanced configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'x-client-info': 'clearpay247@1.0.0'
    }
  },
  db: {
    schema: 'public'
  },
  // Add retries for better reliability
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Test connection function with enhanced error reporting
export const testConnection = async () => {
  try {
    const { data, error, status } = await supabase
      .from('accounts')
      .select('count')
      .single();
    
    if (error) {
      console.error('Supabase connection error:', {
        message: error.message,
        status,
        details: error.details
      });
      return false;
    }
    
    console.log('Supabase connection successful', {
      status,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.error('Failed to test Supabase connection:', err);
    return false;
  }
};

// Helper to check if we're in production
export const isProduction = () => {
  return import.meta.env.PROD === true;
};
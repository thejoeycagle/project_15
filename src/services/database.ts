import { supabase } from '../lib/supabase';

export const testDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('payments').select('count(*)');
    
    if (error) {
      console.error('Database connection error:', error);
      return false;
    }

    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Failed to test database connection:', error);
    return false;
  }
};
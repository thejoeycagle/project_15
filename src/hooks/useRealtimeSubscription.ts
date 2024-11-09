import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

interface SubscriptionOptions {
  table: string;
  schema?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
}

export function useRealtimeSubscription<T>(
  options: SubscriptionOptions,
  callback: (payload: { new: T; old: T }) => void
) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    // Create subscription
    const channel = supabase.channel('db_changes')
      .on(
        'postgres_changes',
        {
          event: options.event || '*',
          schema: options.schema || 'public',
          table: options.table,
          filter: options.filter,
        },
        (payload) => callback(payload as any)
      )
      .subscribe();

    setChannel(channel);

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, [options.table, options.event, options.schema, options.filter]);

  return channel;
}
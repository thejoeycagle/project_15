-- Create function to initialize integration_settings table
create or replace function create_integration_settings_if_not_exists()
returns void as $$
begin
  -- Create table if it doesn't exist
  if not exists (select from pg_tables where schemaname = 'public' and tablename = 'integration_settings') then
    create table integration_settings (
      id uuid default gen_random_uuid() primary key,
      provider text not null unique,
      settings jsonb not null default '{}'::jsonb,
      created_at timestamp with time zone default now(),
      updated_at timestamp with time zone default now()
    );

    -- Create index on provider
    create unique index if not exists integration_settings_provider_idx 
    on integration_settings(provider);

    -- Enable RLS
    alter table integration_settings enable row level security;

    -- Create policies
    create policy "Enable read access for all users" on integration_settings
      for select using (true);

    create policy "Enable insert for authenticated users" on integration_settings
      for insert with check (true);

    create policy "Enable update for authenticated users" on integration_settings
      for update using (true);
  end if;

  -- Insert default Bland settings if they don't exist
  insert into integration_settings (provider, settings)
  values (
    'bland',
    '{
      "apiKey": "",
      "pathwayId": "",
      "fromNumber": "",
      "model": "enhanced",
      "voice": "nat",
      "maxDuration": 300,
      "record": false
    }'::jsonb
  )
  on conflict (provider) do nothing;
end;
$$ language plpgsql;
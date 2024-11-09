-- Create integration_settings table
create table if not exists integration_settings (
  id uuid default gen_random_uuid() primary key,
  provider text not null unique,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Add indexes
create index if not exists idx_integration_settings_provider on integration_settings(provider);

-- Enable RLS
alter table integration_settings enable row level security;

-- Create policies
create policy "Enable read access for all users" on integration_settings
  for select using (true);

create policy "Enable insert for authenticated users" on integration_settings
  for insert with check (true);

create policy "Enable update for authenticated users" on integration_settings
  for update using (true);
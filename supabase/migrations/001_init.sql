-- Enable required extensions
create extension if not exists "pgcrypto";

-- Create accounts table if it doesn't exist
create table if not exists accounts (
  id uuid default gen_random_uuid() primary key,
  account_number text not null unique default gen_random_uuid()::text,
  original_account_number text,
  debtor_name text not null,
  address text,
  city text,
  state text,
  zip_code text,
  ssn text,
  date_of_birth timestamp with time zone,
  email text,
  current_balance numeric(10,2),
  original_creditor text,
  account_status text default 'new',
  add_date timestamp with time zone default now(),
  add_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create phone_numbers table if it doesn't exist
create table if not exists phone_numbers (
  id uuid default gen_random_uuid() primary key,
  account_id uuid references accounts(id) on delete cascade,
  number text not null,
  status text default 'unknown',
  last_called timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create payments table if it doesn't exist
create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  account_id uuid references accounts(id),
  amount numeric(10,2) not null,
  payment_type text not null check (payment_type in ('card', 'check')),
  payment_method_encrypted text not null,
  status text not null default 'pending' check (status in ('pending', 'processed', 'declined')),
  post_date timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes if they don't exist
create index if not exists idx_accounts_number on accounts(account_number);
create index if not exists idx_accounts_original_number on accounts(original_account_number);
create index if not exists idx_accounts_status on accounts(account_status);
create index if not exists idx_phone_numbers_account on phone_numbers(account_id);
create index if not exists idx_phone_numbers_number on phone_numbers(number);
create index if not exists idx_payments_account on payments(account_id);
create index if not exists idx_payments_status on payments(status);

-- Disable RLS temporarily to ensure clean policy setup
alter table accounts disable row level security;
alter table phone_numbers disable row level security;
alter table payments disable row level security;

-- Drop existing policies if they exist
drop policy if exists "Enable read access for all users" on accounts;
drop policy if exists "Enable insert for all users" on accounts;
drop policy if exists "Enable update for all users" on accounts;
drop policy if exists "Enable read access for all users" on phone_numbers;
drop policy if exists "Enable insert for all users" on phone_numbers;
drop policy if exists "Enable update for all users" on phone_numbers;
drop policy if exists "Enable read access for all users" on payments;
drop policy if exists "Enable insert for all users" on payments;
drop policy if exists "Enable update for all users" on payments;

-- Re-enable RLS
alter table accounts enable row level security;
alter table payments enable row level security;

-- Create new policies with public access for accounts
create policy "Enable public read access" on accounts
  for select using (true);

create policy "Enable public insert access" on accounts
  for insert with check (true);

create policy "Enable public update access" on accounts
  for update using (true);

create policy "Enable public delete access" on accounts
  for delete using (true);

-- Create payment policies
create policy "Enable read access for all users" on payments
  for select using (true);

create policy "Enable insert for all users" on payments
  for insert with check (true);

create policy "Enable update for all users" on payments
  for update using (true);

-- Keep phone_numbers table RLS disabled for public access
-- This allows searching accounts by phone number without authentication
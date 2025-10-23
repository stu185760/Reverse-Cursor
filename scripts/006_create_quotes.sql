-- Create quotes table for vendor quotes on customer ads
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  ad_id uuid not null references public.ads(id) on delete cascade,
  vendor_id uuid not null references public.profiles(id) on delete cascade,
  price_inr numeric not null check (price_inr > 0),
  delivery_days integer not null check (delivery_days > 0),
  message text not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'rejected', 'withdrawn')),
  thread_id uuid,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.quotes enable row level security;

-- Vendors can create quotes
create policy "quotes_insert_vendor" on public.quotes for insert with check (
  auth.uid() = vendor_id
);

-- Everyone can read quotes for ads they're involved in
create policy "quotes_select_involved" on public.quotes for select using (
  auth.uid() = vendor_id or
  auth.uid() in (select user_id from public.ads where id = ad_id)
);

-- Vendors can update their own quotes (withdraw)
create policy "quotes_update_vendor" on public.quotes for update using (
  auth.uid() = vendor_id
);

-- Ad owners can update quote status (accept/reject)
create policy "quotes_update_customer" on public.quotes for update using (
  auth.uid() in (select user_id from public.ads where id = ad_id)
);

-- Create index for performance
create index if not exists quotes_ad_id_idx on public.quotes(ad_id);
create index if not exists quotes_vendor_id_idx on public.quotes(vendor_id);
create index if not exists quotes_status_idx on public.quotes(status);


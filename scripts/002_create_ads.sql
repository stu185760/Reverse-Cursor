-- Create ads table for customer requests
create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null check (category in ('Clothing', 'Footwear', 'Furniture', 'Automobile', 'Jewelry', 'Gifting', 'Others')),
  title text not null,
  description text,
  location text not null,
  price_from numeric,
  price_to numeric,
  images text[] default array[]::text[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.ads enable row level security;

create policy "ads_select_all" on public.ads for select using (true);
create policy "ads_insert_own" on public.ads for insert with check (auth.uid() = user_id);
create policy "ads_update_own" on public.ads for update using (auth.uid() = user_id);
create policy "ads_delete_own" on public.ads for delete using (auth.uid() = user_id);

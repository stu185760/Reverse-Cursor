-- Create classifieds table for vendor product listings
create table if not exists public.classifieds (
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

alter table public.classifieds enable row level security;

create policy "classifieds_select_all" on public.classifieds for select using (true);
create policy "classifieds_insert_own" on public.classifieds for insert with check (auth.uid() = user_id);
create policy "classifieds_update_own" on public.classifieds for update using (auth.uid() = user_id);
create policy "classifieds_delete_own" on public.classifieds for delete using (auth.uid() = user_id);

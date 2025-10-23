-- Enhance profiles table with vendor-specific fields
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists rating numeric check (rating >= 0 and rating <= 5);
alter table public.profiles add column if not exists total_reviews integer default 0;
alter table public.profiles add column if not exists portfolio_images text[] default array[]::text[];
alter table public.profiles add column if not exists specialties text[] default array[]::text[];
alter table public.profiles add column if not exists phone_number text;
alter table public.profiles add column if not exists business_name text;
alter table public.profiles add column if not exists years_experience integer;
alter table public.profiles add column if not exists location text;
alter table public.profiles add column if not exists verified boolean default false;

-- Create reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.profiles(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  created_at timestamp with time zone default now()
);

alter table public.reviews enable row level security;

-- Everyone can read reviews
create policy "reviews_select_all" on public.reviews for select using (true);

-- Customers can create reviews
create policy "reviews_insert_customer" on public.reviews for insert with check (
  auth.uid() = customer_id
);

-- Create indexes for performance
create index if not exists reviews_vendor_id_idx on public.reviews(vendor_id);
create index if not exists reviews_customer_id_idx on public.reviews(customer_id);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_location_idx on public.profiles(location);

-- Function to update vendor rating when review is added
create or replace function update_vendor_rating()
returns trigger as $$
begin
  update public.profiles
  set 
    rating = (
      select round(avg(rating)::numeric, 1)
      from public.reviews
      where vendor_id = NEW.vendor_id
    ),
    total_reviews = (
      select count(*)
      from public.reviews
      where vendor_id = NEW.vendor_id
    )
  where id = NEW.vendor_id;
  return NEW;
end;
$$ language plpgsql;

-- Trigger to automatically update vendor rating
create trigger on_review_insert
  after insert on public.reviews
  for each row
  execute function update_vendor_rating();


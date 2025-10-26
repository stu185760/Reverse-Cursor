-- Test the ads table constraint
-- This should work
INSERT INTO public.ads (user_id, title, description, category, location, budget_min, budget_max, status) 
VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'Test Ad',
  'Test Description',
  'Jewelry',
  'Mumbai',
  1000.00,
  5000.00,
  'open'
);

-- This should fail
INSERT INTO public.ads (user_id, title, description, category, location, budget_min, budget_max, status) 
VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'Test Ad 2',
  'Test Description 2',
  'Jewelry',
  'Mumbai',
  1000.00,
  5000.00,
  'invalid_status'
);

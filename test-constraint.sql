-- Test the ads_status_check constraint
-- Run this in Supabase SQL Editor

-- First, let's see what the constraint actually is
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conname = 'ads_status_check';

-- Test valid status values
INSERT INTO public.ads (user_id, title, description, category, location, budget_min, budget_max, status) 
VALUES (
    (SELECT id FROM public.profiles LIMIT 1),
    'Test Ad - Valid Status',
    'Test Description',
    'Jewelry',
    'Mumbai',
    1000.00,
    5000.00,
    'open'
);

-- Test invalid status (this should fail)
INSERT INTO public.ads (user_id, title, description, category, location, budget_min, budget_max, status) 
VALUES (
    (SELECT id FROM public.profiles LIMIT 1),
    'Test Ad - Invalid Status',
    'Test Description',
    'Jewelry',
    'Mumbai',
    1000.00,
    5000.00,
    'invalid_status'
);

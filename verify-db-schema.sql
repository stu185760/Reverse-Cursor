-- Verify the ads table schema and constraints
-- Run this in Supabase SQL Editor

-- Check if the ads table exists and its structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'ads' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check all constraints on the ads table
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.ads'::regclass;

-- Check specifically for the status check constraint
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conname LIKE '%status%' 
AND conrelid = 'public.ads'::regclass;

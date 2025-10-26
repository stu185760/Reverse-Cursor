# Environment Variables Setup

## For Local Development

Create a file called `.env.local` in the root directory with these contents:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://atqbwkdtgvkavcuwolxo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0cWJ3a2R0Z3ZrYXZjdXdvbHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MTkyMzIsImV4cCI6MjA3Njk5NTIzMn0.hqGU3SbLWv3Wp_8Rw3LAzbgHSza2_FWwFcnG4n_VgjI
```

## For Vercel Production

✅ Already configured! Your Vercel project has:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- All Postgres connection strings

## Quick Setup Command

```bash
# Copy and paste this into your terminal to create .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=https://atqbwkdtgvkavcuwolxo.supabase.co" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0cWJ3a2R0Z3ZrYXZjdXdvbHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MTkyMzIsImV4cCI6MjA3Njk5NTIzMn0.hqGU3SbLWv3Wp_8Rw3LAzbgHSza2_FWwFcnG4n_VgjI" >> .env.local
```

## Next Steps

After creating `.env.local`:
1. Restart your dev server: `npm run dev`
2. Your local app will now connect to Supabase!


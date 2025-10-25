# 🚀 Supabase Setup Guide

**Mission:** Transform your demo app into a production-ready application with real database and authentication!

---

## 📋 Overview

**What We'll Set Up:**
1. ✅ Supabase account and project
2. ✅ PostgreSQL database with proper schema
3. ✅ Supabase Authentication (email/password)
4. ✅ Row Level Security (RLS) policies
5. ✅ Real-time subscriptions (optional)
6. ✅ File storage for images

**Time Required:** 2-3 hours for full setup

---

## STEP 1: Create Supabase Account (5 minutes)

### 1.1 Sign Up
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Verify your email

### 1.2 Create New Project
1. Click "New Project"
2. Choose organization (or create one)
3. Fill in project details:
   - **Name:** `reverse-marketplace` (or your choice)
   - **Database Password:** Generate a strong password (SAVE THIS!)
   - **Region:** Choose closest to your users (e.g., `ap-south-1` for India)
   - **Pricing Plan:** Free tier is perfect to start

4. Click "Create new project"
5. ⏱️ Wait 2-3 minutes for provisioning

### 1.3 Get Your API Keys
Once project is ready:
1. Go to **Project Settings** (gear icon)
2. Click **API** in sidebar
3. Copy these values (we'll need them):
   - ✅ **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - ✅ **anon/public key** (long string starting with `eyJ...`)
   - ⚠️ **service_role key** (NEVER expose this in frontend!)

---

## STEP 2: Database Schema Setup

### 2.1 Open SQL Editor
1. In Supabase dashboard, click **SQL Editor**
2. Click **New Query**

### 2.2 Run the Migration Script
We'll create this script in the next step. It will create:
- Users table (profiles)
- Ads table (customer requirements)
- Classifieds table (vendor products)
- Quotes table (vendor offers)
- Messages table (conversations)
- All relationships and indexes

---

## STEP 3: Install Dependencies

Open your terminal and run:

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

## STEP 4: Configure Environment Variables

Create `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **Important:** Add `.env.local` to your `.gitignore` (should already be there)

---

## STEP 5: Enable Authentication

### 5.1 Configure Auth Settings
1. Go to **Authentication** → **Settings**
2. Enable **Email** provider
3. Set **Site URL:** `http://localhost:3000` (change in production)
4. Add **Redirect URLs:**
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000` (for logout)

### 5.2 Email Templates (Optional but Recommended)
1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation and password reset emails
3. Add your branding

---

## STEP 6: Set Up Row Level Security (RLS)

RLS ensures users can only access their own data. We'll create policies for:
- Users can read their own profile
- Users can update their own profile
- Users can create ads/classifieds
- Users can read public ads/classifieds
- Users can only modify their own content

The migration script (coming next) includes all RLS policies.

---

## STEP 7: Test Connection

After setup, test the connection:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Test query
const { data, error } = await supabase.from('profiles').select('*')
console.log('Connection test:', { data, error })
```

---

## 📁 Files We'll Create

1. **`lib/supabase/client.ts`** - Supabase client setup
2. **`lib/supabase/server.ts`** - Server-side Supabase client
3. **`lib/supabase/database.types.ts`** - TypeScript types (auto-generated)
4. **`supabase/migrations/001_initial_schema.sql`** - Database schema
5. **`lib/api/`** - New API layer to replace localStorage functions
6. **`app/auth/`** - Authentication pages (login, signup, callback)
7. **`.env.local`** - Environment variables

---

## 🔄 Migration Strategy

### Phase 1: Side-by-side (Recommended)
- Keep localStorage working
- Add Supabase alongside
- Test thoroughly
- Switch when ready

### Phase 2: Direct replacement
- Replace localStorage immediately
- Faster but riskier

We'll use **Phase 1** for safety.

---

## ✅ Checklist Before We Start Coding

- [ ] Supabase account created
- [ ] New project created and running
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] Service role key copied (stored safely)
- [ ] Email auth enabled
- [ ] Ready to run `npm install`

---

## 🚀 Next Steps

Once you complete the checklist above, I'll:

1. ✅ Create the database migration script
2. ✅ Set up Supabase client configuration
3. ✅ Build the authentication system
4. ✅ Create API layer to replace localStorage
5. ✅ Add data migration tools
6. ✅ Test everything thoroughly

---

## 🆘 Common Issues & Solutions

### Issue: "Invalid API key"
- **Solution:** Double-check you copied the `anon` key, not the `service_role` key for frontend

### Issue: "Failed to connect"
- **Solution:** Wait a few minutes, project might still be provisioning

### Issue: "CORS error"
- **Solution:** Check Site URL is configured correctly in Auth settings

### Issue: "RLS policy blocks query"
- **Solution:** Make sure you're authenticated or accessing public data

---

## 💰 Costs

**Free Tier Includes:**
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth
- 50,000 monthly active users
- 500 MB egress

This is MORE than enough for testing and early launch! 🎉

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

---

## ✋ READY TO START?

**Tell me when you've:**
1. Created your Supabase account ✅
2. Created a new project ✅
3. Got your API keys ✅

Then I'll generate all the code and help you implement it! 

**OR** if you want me to walk you through each step in detail, just say "guide me through it step by step"!


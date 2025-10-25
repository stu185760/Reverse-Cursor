# 🚀 Supabase Quick Start

**Ready to go from demo to production? Follow these steps!**

---

## ✅ Step 1: Create Supabase Account (5 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project:
   - Name: `reverse-marketplace`
   - Database Password: **Generate and SAVE this!**
   - Region: Choose closest to you (`ap-south-1` for India)
   - Click "Create new project"
5. ⏱️ Wait 2-3 minutes for project to provision

---

## ✅ Step 2: Run Database Migration (5 minutes)

### 2.1 Get your API keys
1. In Supabase dashboard, go to **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy these values:
   - **Project URL**
   - **anon public** key

### 2.2 Create .env.local file
1. In your project root, create a file named `.env.local`
2. Copy content from `ENV_TEMPLATE.txt`
3. Replace with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...your-actual-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2.3 Run the migration
1. Open Supabase dashboard
2. Click **SQL Editor** in sidebar
3. Click **New Query**
4. Copy entire content of `supabase/migrations/001_initial_schema.sql`
5. Paste into the SQL editor
6. Click **RUN**
7. ✅ You should see "Success. No rows returned"

---

## ✅ Step 3: Enable Authentication (2 minutes)

1. In Supabase dashboard, go to **Authentication**
2. Click **Settings**
3. Under **Email Auth**, make sure it's **enabled**
4. Set **Site URL** to: `http://localhost:3000`
5. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000`
6. Click **Save**

---

## ✅ Step 4: Set Up Storage (Optional - 3 minutes)

For image uploads:

1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Name it: `ads-images`
4. Make it **Public**
5. Click **Create bucket**
6. Repeat for:
   - `classified-images`
   - `avatars`

---

## ✅ Step 5: Install Dependencies (1 minute)

Run in your terminal:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## ✅ Step 6: Test Connection (2 minutes)

1. Make sure your `.env.local` file has the correct values
2. Restart your dev server:
   ```bash
   npm run dev
   ```

3. Create a test file to verify connection:

```typescript
// test-supabase.ts
import { supabase } from './lib/supabase/client'

async function testConnection() {
  const { data, error } = await supabase.from('profiles').select('count')
  
  if (error) {
    console.error('❌ Connection failed:', error)
  } else {
    console.log('✅ Connected to Supabase!', data)
  }
}

testConnection()
```

---

## 🎯 What We've Set Up

| Component | Status |
|-----------|--------|
| ✅ Database | PostgreSQL with all tables |
| ✅ Authentication | Email/password ready |
| ✅ Row Level Security | Policies configured |
| ✅ API Client | Configured for Next.js |
| ✅ TypeScript Types | Auto-generated |
| ⏳ Storage Buckets | Optional for images |

---

## 🔄 Next Steps

Now we need to:

1. **Create auth pages** (login, signup, callback)
2. **Migrate localStorage functions** to Supabase API calls
3. **Update components** to use Supabase
4. **Test everything** thoroughly
5. **Deploy** to production!

---

## 📊 Current Progress

```
[█████░░░░░] 50% Complete

✅ Supabase account created
✅ Database schema deployed
✅ Authentication enabled
✅ API configured
⏳ Auth pages (next)
⏳ Data migration (after auth)
⏳ Testing
⏳ Production deployment
```

---

## 🆘 Troubleshooting

### "Invalid API key"
- Check you're using the `anon` key, not `service_role` in `.env.local`
- Make sure the variable names match exactly

### "Failed to connect"
- Wait a few more minutes, project might still be provisioning
- Check your internet connection
- Verify the URL is correct

### "RLS policy blocks query"
- Normal! You need to be authenticated to access data
- We'll fix this when we add auth pages

---

## 💡 Want Me To Continue?

I can now:

1. **Build authentication pages** - Login, signup, password reset
2. **Create API layer** - Replace localStorage with Supabase calls
3. **Migrate existing data** - Move your test data to Supabase
4. **Test everything** - Make sure it all works

**Just say:** "Continue with authentication" or "Build the auth pages"

---

## 📞 Status Check

**Where are you now?**

- [ ] Just reading this guide
- [ ] Created Supabase account
- [ ] Ran the database migration
- [ ] Added .env.local file
- [ ] Installed dependencies
- [ ] Ready for next steps!

Let me know where you are, and I'll help you through the rest! 🚀


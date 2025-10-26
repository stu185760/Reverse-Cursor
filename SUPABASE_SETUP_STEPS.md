# 🚀 Supabase Setup - Step by Step

**Your Site:** https://v0-pilot-run-soft-launch-ec.vercel.app/  
**Your Supabase:** https://atqbwkdtgvkavcuwolxo.supabase.co

---

## ✅ Step 1: Run Database Migration (5 minutes)

### 1.1 Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/atqbwkdtgvkavcuwolxo
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**

### 1.2 Copy the Migration Script
1. Open the file: `supabase/migrations/001_initial_schema.sql` (in this project)
2. Select ALL the content (Ctrl+A)
3. Copy it (Ctrl+C)

### 1.3 Run the Migration
1. Paste the entire script into the Supabase SQL Editor
2. Click **RUN** (or press Ctrl+Enter)
3. Wait ~10 seconds
4. You should see: ✅ "Success. No rows returned"
5. Check the **Logs** tab - you should see the completion messages

### 1.4 Verify Tables Were Created
1. Click **Table Editor** in the left sidebar
2. You should see these tables:
   - ✅ profiles
   - ✅ ads
   - ✅ classifieds
   - ✅ quotes
   - ✅ messages
   - ✅ reviews

**If you see all 6 tables → SUCCESS!** ✅

---

## ✅ Step 2: Set Up Image Storage (3 minutes)

### 2.1 Create Storage Buckets
1. Click **Storage** in the left sidebar
2. Click **New bucket**

### 2.2 Create Three Buckets:

**Bucket 1: ads-images**
- Name: `ads-images`
- Toggle **Public bucket** to ON
- Click **Create bucket**

**Bucket 2: classified-images**
- Name: `classified-images`
- Toggle **Public bucket** to ON
- Click **Create bucket**

**Bucket 3: avatars**
- Name: `avatars`
- Toggle **Public bucket** to ON
- Click **Create bucket**

### 2.3 Verify Buckets
You should now see 3 buckets in the Storage section! ✅

---

## ✅ Step 3: Configure Authentication (2 minutes)

### 3.1 Update Redirect URLs
1. Click **Authentication** in the left sidebar
2. Click **URL Configuration**
3. Set **Site URL** to:
   ```
   https://v0-pilot-run-soft-launch-ec.vercel.app
   ```

4. Under **Redirect URLs**, add these (one per line):
   ```
   https://v0-pilot-run-soft-launch-ec.vercel.app
   https://v0-pilot-run-soft-launch-ec.vercel.app/auth/callback
   http://localhost:3000
   http://localhost:3000/auth/callback
   ```

5. Click **Save**

---

## ✅ Step 4: Verify Vercel Environment Variables (2 minutes)

### 4.1 Check Variables in Vercel
1. Go to: https://vercel.com
2. Find your project: `v0-pilot-run-soft-launch-ec`
3. Click **Settings** → **Environment Variables**

### 4.2 Verify These 3 Variables Exist:

| Variable Name | Value | Status |
|---------------|-------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://atqbwkdtgvkavcuwolxo.supabase.co` | Should exist ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...VgjI` (your key) | Should exist ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | (Get from Supabase → Settings → API) | Add if missing |

### 4.3 If Missing the Service Role Key:
1. Go to Supabase → Settings → API
2. Find **service_role** key (⚠️ NEVER share this publicly!)
3. Click **Copy**
4. Add to Vercel as `SUPABASE_SERVICE_ROLE_KEY`
5. Check all 3 environments: ✅ Production ✅ Preview ✅ Development

---

## ✅ Step 5: Test Your Setup! (5 minutes)

### 5.1 Visit Your Live Site
Go to: https://v0-pilot-run-soft-launch-ec.vercel.app

### 5.2 Try These Tests:

**Test 1: Browse Categories**
- Click on any category (Jewelry, Footwear, etc.)
- Should load without errors ✅

**Test 2: Post an Ad** (if auth is working)
- Click "Post Ad"
- Fill in details
- Submit
- Check if it appears on the home page

**Test 3: Check Supabase Database**
- Go back to Supabase → Table Editor → `ads` table
- You should see your ad there! ✅

---

## 🎯 Success Checklist

- [ ] Database tables created (6 tables visible)
- [ ] Storage buckets created (3 buckets visible)
- [ ] Authentication URLs configured
- [ ] Environment variables verified in Vercel
- [ ] Site loads without errors
- [ ] Can browse categories
- [ ] (Optional) Can post an ad and see it in database

---

## 🆘 Troubleshooting

### "Success. No rows returned" after running migration
✅ **This is GOOD!** It means the script ran successfully.

### Can't see tables in Table Editor
- Refresh the page
- Check if there were any errors in the SQL execution
- Scroll through all the output logs

### Site shows "No ads found"
- Normal if database is empty!
- Try posting an ad to test
- Or it might still be using localStorage (we'll migrate code next)

### Authentication not working
- Make sure redirect URLs are exactly correct (no trailing slashes!)
- Check environment variables are set in Vercel
- May need to redeploy after adding env vars

---

## 🎉 Once Complete:

**Come back and tell me:**
1. ✅ "Database migration successful"
2. ✅ "Storage buckets created"
3. ✅ "Auth URLs configured"

**Then I'll help you:**
- Update the code to use Supabase instead of localStorage
- Add image upload functionality
- Test everything end-to-end!

---

**Total Time:** ~15 minutes  
**Difficulty:** Easy (just copy/paste!)  
**Result:** Production-ready database! 🚀



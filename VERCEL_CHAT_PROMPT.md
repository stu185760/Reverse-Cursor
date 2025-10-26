# 📋 Copy This Prompt to Vercel Chat

---

## 🎯 PASTE THIS INTO VERCEL CHAT:

```
Hi! I need help deploying my Next.js 15 app and connecting it to my existing Supabase database.

SITUATION:
- Repository: https://github.com/stu185760/Reverse-Cursor
- Framework: Next.js 15 (App Router)
- Database: Supabase (already set up from v0.dev project)
- Goal: Deploy to Vercel and connect to existing Supabase instance

WHAT I NEED HELP WITH:

1. IMPORTING MY REPOSITORY
   - Repository name: Reverse-Cursor
   - GitHub username: stu185760
   - Branch: main

2. CONFIGURING ENVIRONMENT VARIABLES
   I have these three Supabase credentials from my existing project:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   
   How do I add these to my Vercel project? Which environments should I enable (Production/Preview/Development)?

3. BUILD SETTINGS
   - Build Command: npm run build (is this correct?)
   - Output Directory: .next (is this correct?)
   - Install Command: npm install (is this correct?)
   - Node.js Version: Should I specify a version?

4. SUPABASE AUTHENTICATION SETUP
   After deployment, I need to:
   - Update Supabase redirect URLs with my Vercel domain
   - Configure authentication callback routes
   
   What Vercel URL should I use for the redirect URLs?

5. DEPLOYMENT
   - Should I deploy immediately or configure settings first?
   - How do I redeploy if I need to change environment variables?

6. TESTING
   What should I check after deployment to ensure Supabase connection works?

ADDITIONAL INFO:
- This is a reverse marketplace app (customers post requirements, vendors respond)
- Uses Supabase Auth for authentication
- Has PWA support configured
- Repository is public/private [specify which]

Please guide me through the deployment process step-by-step!
```

---

## 🔄 SHORTER VERSION (If Vercel Chat has character limit):

```
Need help deploying Next.js 15 app from GitHub (stu185760/Reverse-Cursor) and connecting to existing Supabase database.

Have these credentials ready:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY  
- SUPABASE_SERVICE_ROLE_KEY

Questions:
1. How to add environment variables correctly?
2. What build settings to use?
3. How to update Supabase redirect URLs after deployment?
4. How to test the Supabase connection works?

Please guide me step-by-step through import → configure → deploy!
```

---

## 💡 TIPS FOR CHATTING WITH VERCEL

1. **Be Specific:** Mention you're using Next.js 15 (App Router)
2. **Have Credentials Ready:** Keep your Supabase dashboard open
3. **Ask Follow-ups:** If unclear, ask "Can you show me exactly where to click?"
4. **Screenshot Issues:** If something doesn't work, describe what you see
5. **Mention v0:** If relevant, mention "migrating from v0.dev"

---

## 🎯 WHAT TO EXPECT

Vercel's assistant should help you:
- ✅ Import your repository
- ✅ Configure environment variables
- ✅ Set up build settings
- ✅ Deploy your app
- ✅ Get your live URL
- ✅ Configure custom domain (optional)

---

## 🆘 IF VERCEL CHAT CAN'T HELP

Come back here and tell me:
- "Vercel chat isn't helping, walk me through it"
- "Got stuck at [specific step]"
- "Deployment failed with [error message]"

I'll guide you manually through every click! 🚀

---

## ✅ AFTER SUCCESSFUL DEPLOYMENT

You'll need to:
1. Copy your Vercel URL (e.g., reverse-cursor.vercel.app)
2. Go to Supabase → Authentication → URL Configuration
3. Add these URLs:
   ```
   Site URL: https://your-app.vercel.app
   
   Redirect URLs:
   https://your-app.vercel.app
   https://your-app.vercel.app/auth/callback
   http://localhost:3000
   http://localhost:3000/auth/callback
   ```

Then test your live app! 🎉



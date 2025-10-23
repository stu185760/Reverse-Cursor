# EasyCustomized Testing Guide

## 🎨 Visual Testing Checklist

### Homepage (http://localhost:3000)
- [ ] Black background (#0D0D0D) visible
- [ ] Hero section with neon cyan "Their Craft" text
- [ ] Trust indicators showing "10,000+ Active Users"
- [ ] Testimonials section with 3 cards (Riya, Arjun, Priya)
- [ ] Category showcase section
- [ ] Recent requests section

### Theme Verification
- [ ] All buttons use cyan (#00FFFF) or purple (#7A00FF)
- [ ] Cards have glassmorphic effect with blur
- [ ] Hover states show neon glow
- [ ] Text is readable on black background

---

## 🇮🇳 India Localization Testing

### Currency Formatting
1. Go to `/post-ad`
2. Fill in budget fields
3. **Expected**: See ₹ symbol and placeholder "e.g. ₹1,000"

### Location Selector
1. Click location dropdown in post-ad form
2. **Expected**: See grouped options:
   - 📍 Special Options (All India, Remote)
   - 🏙️ Major Indian Cities (Mumbai, Delhi NCR, Bengaluru...)
   - 🏘️ Other Indian Cities
   - 🌍 International

---

## 💼 Quote System Testing

### As Vendor (Submit Quote)
1. **Switch to Vendor Role**:
   - Open DevTools (F12) → Console
   - Run:
   ```javascript
   localStorage.setItem('reverse-marketplace-db:v1', JSON.stringify({
     ...JSON.parse(localStorage.getItem('reverse-marketplace-db:v1')),
     currentUserId: 'u-vend'
   }))
   location.reload()
   ```

2. Go to `/ads` and click any ad
3. **Expected**: See "Submit Your Quote" form with:
   - Your Price (₹) field
   - Delivery Time (days) field
   - Offer Details textarea
   - Cyan "Submit Quote" button

4. Fill in the form:
   - Price: 5000
   - Delivery: 7
   - Message: "I can deliver high-quality work"
   
5. Click Submit
6. **Expected**: Success, quote appears below

### As Customer (View & Accept Quotes)
1. **Switch to Customer Role**:
   ```javascript
   localStorage.setItem('reverse-marketplace-db:v1', JSON.stringify({
     ...JSON.parse(localStorage.getItem('reverse-marketplace-db:v1')),
     currentUserId: 'u-cust'
   }))
   location.reload()
   ```

2. Create a new ad at `/post-ad`
3. After creating, you should see your ad
4. **Expected**: "AI-Recommended Vendors" purple card at top
5. Switch back to vendor and submit a quote
6. Switch to customer and refresh
7. **Expected**: See "Quotes Received" section with vendor's quote
8. Click "Accept Quote"
9. **Expected**: 
   - Quote status changes to "Accepted"
   - Other pending quotes auto-rejected
   - Ad status changes to "Closed"

---

## ⭐ Vendor Profile Testing

### View Vendor Profile
1. Go to `/vendor/u-vend`
2. **Expected**: See:
   - Vendor avatar (circular gradient)
   - Name: "Arjun Mehta"
   - Business: "Mehta Crafts"
   - ✓ Verified badge
   - Rating: ⭐ 4.8 (24 reviews)
   - 📍 Mumbai
   - 💼 8 years experience
   - Specialties badges (Jewelry, Gifting)
   - Stats cards (Total Quotes, Accepted, Pending)

### Review System
1. As customer with accepted quote
2. Visit vendor profile
3. Scroll to reviews section
4. **Expected**: See existing reviews (if any)

---

## 🛡️ Admin Dashboard Testing

### Access Admin Panel
1. **Switch to Admin Role**:
   ```javascript
   localStorage.setItem('reverse-marketplace-db:v1', JSON.stringify({
     ...JSON.parse(localStorage.getItem('reverse-marketplace-db:v1')),
     currentUserId: 'u-admin'
   }))
   location.reload()
   ```

2. Go to `/admin`
3. **Expected**: See sidebar with:
   - Dashboard (overview)
   - Users
   - Ads
   - Messages
   - Flags
   - Reports

### Dashboard Overview
**Expected metrics**:
- Total Users count
- Active Ads count
- Pending Quotes count
- Total Transaction Value in ₹
- Messages count
- Flags count
- Platform health indicators

### User Management (`/admin/users`)
- [ ] Search functionality works
- [ ] Filter by role (All, Customer, Vendor, Admin)
- [ ] Users display with avatars
- [ ] Verified badges show
- [ ] Vendor ratings visible

### Ads Management (`/admin/ads`)
- [ ] Search ads by title/description
- [ ] Filter by status (Open, Closed)
- [ ] View button navigates to ad
- [ ] Delete button works with confirmation

### Messages Monitoring (`/admin/messages`)
- [ ] See all conversation threads
- [ ] Customer and vendor names shown
- [ ] Message count displayed
- [ ] Last activity timestamp

### Reports (`/admin/reports`)
- [ ] User growth metrics
- [ ] Ad activity stats
- [ ] Transaction value in ₹
- [ ] Top categories bar chart
- [ ] Percentage calculations correct

---

## 🤖 AI Matching Testing

### Vendor Recommendations
1. As customer, view any ad
2. **Expected**: See "AI-Recommended Vendors" purple card
3. **Verify**:
   - Shows top 3 vendors
   - Match percentage displayed (e.g., "15% match")
   - Match reasons shown as badges
   - "View Profile" button works

### Match Accuracy
Test with specific ad:
1. Create ad with title: "Need custom jewelry for wedding"
2. **Expected**: Vendor with "jewelry" specialty ranks higher
3. Match reasons should include:
   - "Specializes in jewelry"
   - "Top-rated (4.8⭐)"
   - "8+ years experience"

---

## 🔔 Notifications Testing

### Notification Bell
1. As customer or vendor, look at header
2. **Expected**: Bell icon visible (top right)
3. **With notifications**: Red badge shows count

### Trigger Notifications
**For Customer**:
1. Have vendor submit quote on your ad
2. Click bell icon
3. **Expected**: Dropdown shows "Vendor sent a quote for [Ad Title]"

**For Vendor**:
1. Have customer accept your quote
2. Click bell icon
3. **Expected**: "Your quote for [Ad Title] was accepted! 🎉"

### Notification Actions
1. Click any notification
2. **Expected**: Navigate to relevant page (ad or message)

---

## 📱 Responsive Design Testing

### Mobile (375px width)
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone SE" or set width to 375px
4. **Test**:
   - [ ] Navigation menu hamburger icon visible
   - [ ] Mobile menu opens/closes
   - [ ] Cards stack vertically
   - [ ] Buttons are 44px minimum height
   - [ ] Text is readable
   - [ ] Forms are usable

### Tablet (768px width)
- [ ] Layout adapts appropriately
- [ ] 2-column grid for cards
- [ ] Sidebar menu if applicable

### Desktop (1440px width)
- [ ] Full width utilization
- [ ] 3-4 column grids
- [ ] All features accessible

---

## ♿ Accessibility Testing

### Keyboard Navigation
1. Use only Tab key to navigate
2. **Expected**: 
   - [ ] All interactive elements focusable
   - [ ] Focus indicator visible (cyan outline)
   - [ ] Logical tab order

### Screen Reader (Optional)
1. Enable Windows Narrator or NVDA
2. Navigate the app
3. **Expected**: All content announced properly

### Color Contrast
- [ ] Text readable on black background
- [ ] Neon colors meet WCAG AA standards
- [ ] No pure black text on pure white

---

## 🎯 End-to-End User Flow Testing

### Complete Customer Journey
1. **Start as Customer** → Post ad with ₹5000 budget
2. **Switch to Vendor** → Browse ads, find your ad
3. **As Vendor** → Submit quote (₹4500, 5 days)
4. **Check notifications** → Bell shows new activity
5. **Switch to Customer** → See AI recommendations
6. **View quote** → Accept the quote
7. **Check notifications** → Both parties notified
8. **Switch to Admin** → View entire transaction in dashboard

### Complete Vendor Journey
1. **Start as Vendor** → Browse `/ads`
2. **Find relevant ad** → Based on AI matching
3. **Submit competitive quote** → With detailed message
4. **Wait for acceptance** → Monitor notifications
5. **Quote accepted** → Navigate to conversation
6. **View profile** → See rating update (if reviewed)

---

## 🔍 Data Persistence Testing

### Local Storage
1. Post an ad or submit a quote
2. Refresh the page (F5)
3. **Expected**: Data persists (not lost)

### Reset Data
If needed, run in console:
```javascript
localStorage.removeItem('reverse-marketplace-db:v1')
location.reload()
```

---

## 🐛 Error Handling Testing

### Form Validation
1. Try submitting empty forms
2. **Expected**: Error messages display
3. Form prevents submission

### Network Errors (Simulated)
Since using local storage:
- All CRUD operations should work offline
- No Supabase errors should appear

---

## ✅ Quick Test Script

Run this in browser console to verify setup:

```javascript
// Check if local DB is working
const db = JSON.parse(localStorage.getItem('reverse-marketplace-db:v1'))
console.log('✅ Database loaded:', db ? 'Yes' : 'No')
console.log('📊 Users:', db?.users?.length)
console.log('📝 Ads:', db?.ads?.length)
console.log('💬 Quotes:', db?.quotes?.length)
console.log('⭐ Reviews:', db?.reviews?.length)
console.log('🔔 Threads:', db?.threads?.length)
console.log('👤 Current User:', db?.currentUserId)

// Check theme
const bgColor = getComputedStyle(document.body).backgroundColor
console.log('🎨 Background Color:', bgColor)

// Test currency formatter (if in window scope)
console.log('💰 Currency Test: ₹2,500')
```

---

## 📊 Expected Results Summary

### Working Features
✅ Black + Neon theme  
✅ INR currency formatting  
✅ Indian locations  
✅ Quote submission & acceptance  
✅ Vendor profiles with ratings  
✅ Admin dashboard (all pages)  
✅ AI vendor matching  
✅ Notifications system  
✅ Responsive design  
✅ Accessibility features  

### Not Implemented (As Per Plan)
❌ Real-time messaging (uses local storage)  
❌ Payment integration (placeholder only)  
❌ Email notifications  
❌ File uploads to cloud storage  

---

## 🎉 Success Criteria

Your app is working correctly if:
1. All pages load without errors
2. Theme is consistently black + neon
3. All prices show ₹ symbol
4. Quotes can be submitted and accepted
5. Admin dashboard shows all data
6. AI recommendations appear
7. Notifications bell works
8. No console errors (check DevTools)

---

Happy Testing! 🚀


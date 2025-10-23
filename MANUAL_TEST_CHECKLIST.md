# ✅ **COMPREHENSIVE MANUAL TEST CHECKLIST**

## **EasyCustomized - Complete Testing Guide**

---

## 🎯 **TEST ENVIRONMENT**

**URL:** http://localhost:3000  
**Date:** October 23, 2025  
**Build Status:** ✅ Production Ready

---

## 📱 **1. HOMEPAGE TESTS**

### **Test 1.1: Hero Section**
- [ ] Page loads without errors
- [ ] "Your Idea, Their Craft" heading visible
- [ ] "EasyCustomized" name with cyan highlight
- [ ] Trust indicators show (10,000+ users, verified vendors)
- [ ] "Post Your Request" button (cyan, clickable)
- [ ] "Browse Requests" button (purple outline, clickable)
- [ ] 4 images in grid (jewelry, shoes, bridal, automobile)
- [ ] Images have glassmorphic effect on hover

### **Test 1.2: Category Showcase**
- [ ] Categories section visible
- [ ] Multiple category cards shown
- [ ] Each card shows icon and name
- [ ] Cards clickable/hoverable with effect
- [ ] Categories include: Jewelry, Furniture, Automobiles, etc.

### **Test 1.3: Craftsmanship Section**
- [ ] "Expert Craftsmanship" section visible
- [ ] Description text readable
- [ ] Images or content displayed properly

### **Test 1.4: 📱 GET THE MOBILE APP SECTION** ⭐ **NEW!**
- [ ] "📱 Get the Mobile App" heading visible
- [ ] Large cyan/purple gradient card
- [ ] Smartphone icon displayed
- [ ] Two-column layout: Android/Desktop | iPhone/iPad
- [ ] **Android section shows:**
  - [ ] Chrome icon
  - [ ] "Install App Now" button (if supported)
  - [ ] OR installation instructions
- [ ] **iPhone section shows:**
  - [ ] Share icon
  - [ ] Step-by-step instructions (1-5)
  - [ ] Clear tap-by-tap guide
- [ ] **Benefits section shows:**
  - [ ] ⚡ Faster
  - [ ] 📴 Works Offline
  - [ ] 🏠 Home Screen
  - [ ] 📱 Native Feel
- [ ] Tip text at bottom visible
- [ ] Section responsive on mobile

### **Test 1.5: Testimonials Section**
- [ ] 3 testimonial cards visible
- [ ] Each card shows: avatar, name, role, rating, comment
- [ ] Star ratings displayed (yellow)
- [ ] Glassmorphic cards with hover effect

### **Test 1.6: Recent Requests Section**
- [ ] "Recent Requests" heading
- [ ] Sample ad card(s) displayed
- [ ] Ad cards show title, category, location, budget

---

## 🔐 **2. AUTHENTICATION TESTS**

### **Test 2.1: Login**
- [ ] Navigate to /auth/login
- [ ] Email and password fields visible
- [ ] "Login" button present
- [ ] Can switch to "Sign Up" link
- [ ] Form submission works (with demo data)
- [ ] Successful login redirects to homepage
- [ ] User name appears in header after login
- [ ] "Logout" button appears

### **Test 2.2: Sign Up**
- [ ] Navigate to /auth/sign-up
- [ ] Name, Email, Password, Role fields visible
- [ ] Role selector shows: Customer, Vendor, Admin
- [ ] "Sign Up" button present
- [ ] Form submission works
- [ ] Success message or redirect

### **Test 2.3: Logout**
- [ ] After login, "Logout" button visible in header
- [ ] Click logout
- [ ] User logged out
- [ ] Redirected appropriately
- [ ] Login/Sign Up buttons reappear

---

## 📝 **3. POST AD TESTS**

### **Test 3.1: Access & Navigation**
- [ ] Click "Post Your Request" from homepage
- [ ] Redirects to /post-ad
- [ ] Multi-step wizard appears
- [ ] "Step 1 of 4" shown

### **Test 3.2: Step 1 - Category**
- [ ] Category dropdown visible
- [ ] All categories listed (Jewelry, Furniture, etc.)
- [ ] Can select a category
- [ ] "Next" button enabled after selection
- [ ] Clicking Next advances to Step 2

### **Test 3.3: Step 2 - Details**
- [ ] Title input field visible
- [ ] Character counter shows (0/100)
- [ ] Description textarea visible
- [ ] Character counter shows (0/1000)
- [ ] Budget fields (From/To) with ₹ symbol
- [ ] Validation works (can't exceed limits)
- [ ] "Back" and "Next" buttons visible
- [ ] Clicking Back returns to Step 1
- [ ] Next advances to Step 3

### **Test 3.4: Step 3 - Location & Images**
- [ ] Location dropdown visible
- [ ] Default location is "Mumbai"
- [ ] Indian cities categorized (Major, Other, International)
- [ ] "All India" and "Remote" options present
- [ ] Image upload component visible
- [ ] Can navigate Back and Next

### **Test 3.5: Step 4 - Review & Publish**
- [ ] Shows preview of ad
- [ ] Title, category, description visible
- [ ] Location and budget displayed correctly
- [ ] Category badge shown (cyan)
- [ ] Location badge (purple)
- [ ] Budget in INR format (₹)
- [ ] "Back" and "Publish" buttons visible
- [ ] **Clicking Publish:**
  - [ ] Ad created successfully
  - [ ] Redirected to ad detail page
  - [ ] Success message shown

### **Test 3.6: Input Validation**
- [ ] Try submitting empty title - should fail
- [ ] Try submitting empty description - should fail
- [ ] Try exceeding character limits - should be blocked
- [ ] Error messages shown clearly (red text)

---

## 📋 **4. BROWSE ADS TESTS**

### **Test 4.1: Ads List Page**
- [ ] Navigate to /ads
- [ ] Ad cards displayed in grid
- [ ] Each card shows:
  - [ ] Title
  - [ ] Category badge
  - [ ] Description (truncated)
  - [ ] Location
  - [ ] Budget in ₹
  - [ ] Created date
- [ ] Cards clickable
- [ ] Hover effects work

### **Test 4.2: Ad Detail Page**
- [ ] Click an ad card
- [ ] Redirects to /ads/[id]
- [ ] Full ad details shown
- [ ] Title, category, description
- [ ] Location and budget
- [ ] Status badge (Open/Closed)
- [ ] Owner information

### **Test 4.3: Vendor Features on Ad Detail**
- [ ] **If logged in as VENDOR:**
  - [ ] "Submit Your Quote" section visible
  - [ ] Quote form shows:
    - [ ] Price (₹) input
    - [ ] Delivery days input
    - [ ] Message textarea with char counter
    - [ ] "Submit Quote" button
  - [ ] Can submit quote
  - [ ] Success message shown
  - [ ] Quote appears in list

### **Test 4.4: Customer Features on Ad Detail**
- [ ] **If logged in as CUSTOMER (ad owner):**
  - [ ] "AI Recommended Vendors" section visible
  - [ ] Vendor cards shown (matching category)
  - [ ] Vendor cards show:
    - [ ] Business name
    - [ ] Rating
    - [ ] Specialties
    - [ ] "View Profile" button
  - [ ] "Quotes Received" section visible
  - [ ] Quote cards show:
    - [ ] Vendor name
    - [ ] Price (₹)
    - [ ] Delivery days
    - [ ] Status badge
    - [ ] "Accept" and "Reject" buttons
  - [ ] Can accept a quote
  - [ ] Can reject a quote
  - [ ] Status updates correctly

---

## 👥 **5. VENDOR TESTS**

### **Test 5.1: Vendor Browse**
- [ ] Navigate to /vendor/browse
- [ ] Vendor cards displayed
- [ ] Each card shows:
  - [ ] Business name or name
  - [ ] Avatar/image
  - [ ] Rating (★)
  - [ ] Total reviews
  - [ ] Location
  - [ ] Specialties badges
  - [ ] "View Profile" button
- [ ] Cards clickable

### **Test 5.2: Vendor Profile**
- [ ] Click "View Profile" on a vendor
- [ ] Redirects to /vendor/[id]
- [ ] Full profile shown:
  - [ ] Large avatar
  - [ ] Business name and personal name
  - [ ] Rating and review count
  - [ ] Bio/description
  - [ ] Location badge
  - [ ] Years of experience
  - [ ] Specialties badges
  - [ ] Contact info (email, phone)
  - [ ] Portfolio images (if any)
  - [ ] Customer reviews section

### **Test 5.3: Reviews Display**
- [ ] Reviews shown with:
  - [ ] Customer avatar
  - [ ] Customer name
  - [ ] Star rating (1-5)
  - [ ] Comment text
  - [ ] Date posted

---

## 💬 **6. MESSAGING TESTS**

### **Test 6.1: Messages List**
- [ ] Navigate to /messages
- [ ] Message threads listed
- [ ] Each thread shows:
  - [ ] Other user's name
  - [ ] Last message preview
  - [ ] Timestamp
  - [ ] Unread indicator (if any)
- [ ] Threads clickable

### **Test 6.2: Message Thread**
- [ ] Click a thread
- [ ] Redirects to /messages/[threadId]
- [ ] Conversation history shown
- [ ] Messages aligned (sent vs received)
- [ ] Timestamps visible
- [ ] Message input field at bottom
- [ ] "Send" button present
- [ ] Can type and send message
- [ ] New message appears in thread

---

## 🔔 **7. NOTIFICATIONS TESTS**

### **Test 7.1: Notification Bell**
- [ ] Bell icon visible in header (when logged in)
- [ ] Shows unread count badge
- [ ] Clickable to open dropdown
- [ ] Dropdown shows recent notifications
- [ ] Each notification shows:
  - [ ] Icon/type
  - [ ] Message
  - [ ] Timestamp
  - [ ] Link (if applicable)
- [ ] "Mark all as read" option
- [ ] Clicking notification navigates correctly

---

## 👨‍💼 **8. ADMIN DASHBOARD TESTS**

### **Test 8.1: Admin Access**
- [ ] Login as admin user
- [ ] Navigate to /admin
- [ ] Admin dashboard loads
- [ ] Overview stats shown:
  - [ ] Total users
  - [ ] Total ads
  - [ ] Active vendors
  - [ ] Flagged content

### **Test 8.2: User Management**
- [ ] Navigate to /admin/users
- [ ] User table displayed
- [ ] Shows: name, email, role, verified status
- [ ] Search/filter functionality
- [ ] Can view user details
- [ ] Can verify/unverify users

### **Test 8.3: Ad Moderation**
- [ ] Navigate to /admin/ads
- [ ] All ads listed
- [ ] Can filter by status
- [ ] Can approve/reject ads
- [ ] Can delete inappropriate ads

### **Test 8.4: Flags & Reports**
- [ ] Navigate to /admin/flags
- [ ] Flagged content shown
- [ ] Can review and take action
- [ ] Can dismiss flags

---

## 📱 **9. PWA / MOBILE APP TESTS**

### **Test 9.1: Install Prompt (Desktop Chrome)**
- [ ] Open in Chrome
- [ ] Look for install icon in address bar
- [ ] OR wait for automatic prompt
- [ ] Click "Install"
- [ ] App installs successfully
- [ ] Opens in standalone window
- [ ] No browser UI visible
- [ ] App icon in taskbar/dock

### **Test 9.2: Install on Android**
- [ ] Open on Android Chrome
- [ ] Visit homepage
- [ ] Scroll to "Get the Mobile App" section
- [ ] Tap "Install App Now" button
- [ ] Install prompt appears
- [ ] Tap "Install"
- [ ] App icon appears on home screen
- [ ] Open from home screen
- [ ] Opens in full-screen mode
- [ ] Works like native app

### **Test 9.3: Install on iPhone**
- [ ] Open in Safari on iPhone
- [ ] Tap Share button (□ with ↑)
- [ ] Scroll to "Add to Home Screen"
- [ ] Tap "Add to Home Screen"
- [ ] Edit name if desired
- [ ] Tap "Add"
- [ ] App icon appears on home screen
- [ ] Open from home screen
- [ ] Opens in full-screen mode

### **Test 9.4: Offline Functionality**
- [ ] Install the app
- [ ] Browse some pages
- [ ] Turn off internet/WiFi
- [ ] Try navigating
- [ ] Previously visited pages load
- [ ] Service worker caches work
- [ ] Appropriate offline messages shown

### **Test 9.5: Service Worker**
- [ ] Open DevTools → Application → Service Workers
- [ ] Service worker registered
- [ ] Status: Activated and Running
- [ ] Scope: /
- [ ] Update on reload option visible

### **Test 9.6: Manifest**
- [ ] DevTools → Application → Manifest
- [ ] manifest.json loaded correctly
- [ ] App name: "EasyCustomized"
- [ ] Description visible
- [ ] Theme color: #00FFFF (cyan)
- [ ] Icons: 8 sizes present
- [ ] Start URL: /
- [ ] Display: standalone

---

## 🎨 **10. UI/UX TESTS**

### **Test 10.1: Theme & Colors**
- [ ] Background: Jet black (#0D0D0D)
- [ ] Primary color: Neon cyan (#00FFFF)
- [ ] Accent color: Electric purple (#7A00FF)
- [ ] Text: White/light gray readable
- [ ] Glassmorphic cards visible
- [ ] Neon glow effects on hover

### **Test 10.2: Responsive Design**
- [ ] **Desktop (1920x1080):**
  - [ ] Layout proper
  - [ ] All content visible
  - [ ] Grid layouts work
- [ ] **Tablet (768x1024):**
  - [ ] Layout adapts
  - [ ] Navigation responsive
  - [ ] Content readable
- [ ] **Mobile (375x667):**
  - [ ] Mobile menu works
  - [ ] Content stacks vertically
  - [ ] Touch targets large enough (44px min)
  - [ ] Text readable without zoom
  - [ ] Forms usable

### **Test 10.3: Accessibility**
- [ ] Tab navigation works
- [ ] Focus indicators visible (cyan outline)
- [ ] ARIA labels present
- [ ] Color contrast sufficient
- [ ] Screen reader friendly
- [ ] Reduced motion respected

### **Test 10.4: Performance**
- [ ] Pages load quickly (<3s)
- [ ] Images load progressively
- [ ] No layout shift
- [ ] Smooth animations
- [ ] No console errors
- [ ] No 404s for assets

---

## 🇮🇳 **11. INDIA-SPECIFIC TESTS**

### **Test 11.1: Currency**
- [ ] All prices show ₹ symbol
- [ ] INR formatting: ₹2,50,000 (lakhs)
- [ ] Thousand separators correct
- [ ] Budget inputs accept INR

### **Test 11.2: Locations**
- [ ] Location dropdown categorized:
  - [ ] Special Options (All India, Remote)
  - [ ] Major Indian Cities (Mumbai, Delhi, etc.)
  - [ ] Other Indian Cities (Jaipur, Surat, etc.)
  - [ ] International (Dubai, Singapore, etc.)
- [ ] Default location: Mumbai
- [ ] All Indian cities accessible

### **Test 11.3: Content**
- [ ] Indian personas in testimonials
- [ ] India-relevant categories
- [ ] Indian business examples

---

## 🐛 **12. BUG REGRESSION TESTS**

### **Test 12.1: Validation Error (FIXED)**
- [ ] Post an ad
- [ ] Fill in title and description
- [ ] No "VALIDATION_LIMITS not defined" error
- [ ] Character counters work
- [ ] Validation errors show properly

### **Test 12.2: AI Matching Error (FIXED)**
- [ ] Post ad for "Custom Footwear"
- [ ] View as ad owner
- [ ] Check "AI Recommended Vendors"
- [ ] Should NOT show jewelry vendor
- [ ] Should only show matching category vendors
- [ ] Or show "No matching vendors" message

### **Test 12.3: Next.js 15 Error (FIXED)**
- [ ] App loads without critical errors
- [ ] No "Only have <meta> tags inside <head>" error
- [ ] PWA meta tags work correctly
- [ ] No console errors about head tags

---

## 📊 **TEST RESULTS SUMMARY**

### **Total Tests:** 150+
### **Passed:** _____ / 150
### **Failed:** _____ / 150
### **Skipped:** _____ / 150

---

## 🚨 **CRITICAL ISSUES FOUND**

List any critical bugs here:
1. 
2. 
3. 

---

## ⚠️ **MINOR ISSUES FOUND**

List minor issues here:
1. 
2. 
3. 

---

## ✅ **TESTED BY**

**Name:** ________________  
**Date:** ________________  
**Environment:** ________________  
**Browser:** ________________  
**Device:** ________________  

---

## 📝 **NOTES**

Additional observations:

---

**Testing complete! Review results and fix any issues found.** 🎯



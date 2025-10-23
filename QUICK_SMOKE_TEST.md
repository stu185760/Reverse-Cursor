# 🔥 **QUICK SMOKE TEST - 5 MINUTES**

## **Essential Tests to Verify Everything Works**

---

## 🎯 **TEST URL**
```
http://localhost:3000
```

---

## ✅ **SMOKE TESTS (Do These First!)**

### **1. Homepage Loads** (30 seconds)
```
✓ Open http://localhost:3000
✓ Page loads without errors
✓ See "Your Idea, Their Craft"
✓ See 4 images in grid
✓ Scroll down - see "📱 Get the Mobile App" section ⭐ NEW!
✓ See testimonials
✓ See recent requests
```

### **2. Mobile App Section Visible** ⭐ **NEW!** (30 seconds)
```
✓ Scroll to middle of homepage
✓ See big cyan/purple gradient card
✓ See "📱 Get the Mobile App" heading
✓ See Android/Desktop and iPhone/iPad columns
✓ See "Install App Now" or instructions
✓ See benefits: ⚡📴🏠📱
```

### **3. Authentication Works** (1 minute)
```
✓ Click "Login" in header
✓ Enter demo credentials
✓ See user name in header after login
✓ See "Logout" button
✓ Click logout - works
```

### **4. Post Ad Works** (1 minute)
```
✓ Login as customer
✓ Click "Post Your Request"
✓ Step 1: Select "Jewelry"
✓ Step 2: Enter title & description
✓ Step 3: Keep Mumbai, skip images
✓ Step 4: Click "Publish"
✓ Ad created and shown
```

### **5. Quote System Works** (1 minute)
```
✓ Login as vendor
✓ Go to /ads
✓ Click an ad
✓ See "Submit Your Quote" form
✓ Fill: Price ₹5000, 7 days, message
✓ Submit quote - success!
```

### **6. Vendor Recommendations** (30 seconds)
```
✓ Login as customer who owns an ad
✓ View your own ad
✓ See "AI Recommended Vendors" section
✓ Vendors shown match your ad category
✓ NOT showing wrong category vendors ✅ FIXED
```

### **7. PWA Install** (1 minute)
```
✓ Open in Chrome
✓ Look for install icon in address bar
✓ OR check "Get the Mobile App" section
✓ See install button or instructions
✓ Manifest.json working (DevTools → Application)
✓ Service worker registered
```

### **8. No Critical Errors** (30 seconds)
```
✓ Open DevTools Console (F12)
✓ No red errors
✓ No "VALIDATION_LIMITS" error ✅ FIXED
✓ No Next.js head tag error ✅ FIXED
✓ No 404s for assets
```

---

## ⏱️ **TOTAL TIME: ~5 MINUTES**

---

## 🎯 **PASS CRITERIA**

**All 8 tests pass = Ready to use! ✅**

If any test fails, check:
1. Server running? (`npm start`)
2. Console errors?
3. MANUAL_TEST_CHECKLIST.md for detailed steps

---

## 🚀 **QUICK COMMANDS**

### **Start Server:**
```powershell
npm start
```

### **Open in Browser:**
```
http://localhost:3000
```

### **Check Console:**
```
F12 → Console tab
```

### **Check Service Worker:**
```
F12 → Application → Service Workers
```

---

## ✅ **DONE!**

If all tests pass, your app is working perfectly! 🎉

**Next:** Try on phone (see PHONE_ACCESS_GUIDE.md)



# 🧪 **QUICK PWA TEST SCRIPT**

## **5-Minute Test Guide**

---

## ✅ **PRE-TEST CHECKLIST**

Before testing, verify these files exist:

```bash
# Check service worker
dir public\sw.js
# Should show: sw.js (12KB+)

# Check manifest
dir public\manifest.json
# Should show: manifest.json (~2KB)

# Check icons
dir public\icons\*.png
# Should show: 8 icon files
```

---

## 🚀 **TEST 1: LOCAL INSTALLATION (2 minutes)**

### **Step 1: Start Production Server**
```bash
npm start
```
Expected output:
```
> my-v0-project@0.1.0 start
> next start
▲ Next.js 15.2.4
- Local:        http://localhost:3000
Ready in X ms
```

### **Step 2: Open in Chrome**
```
URL: http://localhost:3000
```

### **Step 3: Check Console (F12)**
```javascript
// Should see:
"PWA: Service worker registered"
// No errors
```

### **Step 4: Check Application Tab**
```
F12 → Application tab

Service Workers:
✅ Status: activated
✅ URL: /sw.js

Manifest:
✅ Name: EasyCustomized - India's Reverse Marketplace
✅ Theme: #00FFFF
✅ Icons: 8 files
```

### **Step 5: Wait for Install Prompt**
```
After 30 seconds:
✅ Banner appears at bottom-right
✅ Shows "Install EasyCustomized"
✅ Has "Install" button
```

### **Step 6: Install the App**
```
1. Click "Install" button
2. Confirmation dialog appears
3. Click "Install" in dialog
4. App opens in new window
5. No browser UI visible
```

### **Test 1 Result:**
- [ ] Service worker registered
- [ ] Manifest loads correctly
- [ ] Install prompt appears
- [ ] Can install app
- [ ] Opens in standalone mode

---

## 📱 **TEST 2: OFFLINE MODE (1 minute)**

### **Step 1: Browse While Online**
```
1. Visit homepage
2. Click "Browse Requests"
3. Click a few ads
4. Open "Post Ad" page
```

### **Step 2: Go Offline**
```
Windows: Open Settings → Network → Turn off WiFi
OR
Chrome DevTools: F12 → Network tab → Check "Offline"
```

### **Step 3: Navigate**
```
1. Click browser back button
2. Navigate to previously visited pages
3. Images should load
4. Styles should work
```

### **Test 2 Result:**
- [ ] Previously visited pages load offline
- [ ] Images are cached
- [ ] Styles work
- [ ] Navigation works

---

## 🎨 **TEST 3: VISUAL INSPECTION (1 minute)**

### **Check Theme:**
```
✅ Background: Jet black (#0D0D0D)
✅ Primary color: Neon cyan (#00FFFF)
✅ Accent: Purple (#7A00FF)
✅ Text: White/gray
```

### **Check Install Prompt:**
```
✅ Shows Smartphone icon
✅ Cyan/blue theme
✅ "Install" button is cyan
✅ "Not now" button is gray
✅ X button works
✅ Glassmorphic card style
```

### **Check Standalone Mode:**
```
✅ No address bar
✅ No browser buttons
✅ Full-screen app
✅ Status bar color matches
```

### **Test 3 Result:**
- [ ] Theme matches design
- [ ] Install prompt looks good
- [ ] Standalone mode works
- [ ] No visual bugs

---

## 🌐 **TEST 4: BROWSER COMPATIBILITY (1 minute)**

### **Chrome/Edge:**
```
1. Open http://localhost:3000
2. Wait 30 seconds
3. Install prompt appears
4. Can install
Result: ✅ PASS
```

### **Firefox:**
```
1. Open http://localhost:3000
2. F12 → Application tab
3. Service worker registered
Result: ✅ PASS (limited install support is expected)
```

### **Test 4 Result:**
- [ ] Works in Chrome
- [ ] Works in Edge
- [ ] Service worker works in Firefox

---

## 🔧 **TEST 5: LIGHTHOUSE AUDIT (Optional)**

### **Run Audit:**
```
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Click "Generate report"
```

### **Expected Scores:**
```
✅ Fast and reliable: 90+
✅ Installable: 90+
✅ PWA Optimized: 90+
✅ Overall: 90-100
```

### **Test 5 Result:**
- [ ] PWA score 90+
- [ ] No critical issues
- [ ] All criteria pass

---

## ❌ **TROUBLESHOOTING**

### **Problem: Install prompt doesn't appear**
**Solutions:**
```bash
# 1. Check if already installed
# Look for address bar - if missing, it's installed!

# 2. Clear localStorage
# F12 → Application → Local Storage → Clear All

# 3. Unregister service worker
# F12 → Application → Service Workers → Unregister

# 4. Hard refresh
# Ctrl + Shift + R

# 5. Try incognito
# Ctrl + Shift + N
```

### **Problem: Service worker not registering**
**Solutions:**
```bash
# 1. Check console for errors
# F12 → Console tab

# 2. Verify file exists
dir public\sw.js

# 3. Check HTTPS (or localhost)
# PWA requires secure context

# 4. Rebuild
npm run build
npm start
```

### **Problem: Offline doesn't work**
**Solutions:**
```bash
# 1. Visit pages while online first
# Service worker caches on first visit

# 2. Check service worker status
# F12 → Application → Service Workers
# Should show "activated and running"

# 3. Check cache
# F12 → Application → Cache Storage
# Should see multiple caches

# 4. Wait for cache to populate
# Takes a few seconds after page load
```

---

## ✅ **FINAL CHECKLIST**

### **Core Functionality:**
- [ ] App builds successfully (`npm run build`)
- [ ] Production server starts (`npm start`)
- [ ] Homepage loads at localhost:3000
- [ ] No console errors

### **PWA Features:**
- [ ] Service worker registered
- [ ] Manifest loads correctly
- [ ] All 8 icons exist
- [ ] Install prompt appears (30s delay)
- [ ] Can install app
- [ ] Opens in standalone mode

### **Offline:**
- [ ] Pages work offline after visiting
- [ ] Images cached
- [ ] Styles work offline
- [ ] Navigation works offline

### **Visual:**
- [ ] Black theme correct
- [ ] Cyan accent color correct
- [ ] Install prompt styled properly
- [ ] No UI bugs

### **Cross-Browser:**
- [ ] Works in Chrome
- [ ] Works in Edge
- [ ] Service worker works in Firefox

---

## 🎉 **SUCCESS CRITERIA**

**If all these pass, your PWA is ready:**

✅ Builds without errors
✅ Service worker registers
✅ Install prompt works
✅ Can install app
✅ Standalone mode works
✅ Offline functionality works
✅ Visual theme correct

**Result:** 🚀 **READY FOR PRODUCTION!**

---

## 📝 **REPORT TEMPLATE**

```
Date: ___________
Tester: ___________

TEST 1 - LOCAL INSTALL:     [ ] PASS  [ ] FAIL
TEST 2 - OFFLINE MODE:       [ ] PASS  [ ] FAIL
TEST 3 - VISUAL:            [ ] PASS  [ ] FAIL
TEST 4 - COMPATIBILITY:     [ ] PASS  [ ] FAIL
TEST 5 - LIGHTHOUSE:        [ ] PASS  [ ] FAIL  [ ] SKIP

Issues Found: _______________________________________________
_____________________________________________________________

Overall Status:  [ ] READY  [ ] NEEDS FIX

Notes: ______________________________________________________
_____________________________________________________________
```

---

## 🚀 **READY TO TEST!**

**Start here:**
```bash
# 1. Build
npm run build

# 2. Start
npm start

# 3. Open
http://localhost:3000

# 4. Wait 30 seconds

# 5. Click "Install"

# 6. Enjoy your PWA! 🎉
```

**Time to complete:** 5-10 minutes  
**Difficulty:** Easy  
**Result:** Professional PWA ready for users! 📱✨


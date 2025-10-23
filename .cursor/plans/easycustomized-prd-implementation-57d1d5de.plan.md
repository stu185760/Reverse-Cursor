<!-- 57d1d5de-803b-46f7-a8d7-30e28af62104 41c983d2-ee2e-495b-9638-a444bca6993b -->
# EasyCustomized PRD Implementation Plan

## Phase 1: Design System Transformation

### 1.1 Update Global Theme to Black + Neon

**Files:** `app/globals.css`

- Replace current color scheme with PRD specifications:
- Background: Jet Black `#0D0D0D`
- Primary: Neon Blue `#00FFFF`
- Accent: Electric Purple `#7A00FF`
- Add glassmorphic card styles with shadow depth
- Implement premium black aesthetic with gradient overlays

### 1.2 Update All Components for New Theme

**Files:** `components/hero.tsx`, `components/site-header.tsx`, `components/ad-card.tsx`

- Transform hero section with black gradient and neon accents
- Update header to use black background with cyan/purple highlights
- Add Framer Motion animations to key interactions
- Ensure all buttons use neon color scheme

## Phase 2: India-Specific Localization

### 2.1 Add INR Currency Support

**Files:** `lib/local-db.ts`, `lib/utils.ts`

- Create `formatCurrency()` helper to display ₹ symbol
- Update all pricing fields to show INR format (₹2,500)
- Modify Ad and Quote interfaces to use `price_inr` consistently

### 2.2 Update Location System for India

**Files:** `lib/locations.ts`, `components/location-select.tsx`

- Replace current locations with major Indian cities (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, etc.)
- Keep "Remote" and "All India" options
- Update all location dropdowns throughout the app

## Phase 3: Structured Vendor Quote System

### 3.1 Create Quote Database Schema

**Files:** `lib/local-db.ts`, `scripts/006_create_quotes.sql`

- Add `Quote` interface with fields:
- `id`, `ad_id`, `vendor_id`
- `price_inr` (number)
- `delivery_days` (number)
- `message` (detailed offer description)
- `status`: "pending" | "accepted" | "rejected"
- `created_at`, `updated_at`
- Add functions: `createQuote()`, `listQuotesForAd()`, `updateQuoteStatus()`

### 3.2 Build Quote UI Components

**Files:** `components/quote-card.tsx`, `components/quote-form.tsx`, `components/quote-list.tsx`

- Quote card showing: vendor info, price (₹), delivery time, message
- Quote form for vendors: price input (INR), delivery days selector, message textarea
- Quote list for customers: compare multiple quotes side-by-side
- Accept/Reject buttons with confirmation dialogs

### 3.3 Update Ad Detail Page

**Files:** `app/ads/[id]/page.tsx`

- For vendors: Show "Submit Quote" button instead of generic respond
- For customers: Display "Quotes Received" section with all vendor offers
- Add quote status indicators (pending/accepted/rejected)

## Phase 4: Vendor Profile & Portfolio System

### 4.1 Extend Vendor Data Model

**Files:** `lib/local-db.ts`, `scripts/007_enhance_profiles.sql`

- Add to User interface for vendors:
- `rating` (0-5 stars)
- `total_reviews` (count)
- `portfolio_images` (string[])
- `specialties` (string[])
- `phone_number`
- `business_name`
- `years_experience`

### 4.2 Create Vendor Profile Pages

**Files:** `app/vendor/[id]/page.tsx`, `components/vendor-profile-card.tsx`

- Display vendor rating, reviews, portfolio gallery
- Show completed projects count
- List specialties/categories
- Contact information section
- "Send Quote" CTA when viewing from ad context

### 4.3 Add Rating & Review System

**Files:** `lib/local-db.ts`, `components/review-form.tsx`, `components/review-list.tsx`

- Create `Review` interface: `id`, `vendor_id`, `customer_id`, `rating`, `comment`, `created_at`
- Add functions: `createReview()`, `listReviewsForVendor()`, `calculateVendorRating()`
- UI components for submitting and displaying reviews

## Phase 5: Admin Dashboard

### 5.1 Create Admin Layout & Navigation

**Files:** `app/admin/layout.tsx`, `app/admin/page.tsx`, `components/admin-sidebar.tsx`

- Protected admin routes (check role === "admin")
- Sidebar navigation: Dashboard, Users, Ads, Quotes, Messages, Reports
- Dashboard overview: Total users, active ads, pending quotes, flags

### 5.2 Admin User Management

**Files:** `app/admin/users/page.tsx`, `components/admin-user-table.tsx`

- List all users with filters (role, verified status)
- Actions: View details, suspend/activate, change role
- Search by name/email

### 5.3 Admin Content Moderation

**Files:** `app/admin/ads/page.tsx`, `app/admin/quotes/page.tsx`

- View all ads with approve/reject actions
- Flag management system
- Bulk actions for content moderation

### 5.4 Admin Message Monitoring

**Files:** `app/admin/messages/page.tsx`

- Read-only view of all conversations
- Flag inappropriate content
- Dispute resolution interface

## Phase 6: Customer Dashboard

### 6.1 Create Customer Dashboard

**Files:** `app/dashboard/customer/page.tsx`, `components/customer-dashboard.tsx`

- Tabs: My Ads, Quotes Received, Active Orders, Messages, Profile
- Stats cards: Total ads posted, quotes received, active conversations
- Recent activity timeline

### 6.2 Quote Comparison View

**Files:** `components/quote-comparison.tsx`

- Side-by-side comparison table for quotes on same ad
- Sort by price, delivery time, vendor rating
- Accept quote button with order confirmation flow

## Phase 7: Vendor Dashboard & Wallet

### 7.1 Create Vendor Dashboard

**Files:** `app/dashboard/vendor/page.tsx`, `components/vendor-dashboard.tsx`

- Tabs: Browse Ads, My Quotes, Active Orders, Wallet, Profile, Portfolio
- Stats cards: Quotes sent, acceptance rate, earnings (placeholder)
- Lead recommendations based on category match

### 7.2 Vendor Wallet UI (Placeholder)

**Files:** `app/dashboard/vendor/wallet/page.tsx`, `components/vendor-wallet.tsx`

- Display balance: ₹0 (placeholder for future payment integration)
- Transaction history table (empty state with coming soon message)
- Withdrawal button (disabled with tooltip: "Payment integration coming soon")

## Phase 8: Basic AI Matching System

### 8.1 Keyword Matching Engine

**Files:** `lib/ai-matching.ts`

- Create `matchVendorsToAd(ad_id)` function:
- Extract keywords from ad title + description
- Match against vendor specialties, past categories
- Return sorted vendor list by relevance score
- Simple scoring: exact category match (5 pts), keyword overlap (1 pt each)

### 8.2 Vendor Recommendations UI

**Files:** `components/recommended-vendors.tsx`, update `app/ads/[id]/page.tsx`

- Show "Recommended Vendors" section on ad detail page
- Display top 3-5 vendors with match score indicator
- "Invite to Quote" button to notify vendors

### 8.3 Smart Ad Categorization

**Files:** `lib/ai-matching.ts`, update `components/post-ad-wizard.tsx`

- Auto-suggest category based on title/description keywords
- Show confidence level: "We think this is 'Jewelry' - 85% confident"
- Customer can override suggestion

## Phase 9: Enhanced Messaging & Notifications

### 9.1 Improve Message Thread UI

**Files:** `app/messages/[threadId]/page.tsx`, `components/chat-thread.tsx`

- Add context banner showing related ad + quote details
- File attachment support for design previews
- Better timestamp formatting with "Read" indicators

### 9.2 Notification System (UI Only)

**Files:** `components/notification-bell.tsx`, `components/notification-list.tsx`

- Bell icon in header with unread count badge
- Dropdown showing recent notifications:
- "New quote received on [Ad Title]"
- "Vendor responded to your message"
- "Your quote was accepted!"
- Store notifications in local-db (no real-time for MVP)

## Phase 10: Home Page Enhancements

### 10.1 Update Hero with PRD Copy

**Files:** `components/hero.tsx`

- Update headline and subtext to match PRD persona examples
- Showcase India-specific use cases (corporate gifting, wedding customization)
- Add trust indicators: "10,000+ Active Users" (placeholder metrics)

### 10.2 Add Testimonials Section

**Files:** `components/testimonials-section.tsx`, add to `app/page.tsx`

- Create testimonial component with customer photos + quotes
- Use Indian names matching PRD personas (Riya Sharma, Arjun Mehta)
- Carousel/grid layout with star ratings

### 10.3 Trending Categories Section

**Files:** `components/trending-categories.tsx`

- Update with India-relevant examples
- Add icons for each category (Clothing, Jewelry, Gifting, etc.)
- Click to filter ads by category

## Phase 11: Polish & Refinements

### 11.1 Add Loading States

- Skeleton loaders for all data fetching
- Smooth transitions between states
- Loading spinners on form submissions

### 11.2 Responsive Design Review

- Test all pages on mobile (320px to 768px)
- Ensure touch targets are 44px minimum
- Fix any overflow or layout issues

### 11.3 Error Handling

- Add proper error boundaries
- User-friendly error messages
- Retry mechanisms for failed operations

### 11.4 Accessibility Audit

- Add proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility

## Phase 12: Database Migration (Supabase)

### 12.1 Create New SQL Scripts

- Write scripts for quotes table (006)
- Write scripts for reviews table (007)
- Write scripts for notifications table (008)

### 12.2 Update Supabase Integration

**Files:** `lib/supabase-db.ts`

- Add functions mirroring local-db but using Supabase client
- Implement RLS policies for new tables
- Test all CRUD operations

## Summary

This plan transforms your reverse marketplace into a production-ready platform matching the PRD requirements:

- ✅ Premium black + neon theme
- ✅ India-specific (INR, locations)
- ✅ Structured vendor quotes with accept/reject
- ✅ Complete admin dashboard
- ✅ Vendor profiles with ratings
- ✅ Customer & vendor dashboards
- ✅ Basic AI matching (keyword-based)
- ✅ Enhanced messaging
- ✅ Professional UI/UX

Payment integration is deferred as requested. The platform will be mobile-responsive, accessible, and ready for scaling.

### To-dos

- [ ] Transform design system to black theme with neon blue/purple accents
- [ ] Add INR currency formatting and Indian location system
- [ ] Build structured vendor quote system with accept/reject flow
- [ ] Create vendor profile pages with ratings and portfolio
- [ ] Build complete admin dashboard with moderation tools
- [ ] Create customer dashboard with quote comparison
- [ ] Build vendor dashboard with wallet placeholder
- [ ] Implement keyword-based vendor matching system
- [ ] Enhance messaging UI with notifications
- [ ] Update home page with testimonials and trending categories
- [ ] Add loading states, responsive fixes, and accessibility improvements
- [ ] Create Supabase migrations for new features
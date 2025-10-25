-- ============================================
-- Reverse Marketplace Database Schema
-- Version: 1.0
-- For: EasyCustomized Platform
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'vendor', 'admin')),
  avatar_url TEXT,
  location TEXT,
  bio TEXT,
  
  -- Vendor specific fields
  business_name TEXT,
  business_category TEXT,
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ADS TABLE (Customer Requirements)
-- ============================================
CREATE TABLE IF NOT EXISTS public.ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  
  -- Budget & Timeline
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  currency TEXT DEFAULT 'INR',
  timeline TEXT,
  preferred_date TIMESTAMPTZ,
  
  -- Location
  location TEXT NOT NULL,
  address TEXT,
  
  -- Media (array of image URLs from Supabase Storage)
  images TEXT[],
  
  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'closed', 'fulfilled')),
  
  -- Contact
  contact_preferences JSONB DEFAULT '{"phone": true, "email": true, "message": true}'::jsonb,
  
  -- Matching
  matched_vendors UUID[],
  
  -- Stats
  views_count INTEGER DEFAULT 0,
  quotes_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- ============================================
-- CLASSIFIEDS TABLE (Vendor Products/Services)
-- ============================================
CREATE TABLE IF NOT EXISTS public.classifieds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  
  -- Pricing
  price DECIMAL(10,2),
  price_type TEXT CHECK (price_type IN ('fixed', 'negotiable', 'starting_from', 'contact')),
  currency TEXT DEFAULT 'INR',
  
  -- Location
  location TEXT NOT NULL,
  
  -- Media (array of image URLs from Supabase Storage)
  images TEXT[],
  
  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'sold', 'inactive')),
  
  -- Features
  features TEXT[],
  tags TEXT[],
  
  -- Stats
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured_until TIMESTAMPTZ
);

-- ============================================
-- QUOTES TABLE (Vendor Responses to Ads)
-- ============================================
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_id UUID REFERENCES public.ads(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Quote Details
  message TEXT NOT NULL,
  estimated_price DECIMAL(10,2),
  estimated_timeline TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  
  -- Response
  customer_response TEXT,
  response_date TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(ad_id, vendor_id)
);

-- ============================================
-- MESSAGES TABLE (Conversations)
-- ============================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Participants
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Message Content
  content TEXT NOT NULL,
  
  -- Context (optional references)
  ad_id UUID REFERENCES public.ads(id) ON DELETE SET NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  classified_id UUID REFERENCES public.classifieds(id) ON DELETE SET NULL,
  
  -- Status
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE (Vendor Ratings)
-- ============================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Reviewer & Reviewed
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Context
  ad_id UUID REFERENCES public.ads(id) ON DELETE SET NULL,
  
  -- Review Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  
  -- Response
  vendor_response TEXT,
  responded_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(reviewer_id, vendor_id, ad_id)
);

-- ============================================
-- INDEXES for Performance
-- ============================================

-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Ads
CREATE INDEX IF NOT EXISTS idx_ads_user_id ON public.ads(user_id);
CREATE INDEX IF NOT EXISTS idx_ads_category ON public.ads(category);
CREATE INDEX IF NOT EXISTS idx_ads_location ON public.ads(location);
CREATE INDEX IF NOT EXISTS idx_ads_status ON public.ads(status);
CREATE INDEX IF NOT EXISTS idx_ads_created_at ON public.ads(created_at DESC);

-- Classifieds
CREATE INDEX IF NOT EXISTS idx_classifieds_user_id ON public.classifieds(user_id);
CREATE INDEX IF NOT EXISTS idx_classifieds_category ON public.classifieds(category);
CREATE INDEX IF NOT EXISTS idx_classifieds_location ON public.classifieds(location);
CREATE INDEX IF NOT EXISTS idx_classifieds_status ON public.classifieds(status);
CREATE INDEX IF NOT EXISTS idx_classifieds_created_at ON public.classifieds(created_at DESC);

-- Quotes
CREATE INDEX IF NOT EXISTS idx_quotes_ad_id ON public.quotes(ad_id);
CREATE INDEX IF NOT EXISTS idx_quotes_vendor_id ON public.quotes(vendor_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes(created_at DESC);

-- Messages
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON public.messages(read) WHERE read = FALSE;

-- Reviews
CREATE INDEX IF NOT EXISTS idx_reviews_vendor_id ON public.reviews(vendor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON public.reviews(reviewer_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classifieds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Anyone can view public profile info
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- ADS POLICIES
-- ============================================

-- Anyone can view active ads
CREATE POLICY "Active ads are viewable by everyone"
  ON public.ads FOR SELECT
  USING (status = 'active' OR user_id = auth.uid());

-- Authenticated users can create ads
CREATE POLICY "Authenticated users can create ads"
  ON public.ads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own ads
CREATE POLICY "Users can update own ads"
  ON public.ads FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own ads
CREATE POLICY "Users can delete own ads"
  ON public.ads FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- CLASSIFIEDS POLICIES
-- ============================================

-- Anyone can view active classifieds
CREATE POLICY "Active classifieds are viewable by everyone"
  ON public.classifieds FOR SELECT
  USING (status = 'active' OR user_id = auth.uid());

-- Authenticated users can create classifieds
CREATE POLICY "Authenticated users can create classifieds"
  ON public.classifieds FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own classifieds
CREATE POLICY "Users can update own classifieds"
  ON public.classifieds FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own classifieds
CREATE POLICY "Users can delete own classifieds"
  ON public.classifieds FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- QUOTES POLICIES
-- ============================================

-- Users can view quotes for their ads or quotes they created
CREATE POLICY "Users can view relevant quotes"
  ON public.quotes FOR SELECT
  USING (
    auth.uid() = vendor_id OR 
    auth.uid() IN (SELECT user_id FROM public.ads WHERE id = quotes.ad_id)
  );

-- Vendors can create quotes
CREATE POLICY "Vendors can create quotes"
  ON public.quotes FOR INSERT
  WITH CHECK (auth.uid() = vendor_id);

-- Vendors can update their own quotes
CREATE POLICY "Vendors can update own quotes"
  ON public.quotes FOR UPDATE
  USING (auth.uid() = vendor_id);

-- Ad owners can update quote status (accept/reject)
CREATE POLICY "Ad owners can update quote status"
  ON public.quotes FOR UPDATE
  USING (
    auth.uid() IN (SELECT user_id FROM public.ads WHERE id = quotes.ad_id)
  );

-- ============================================
-- MESSAGES POLICIES
-- ============================================

-- Users can view messages they sent or received
CREATE POLICY "Users can view their messages"
  ON public.messages FOR SELECT
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

-- Authenticated users can send messages
CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Users can update messages they received (mark as read)
CREATE POLICY "Users can mark received messages as read"
  ON public.messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- ============================================
-- REVIEWS POLICIES
-- ============================================

-- Anyone can view reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

-- Customers can create reviews
CREATE POLICY "Customers can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Vendors can update their reviews (add response)
CREATE POLICY "Vendors can respond to reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = vendor_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ads_updated_at BEFORE UPDATE ON public.ads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classifieds_updated_at BEFORE UPDATE ON public.classifieds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update vendor rating when review is created
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET 
    rating = (
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM public.reviews
      WHERE vendor_id = NEW.vendor_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE vendor_id = NEW.vendor_id
    )
  WHERE id = NEW.vendor_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings
CREATE TRIGGER on_review_created
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

CREATE TRIGGER on_review_updated
  AFTER UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE 'Tables: profiles, ads, classifieds, quotes, messages, reviews';
  RAISE NOTICE 'RLS policies: Enabled on all tables';
  RAISE NOTICE 'Indexes: Created for performance';
  RAISE NOTICE 'Triggers: Auto-update timestamps and profiles';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Set up Supabase Storage buckets for images';
  RAISE NOTICE '2. Configure authentication redirect URLs';
  RAISE NOTICE '3. Test by creating a user and posting an ad!';
END $$;


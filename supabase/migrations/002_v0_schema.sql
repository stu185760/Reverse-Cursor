-- ============================================
-- V0 SCHEMA: Clean slate for v0 code
-- ============================================

-- Drop existing tables
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.quotes CASCADE;
DROP TABLE IF EXISTS public.ad_images CASCADE;
DROP TABLE IF EXISTS public.ads CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_vendor_rating() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (v0 structure)
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'vendor', 'admin')),
  profile_photo_url TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ADS TABLE (v0 structure)
-- ============================================
CREATE TABLE public.ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  budget_min DECIMAL(10,2) NOT NULL,
  budget_max DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'in_progress')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- AD_IMAGES TABLE (v0 structure - separate table!)
-- ============================================
CREATE TABLE public.ad_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_id UUID REFERENCES public.ads(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- QUOTES TABLE (v0 structure)
-- ============================================
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_id UUID REFERENCES public.ads(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  delivery_days INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(ad_id, vendor_id)
);

-- ============================================
-- MESSAGES TABLE (v0 structure - recipient_id!)
-- ============================================
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE (v0 structure)
-- ============================================
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_ads_user_id ON public.ads(user_id);
CREATE INDEX idx_ads_category ON public.ads(category);
CREATE INDEX idx_ads_location ON public.ads(location);
CREATE INDEX idx_ads_status ON public.ads(status);
CREATE INDEX idx_ads_created_at ON public.ads(created_at DESC);
CREATE INDEX idx_ad_images_ad_id ON public.ad_images(ad_id);
CREATE INDEX idx_quotes_ad_id ON public.quotes(ad_id);
CREATE INDEX idx_quotes_vendor_id ON public.quotes(vendor_id);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_messages_is_read ON public.messages(is_read) WHERE is_read = FALSE;
CREATE INDEX idx_reviews_quote_id ON public.reviews(quote_id);

-- ============================================
-- ENABLE RLS
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PROFILES
-- ============================================
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- RLS POLICIES - ADS
-- ============================================
CREATE POLICY "Open ads are viewable by everyone"
  ON public.ads FOR SELECT USING (status = 'open' OR user_id = auth.uid());

CREATE POLICY "Authenticated users can create ads"
  ON public.ads FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ads"
  ON public.ads FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ads"
  ON public.ads FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - AD_IMAGES
-- ============================================
CREATE POLICY "Ad images are viewable by everyone"
  ON public.ad_images FOR SELECT USING (true);

CREATE POLICY "Users can add images to their own ads"
  ON public.ad_images FOR INSERT 
  WITH CHECK (
    auth.uid() IN (SELECT user_id FROM public.ads WHERE id = ad_images.ad_id)
  );

CREATE POLICY "Users can delete images from their own ads"
  ON public.ad_images FOR DELETE 
  USING (
    auth.uid() IN (SELECT user_id FROM public.ads WHERE id = ad_images.ad_id)
  );

-- ============================================
-- RLS POLICIES - QUOTES
-- ============================================
CREATE POLICY "Users can view relevant quotes"
  ON public.quotes FOR SELECT
  USING (
    auth.uid() = vendor_id OR 
    auth.uid() IN (SELECT user_id FROM public.ads WHERE id = quotes.ad_id)
  );

CREATE POLICY "Vendors can create quotes"
  ON public.quotes FOR INSERT WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update own quotes"
  ON public.quotes FOR UPDATE USING (auth.uid() = vendor_id);

CREATE POLICY "Ad owners can update quote status"
  ON public.quotes FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM public.ads WHERE id = quotes.ad_id));

-- ============================================
-- RLS POLICIES - MESSAGES
-- ============================================
CREATE POLICY "Users can view their messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can mark received messages as read"
  ON public.messages FOR UPDATE
  USING (auth.uid() = recipient_id);

-- ============================================
-- RLS POLICIES - REVIEWS
-- ============================================
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Users can create reviews"
  ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- ============================================
-- FUNCTIONS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET 
    rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM public.reviews WHERE reviewee_id = NEW.reviewee_id),
    total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE reviewee_id = NEW.reviewee_id)
  WHERE id = NEW.reviewee_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ads_updated_at BEFORE UPDATE ON public.ads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_review_created
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

-- ============================================
-- STORAGE BUCKETS (run these manually in Supabase dashboard)
-- ============================================
-- 1. Go to Storage in Supabase dashboard
-- 2. Create bucket: "ad-images" (public)
-- 3. Create bucket: "profile-photos" (public)

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '🎉🎉🎉 V0 SCHEMA CREATED! 🎉🎉🎉';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Tables: profiles, ads, ad_images, quotes, messages, reviews';
  RAISE NOTICE '✅ All indexes created';
  RAISE NOTICE '✅ Row Level Security enabled';
  RAISE NOTICE '✅ All policies applied';
  RAISE NOTICE '✅ All triggers active';
  RAISE NOTICE '';
  RAISE NOTICE 'IMPORTANT: Create storage buckets manually:';
  RAISE NOTICE '1. Go to Supabase → Storage';
  RAISE NOTICE '2. Create "ad-images" bucket (public)';
  RAISE NOTICE '3. Create "profile-photos" bucket (public)';
  RAISE NOTICE '';
END $$;


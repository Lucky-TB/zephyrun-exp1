-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types
CREATE TYPE terrain_type AS ENUM ('pavement', 'trail', 'gravel', 'mixed');
CREATE TYPE experience_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE training_goal_type AS ENUM ('distance', 'speed', 'endurance', 'recovery');
CREATE TYPE condition_type AS ENUM ('weather', 'maintenance', 'hazard');
CREATE TYPE condition_severity AS ENUM ('low', 'medium', 'high');

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  preferred_terrain terrain_type[] DEFAULT '{}',
  experience_level experience_level DEFAULT 'beginner',
  physical_limitations TEXT[] DEFAULT '{}',
  training_goals JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create routes table
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  distance FLOAT NOT NULL,
  elevation FLOAT NOT NULL,
  terrain terrain_type[] NOT NULL,
  difficulty FLOAT NOT NULL CHECK (difficulty >= 0 AND difficulty <= 10),
  coordinates JSONB NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT true,
  ai_analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create route ratings table
CREATE TABLE route_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(route_id, user_id)
);

-- Create trail conditions table
CREATE TABLE trail_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  reported_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  condition_type condition_type NOT NULL,
  description TEXT NOT NULL,
  severity condition_severity NOT NULL,
  location JSONB,
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community challenges table
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  terrain_type terrain_type[],
  min_distance FLOAT,
  max_distance FLOAT,
  min_elevation FLOAT,
  max_elevation FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge participants table
CREATE TABLE challenge_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(challenge_id, user_id)
);

-- Create running groups table
CREATE TABLE running_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  location JSONB,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group members table
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES running_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Create user runs table (for tracking performance)
CREATE TABLE user_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  route_id UUID REFERENCES routes(id) ON DELETE SET NULL,
  distance FLOAT NOT NULL,
  duration INTEGER NOT NULL, -- in seconds
  elevation_gain FLOAT,
  elevation_loss FLOAT,
  avg_pace FLOAT, -- in seconds per kilometer
  terrain_types terrain_type[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE trail_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE running_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_runs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Routes policies
CREATE POLICY "Public routes are viewable by everyone" 
  ON routes FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own routes" 
  ON routes FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create routes" 
  ON routes FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own routes" 
  ON routes FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own routes" 
  ON routes FOR DELETE USING (auth.uid() = created_by);

-- Route ratings policies
CREATE POLICY "Route ratings are viewable by everyone" 
  ON route_ratings FOR SELECT USING (true);

CREATE POLICY "Users can create ratings" 
  ON route_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" 
  ON route_ratings FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings" 
  ON route_ratings FOR DELETE USING (auth.uid() = user_id);

-- Trail conditions policies
CREATE POLICY "Trail conditions are viewable by everyone" 
  ON trail_conditions FOR SELECT USING (true);

CREATE POLICY "Users can report conditions" 
  ON trail_conditions FOR INSERT WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can update their own reports" 
  ON trail_conditions FOR UPDATE USING (auth.uid() = reported_by);

-- Challenges policies
CREATE POLICY "Challenges are viewable by everyone" 
  ON challenges FOR SELECT USING (true);

CREATE POLICY "Users can create challenges" 
  ON challenges FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Challenge participants policies
CREATE POLICY "Challenge participants are viewable by everyone" 
  ON challenge_participants FOR SELECT USING (true);

CREATE POLICY "Users can join challenges" 
  ON challenge_participants FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation" 
  ON challenge_participants FOR UPDATE USING (auth.uid() = user_id);

-- Running groups policies
CREATE POLICY "Public groups are viewable by everyone" 
  ON running_groups FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own groups" 
  ON running_groups FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create groups" 
  ON running_groups FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Group members policies
CREATE POLICY "Group members are viewable by everyone" 
  ON group_members FOR SELECT USING (true);

CREATE POLICY "Users can join groups" 
  ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User runs policies
CREATE POLICY "Users can view their own runs" 
  ON user_runs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create runs" 
  ON user_runs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own runs" 
  ON user_runs FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own runs" 
  ON user_runs FOR DELETE USING (auth.uid() = user_id);

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 
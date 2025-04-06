# Supabase Database Setup for Zephyrun

This guide will help you set up the Supabase database for the Zephyrun app.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com) if you don't have one)
2. A new Supabase project created

## Setup Steps

### 1. Create a New Supabase Project

1. Log in to your Supabase account
2. Click "New Project"
3. Fill in the project details:
   - Name: `zephyrun` (or your preferred name)
   - Database Password: Create a secure password
   - Region: Choose the region closest to your target users
4. Click "Create new project"

### 2. Enable Required Extensions

In the Supabase SQL Editor, run the following SQL to enable the required extensions:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
```

### 3. Create Database Schema

1. In the Supabase dashboard, go to the SQL Editor
2. Create a new query
3. Copy and paste the entire contents of the `supabase/schema.sql` file from this project
4. Run the query to create all tables, types, and policies

### 4. Configure Authentication

1. In the Supabase dashboard, go to Authentication > Settings
2. Configure the following settings:
   - Site URL: Set to your app's URL (for development, use `http://localhost:19006`)
   - Redirect URLs: Add `http://localhost:19006/*` for development
   - Enable Email Auth: Turn on
   - Enable Phone Auth: Turn off (not used in this app)
   - Enable OAuth: Turn off (not used in this app)

### 5. Set Up Environment Variables

1. In the Supabase dashboard, go to Project Settings > API
2. Copy the following values:
   - Project URL
   - anon/public key
3. Create a `.env` file in the root of your project with the following content:

```
EXPO_PUBLIC_SUPABASE_URL=your_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder values with your actual Supabase URL and anon key.

### 6. Test the Connection

1. Start your app with `npx expo start`
2. Check the console logs to verify that the Supabase connection is successful
3. Try to sign up a new user to verify that the authentication and profile creation are working

## Database Schema Overview

The database includes the following tables:

- **profiles**: User profiles with preferences and settings
- **routes**: Running routes with details like distance, elevation, and terrain
- **route_ratings**: User ratings and comments for routes
- **trail_conditions**: Reports of trail conditions and hazards
- **challenges**: Community challenges with goals and timeframes
- **challenge_participants**: Users participating in challenges
- **running_groups**: Running groups and clubs
- **group_members**: Members of running groups
- **user_runs**: Records of user running activities

## Row Level Security (RLS)

The database uses Row Level Security to ensure data privacy:

- Public data (routes, challenges, trail conditions) is viewable by everyone
- Private data (user profiles, runs) is only viewable by the owner
- Users can only create, update, and delete their own data

## Troubleshooting

If you encounter issues:

1. Check that your environment variables are correctly set
2. Verify that the Supabase URL and anon key are correct
3. Check the Supabase logs for any errors
4. Ensure that the required extensions are enabled
5. Verify that the database schema was created successfully

## Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostGIS Documentation](https://postgis.net/docs/) 
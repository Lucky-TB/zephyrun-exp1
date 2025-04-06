export const CONFIG = {
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  GEMINI_API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '',
  MAPS_API_KEY: process.env.EXPO_PUBLIC_MAPS_API_KEY || '',
  WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY || '',
};

export const APP_CONSTANTS = {
  APP_NAME: 'Zephyrun',
  VERSION: '1.0.0',
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  MAX_ROUTE_POINTS: 1000,
  MIN_ROUTE_DISTANCE: 0.5, // kilometers
  MAX_ROUTE_DISTANCE: 42, // kilometers (marathon distance)
}; 
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';
import * as SecureStore from 'expo-secure-store';
import { CONFIG } from '../constants/config';

// Custom storage implementation for Expo
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

// Create Supabase client with typed database
export const supabase = createClient<Database>(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// Helper functions for common database operations

// Profile operations
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Route operations
export const getRoutes = async (options?: {
  limit?: number;
  offset?: number;
  terrain?: string[];
  minDistance?: number;
  maxDistance?: number;
  minDifficulty?: number;
  maxDifficulty?: number;
}) => {
  let query = supabase
    .from('routes')
    .select('*, profiles(username, avatar_url)')
    .eq('is_public', true);
  
  if (options?.terrain && options.terrain.length > 0) {
    query = query.contains('terrain', options.terrain);
  }
  
  if (options?.minDistance) {
    query = query.gte('distance', options.minDistance);
  }
  
  if (options?.maxDistance) {
    query = query.lte('distance', options.maxDistance);
  }
  
  if (options?.minDifficulty) {
    query = query.gte('difficulty', options.minDifficulty);
  }
  
  if (options?.maxDifficulty) {
    query = query.lte('difficulty', options.maxDifficulty);
  }
  
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const getRouteById = async (routeId: string) => {
  const { data, error } = await supabase
    .from('routes')
    .select('*, profiles(username, avatar_url), route_ratings(*)')
    .eq('id', routeId)
    .single();
  
  if (error) throw error;
  return data;
};

export const createRoute = async (route: Database['public']['Tables']['routes']['Insert']) => {
  const { data, error } = await supabase
    .from('routes')
    .insert(route)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Trail conditions operations
export const getTrailConditions = async (routeId: string) => {
  const { data, error } = await supabase
    .from('trail_conditions')
    .select('*, profiles(username, avatar_url)')
    .eq('route_id', routeId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const reportTrailCondition = async (condition: Database['public']['Tables']['trail_conditions']['Insert']) => {
  const { data, error } = await supabase
    .from('trail_conditions')
    .insert(condition)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Challenge operations
export const getChallenges = async (options?: {
  active?: boolean;
  limit?: number;
  offset?: number;
}) => {
  let query = supabase
    .from('challenges')
    .select('*, profiles(username, avatar_url)');
  
  if (options?.active !== undefined) {
    const now = new Date().toISOString();
    if (options.active) {
      query = query.lte('start_date', now).gte('end_date', now);
    } else {
      query = query.or(`start_date.gt.${now},end_date.lt.${now}`);
    }
  }
  
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const joinChallenge = async (challengeId: string, userId: string) => {
  const { data, error } = await supabase
    .from('challenge_participants')
    .insert({ challenge_id: challengeId, user_id: userId })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// User runs operations
export const getUserRuns = async (userId: string, options?: {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}) => {
  let query = supabase
    .from('user_runs')
    .select('*, routes(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (options?.startDate) {
    query = query.gte('created_at', options.startDate);
  }
  
  if (options?.endDate) {
    query = query.lte('created_at', options.endDate);
  }
  
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const logUserRun = async (run: Database['public']['Tables']['user_runs']['Insert']) => {
  const { data, error } = await supabase
    .from('user_runs')
    .insert(run)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}; 
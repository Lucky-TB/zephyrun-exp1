import { createClient } from '@supabase/supabase-js';
import { CONFIG } from '../constants/config';
import * as SecureStore from 'expo-secure-store';

// Log the configuration for debugging
console.log('Supabase URL:', CONFIG.SUPABASE_URL);
console.log('Supabase Anon Key:', CONFIG.SUPABASE_ANON_KEY);

if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL and Anon Key must be provided in the .env file');
}

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

export const supabase = createClient(
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
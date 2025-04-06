import { CONFIG } from '../constants/config';

export function checkEnvVariables() {
  console.log('Supabase URL:', CONFIG.SUPABASE_URL);
  console.log('Supabase Anon Key:', CONFIG.SUPABASE_ANON_KEY);
  console.log('Gemini API Key:', CONFIG.GEMINI_API_KEY);
  
  if (!CONFIG.SUPABASE_URL || CONFIG.SUPABASE_URL === 'your_supabase_url') {
    console.error('Supabase URL is not properly configured');
    return false;
  }
  
  if (!CONFIG.SUPABASE_ANON_KEY || CONFIG.SUPABASE_ANON_KEY === 'your_supabase_anon_key') {
    console.error('Supabase Anon Key is not properly configured');
    return false;
  }
  
  return true;
} 
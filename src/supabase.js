import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Temporary during the redesign: without env vars, export null instead of throwing,
// so the new sections can run locally. Legacy sections that need Supabase are skipped in App.jsx.
if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase env vars missing: legacy sections (About, Portofolio, Contact) are hidden.");
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabaseUrl and supabaseKey are required. Please check your .env file.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

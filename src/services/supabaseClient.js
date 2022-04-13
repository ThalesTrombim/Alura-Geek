import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 
// const supabaseAnonKey = 
const service = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

export const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export const supabaseAdmin = createClient(supabaseUrl, service)
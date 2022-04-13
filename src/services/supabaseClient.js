import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const service = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

export const supabaseClient = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbWRmeXh4Y3p0anF1c3lmaXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg5MjM2NzIsImV4cCI6MTk2NDQ5OTY3Mn0.DguWc0OEbCEl-2HzvJHecuM1qOywHvtJEZUBok9qhP8')
export const supabaseAdmin = createClient(supabaseUrl, service)
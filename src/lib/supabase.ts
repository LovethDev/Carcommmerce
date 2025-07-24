import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Car = {
  id: string
  model: string
  brand: string
  year: number
  price: number | string
  description: string | null
  image_url: string | null
  image_urls: string[] | null
  created_at: string
  updated_at: string
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseSecretKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
// const supabase = createClient(supabaseUrl, supabaseSecretKey)
const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  db: {
    schema: 'custom',
  },
  auth: {
    persistSession: true,
  },
})

export default supabase

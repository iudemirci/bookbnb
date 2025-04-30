import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ngtroyaxpnsuyjjpgbzj.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;

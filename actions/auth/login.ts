

import { createClient } from "@/utils/supabase/component"

export async function loginUser(email: string, password: string) {

  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data.user
}


import { createClient } from "@/utils/supabase/component"

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const nombre = formData.get("nombre") as string
  const apellido = formData.get("apellido") as string

  const supabase = createClient()

  // Crear y guardar en la tabla Supabase Auth
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error

  // Guardar datos adicionales en tabla usuarios
  if (data.user) {
    const { error: insertError } = await supabase.from("usuarios").insert({
      auth_id: data.user.id,
      nombre,
      apellido,
      email,
      rol_id: 4 // socio
    })
    if (insertError) throw insertError
  }

  return { success: true }
}

"use client"

import { registerUser } from "@/actions/auth/register"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden")
      return
    }

    const formData = new FormData(e.currentTarget)
    try {
      await registerUser(formData)
      setMessage("Usuario registrado correctamente")      
      router.push("/auth/confirm-instructions")
    } catch (err: any) {
      setMessage("Error: " + err.message)
    }
  }

  return (
    <div className="flex items-start min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm space-y-4 border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Crear cuenta</h1>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition-colors cursor-pointer"
        >
          Registrarse
        </button>

        <p className="text-center text-sm text-gray-600">{message}</p>
      </form>
    </div>
  )
}

import { redirect } from 'next/navigation'
import React from 'react'

const AuthIndexPage = () => {
  redirect('/auth/login')
}

export default AuthIndexPage
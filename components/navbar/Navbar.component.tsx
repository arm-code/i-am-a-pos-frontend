'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
  { title: 'Inicio', route: '/about-us' },
  { title: 'Productos y servicios', route: '/products-services' },
  { title: 'Equipo de trabajo', route: '/about-owners' },
  { title: 'Administración', route: '/auth/login' },
  { title: 'Desarrollador', route: '/about-me' },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='flex gap-6 items-center'>
      {items.map((item) => {
        const isActive = pathname === item.route
        return (
          <Link 
            href={item.route} 
            className={`
              text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'text-gray-900 border-b-2 border-gray-900 pb-1' 
                : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 pb-1'
              }
            `} 
            key={item.title}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default Navbar
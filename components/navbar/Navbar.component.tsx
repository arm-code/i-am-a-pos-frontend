'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const items = [
  { title: 'Acerca de nosotros', route: '/about-us' },
  { title: 'Acerca de los propietarios', route: '/about-owners' },
  { title: 'Administración', route: '/auth/login' },
];

const Navbar = () => {

    const pathName = usePathname()
  return (
    <nav className='flex gap-2'>
      {items.map((item) => {
        const isActive = pathName === item.route
        return (
          <Link href={item.route} className={`list-none ${ isActive ? 'underline': ''}`} key={item.title}>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;

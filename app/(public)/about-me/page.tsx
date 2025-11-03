import Image from 'next/image';
import React from 'react';

const AboutMePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <Image
        src='/profiles/square-alro.jpg'
        alt='profile photo'
        width={200}
        height={200}
        className='rounded-full'
      />
      <div className='flex flex-col items-center'>
        <p>Yo Soy</p>
        <h1>Alexis Romero Mendoza</h1>
        <p>Ingeniero de Sistemas Computacionales</p>
        <p>Egresado de la Universidad Autónoma de Ciudad Juárez, Chihuahua.</p>
      </div>

      <div className='flex flex-col items-center'>
        <p>Tecnologias</p>
        <p>
          Typescript, React, Nextjs, Nestjs, MySQL, Sybase Ase, Linux, Docker,
          Tailwind
        </p>
      </div>

      <div className='flex flex-col items-center'>
        <p>Sitios</p>
        <p>
          Github
        </p>

        <p>
            Linkeind
        </p>
        
      </div>

      <div>
        datos de contacto
      </div>


    </div>
  );
};

export default AboutMePage;

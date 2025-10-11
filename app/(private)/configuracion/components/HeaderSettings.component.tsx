import React from 'react'

const HeaderSettings = () => {
  return (
    <header className=' sticky top-0 z-50 border-b border-border bg-card'>
      <div className='mx-auto max-w-[1600px] px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1  className='text-2xl font-semibold text-foreground'>Configuración</h1>
            <p className='text-sm text-muted-foreground'>Adminisrtacion de la configuracion de tu punto de venta</p>
          </div>

        </div>

      </div>


    </header>
  )
}

export default HeaderSettings
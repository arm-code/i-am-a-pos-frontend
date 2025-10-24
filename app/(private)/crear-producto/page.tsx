import React from 'react'

const CrearProductoPage = () => {
  return (
    <div>
      <h1>Crear nuevo producto</h1>
      <form className='w-full max-w-lg'>
        <div>
          <label htmlFor="nombre-producto">Nombre del producto:</label>
          <input type="text"  id="nombre-prducto"/>
        </div>
      </form>
    </div>
  )
}

export default CrearProductoPage
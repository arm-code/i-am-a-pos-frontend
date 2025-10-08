
const usuario = 'Alexis Romero Mendoza'

const BienvenidaView = () => {
  return (
    <div className=" flex items-center justify-center h-full flex-col">
        {/* <p className="font-bold">Bienvenido { usuario } </p>         */}
        <h1 className="text-2xl">Sistema de control de negocio.</h1>        
        <p>Seleccione una opción del panel derecho para trabajar.</p>
        
    </div>
  )
}

export default BienvenidaView
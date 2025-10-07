export default function Topbar({ session }: { session: any }) {
  return (
    <header
      className="fixed top-0 z-40 bg-white border-b border-gray-200 px-6 py-4 shadow-sm 
                 transition-all duration-300"
      style={{
        left: 'var(--sidebar-width)',
        right: 0,
      }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard - {session ? 'Bienvenido' : 'Acceso Público'}
        </h1>
      </div>
    </header>
  )
}

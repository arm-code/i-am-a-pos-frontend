export default function Topbar({ session }: { session: any }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard - {session ? "Bienvenido" : "Acceso Público"}
        </h1>
      </div>
    </header>
  )
}

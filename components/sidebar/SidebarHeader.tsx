import { Dumbbell } from "lucide-react"

export default function SidebarHeader({
  nombreNegocio,
  isSidebarOpen,
  toggleSidebar
}: {
  nombreNegocio: string
  isSidebarOpen: boolean
  toggleSidebar: () => void
}) {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <button
        onClick={toggleSidebar}
        className="flex items-center gap-3 p-1 hover:bg-gray-100 rounded-lg transition-colors w-full"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          {/* <Dumbbell className="w-4 h-4 text-white" /> */}
          <img src='/images/mob-mendoza.png' className="bg-white"/>
        </div>
        {isSidebarOpen && <span className="font-bolds text-lg text-gray-900">{nombreNegocio}</span>}
      </button>
    </div>
  )
}

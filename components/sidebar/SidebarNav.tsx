import { View } from "@/app/page";

export default function SidebarNav({
  items,
  currentView,
  onViewChange,
  isSidebarOpen
}: {
  items: { id: View; label: string; icon: string }[]
  currentView: View
  onViewChange: (view: View) => void
  isSidebarOpen: boolean
}) {
  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center hover:cursor-pointer space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                currentView === item.id
                  ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

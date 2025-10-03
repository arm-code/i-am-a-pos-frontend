"use client"

import SidebarLayout from "@/components/sidebar/Sidebar"
import { View } from "@/types/View.types"
import { useState } from "react"


export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<View>("principal")

  return (
    <SidebarLayout currentView={currentView} onViewChange={setCurrentView}>
      {children}
    </SidebarLayout>
  )
}

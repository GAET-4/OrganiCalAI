import { Outlet } from '@tanstack/react-router'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'

export function Layout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="container max-w-2xl mx-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

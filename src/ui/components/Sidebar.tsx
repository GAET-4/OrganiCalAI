import { Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/ui/nav/navItems'
import { useAuth } from '@/application/auth/AuthContext'

export function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card p-4 gap-1 z-10 shadow-[2px_0_10px_#C8D0DF]">
      <div className="mb-8 px-3 pt-2">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          OrganiCal.ai
        </h1>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
              'text-foreground/60 hover:text-foreground hover:bg-muted/60',
              '[&.active]:bg-secondary [&.active]:text-primary [&.active]:font-semibold'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-foreground/60 hover:text-foreground hover:bg-muted/60 mt-auto"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        Déconnexion
      </button>
    </aside>
  )
}

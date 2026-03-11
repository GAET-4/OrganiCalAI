import { Link } from '@tanstack/react-router'
import { Home, Users, UsersRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Accueil', icon: Home },
  // @ts-expect-error - routes added in Task 21
  { to: '/contacts', label: 'Contacts', icon: Users },
  // @ts-expect-error - routes added in Task 21
  { to: '/groups', label: 'Groupes', icon: UsersRound },
] as const

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 border-r bg-background p-4 gap-1">
      <div className="mb-6 px-2">
        <h1 className="text-xl font-bold tracking-tight">OrganiCal.ai</h1>
      </div>
      {navItems.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            '[&.active]:bg-muted [&.active]:text-foreground'
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </aside>
  )
}

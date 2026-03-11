import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { navItems } from '@/ui/nav/navItems'

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
            'text-muted-foreground hover:text-foreground hover:bg-secondary',
            '[&.active]:bg-secondary [&.active]:text-primary'
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </aside>
  )
}

import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { navItems } from '@/ui/nav/navItems'

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background border-t">
      <div className="flex">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium',
              'text-muted-foreground [&.active]:text-foreground'
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

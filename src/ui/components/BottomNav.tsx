import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { navItems } from '@/ui/nav/navItems'

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-4 inset-x-4 z-50">
      <div className="flex items-center justify-around rounded-2xl bg-background/80 backdrop-blur-md shadow-neo px-2 py-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium rounded-xl px-2 transition-all duration-200',
              'text-muted-foreground hover:text-foreground',
              '[&.active]:text-primary [&.active]:bg-secondary'
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

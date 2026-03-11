import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { navItems } from '@/ui/nav/navItems'

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background shadow-[0_-4px_10px_#D1D9E6,-0px_-0px_8px_#FFFFFF]">
      <div className="flex">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium',
              'text-muted-foreground [&.active]:text-primary [&.active]:bg-secondary rounded-xl px-2 transition-colors'
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

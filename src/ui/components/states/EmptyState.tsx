import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  message?: string
  ctaLabel?: string
  onCta?: () => void
}

export function EmptyState({
  message = 'Aucun élément à afficher.',
  ctaLabel,
  onCta,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <Inbox className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{message}</p>
      {ctaLabel && onCta && (
        <Button onClick={onCta}>{ctaLabel}</Button>
      )}
    </div>
  )
}

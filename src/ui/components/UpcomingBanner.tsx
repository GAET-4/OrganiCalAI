import { PartyPopper } from 'lucide-react'
import type { UpcomingContact } from '@/application/reminder/useGetUpcoming'
import { getFullName } from '@/domain/contact/contactUtils'

interface UpcomingBannerProps {
  contacts: UpcomingContact[]
}

export function UpcomingBanner({ contacts }: UpcomingBannerProps) {
  if (contacts.length === 0) return null

  const next = contacts[0]
  const dayLabel =
    next.daysUntil === 0
      ? "C'est aujourd'hui !"
      : next.daysUntil === 1
      ? "C'est demain !"
      : `Dans ${next.daysUntil} jours`

  return (
    <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-4">
      <PartyPopper className="h-8 w-8 text-primary shrink-0" />
      <div>
        <p className="font-semibold text-primary">Prochain anniversaire</p>
        <p className="text-sm">
          {getFullName(next)} — {dayLabel}
        </p>
      </div>
    </div>
  )
}

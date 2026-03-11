import { Card, CardContent } from '@/components/ui/card'
import { Cake, ChevronRight } from 'lucide-react'
import type { Contact } from '@/domain/contact/Contact'
import type { Group } from '@/domain/contact/Group'
import { getFullName, getNextAge, daysUntilBirthday } from '@/domain/contact/contactUtils'
import { GroupBadge } from './GroupBadge'

interface ContactCardProps {
  contact: Contact
  group?: Group
  onClick?: () => void
}

export function ContactCard({ contact, group, onClick }: ContactCardProps) {
  const days = daysUntilBirthday(contact)
  const age = getNextAge(contact)

  const dayLabel =
    days === 0
      ? "Aujourd'hui !"
      : days === 1
      ? 'Demain'
      : `Dans ${days} jours`

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Cake className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{getFullName(contact)}</p>
          <p className="text-sm text-muted-foreground">
            {age} ans · {dayLabel}
          </p>
          {group && <GroupBadge group={group} size="sm" />}
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
      </CardContent>
    </Card>
  )
}

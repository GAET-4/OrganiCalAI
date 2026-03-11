import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Pencil, Trash2, Cake, Users } from 'lucide-react'
import { toast } from 'sonner'
import { useGetContactById } from '@/application/contact/useGetContactById'
import { useDeleteContact } from '@/application/contact/useDeleteContact'
import { useGetGroupById } from '@/application/group/useGetGroupById'
import { getFullName, getNextAge, daysUntilBirthday } from '@/domain/contact/contactUtils'
import { GroupBadge } from '@/ui/components/GroupBadge'
import { LoadingSkeleton } from '@/ui/components/states/LoadingSkeleton'
import { ErrorState } from '@/ui/components/states/ErrorState'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ContactDetailPageProps {
  contactId: string
}

export function ContactDetailPage({ contactId }: ContactDetailPageProps) {
  const navigate = useNavigate()
  const { data: contact, isLoading, isError } = useGetContactById(contactId)
  const { data: group } = useGetGroupById(contact?.groupId ?? '')
  const deleteContact = useDeleteContact()

  if (isLoading) return <LoadingSkeleton count={2} />
  if (isError || !contact) return <ErrorState message="Contact introuvable." />

  const days = daysUntilBirthday(contact)
  const age = getNextAge(contact)
  const dayLabel =
    days === 0 ? "Aujourd'hui !" : days === 1 ? 'Demain' : `Dans ${days} jours`

  const handleDelete = async () => {
    await deleteContact.mutateAsync(contact.id)
    toast.success('Contact supprimé')
    // @ts-ignore - route registered in Task 21
    navigate({ to: '/contacts' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() =>
          // @ts-ignore
          navigate({ to: '/contacts' })
        }>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold flex-1">{getFullName(contact)}</h2>
        <Button
          variant="outline"
          size="icon"
          // @ts-ignore
          onClick={() => navigate({ to: '/contacts/$id/edit', params: { id: contact.id } })}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <Cake className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{contact.birthday}</p>
              <p className="text-sm text-muted-foreground">
                {age} ans · {dayLabel}
              </p>
            </div>
          </div>

          {group && (
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <GroupBadge group={group} />
            </div>
          )}

          {contact.notes && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
              <p className="text-sm">{contact.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useGetGroupById } from '@/application/group/useGetGroupById'
import { useGetContacts } from '@/application/contact/useGetContacts'
import { ContactCard } from '@/ui/components/ContactCard'
import { LoadingSkeleton } from '@/ui/components/states/LoadingSkeleton'
import { ErrorState } from '@/ui/components/states/ErrorState'
import { EmptyState } from '@/ui/components/states/EmptyState'
import { Button } from '@/components/ui/button'

interface GroupDetailPageProps {
  groupId: string
}

export function GroupDetailPage({ groupId }: GroupDetailPageProps) {
  const navigate = useNavigate()
  const { data: group, isLoading, isError } = useGetGroupById(groupId)
  const { data: contacts = [] } = useGetContacts()

  if (isLoading) return <LoadingSkeleton count={3} />
  if (isError || !group) return <ErrorState message="Groupe introuvable." />

  const members = contacts.filter((c) => c.groupId === groupId)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() =>
          // @ts-ignore
          navigate({ to: '/groups' })
        }>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div
          className="h-8 w-8 rounded-full shrink-0"
          style={{ backgroundColor: group.color }}
        />
        <h2 className="text-2xl font-bold">{group.name}</h2>
      </div>

      <p className="text-muted-foreground">
        {members.length} contact{members.length > 1 ? 's' : ''}
      </p>

      {members.length === 0 ? (
        <EmptyState
          message="Aucun contact dans ce groupe."
          ctaLabel="Ajouter un contact"
          // @ts-ignore
          onCta={() => navigate({ to: '/contacts/new' })}
        />
      ) : (
        <div className="space-y-2">
          {members.map((c) => (
            <ContactCard
              key={c.id}
              contact={c}
              group={group}
              // @ts-ignore
              onClick={() => navigate({ to: '/contacts/$id', params: { id: c.id } })}
            />
          ))}
        </div>
      )}
    </div>
  )
}

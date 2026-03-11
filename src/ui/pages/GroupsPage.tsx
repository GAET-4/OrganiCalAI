import { useNavigate } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useGetGroups } from '@/application/group/useGetGroups'
import { useGetContacts } from '@/application/contact/useGetContacts'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSkeleton } from '@/ui/components/states/LoadingSkeleton'
import { ErrorState } from '@/ui/components/states/ErrorState'
import { EmptyState } from '@/ui/components/states/EmptyState'

export function GroupsPage() {
  const navigate = useNavigate()
  const { data: groups = [], isLoading, isError, refetch } = useGetGroups()
  const { data: contacts = [] } = useGetContacts()

  if (isLoading) return <LoadingSkeleton count={3} />
  if (isError) return <ErrorState onRetry={refetch} />
  if (groups.length === 0) return <EmptyState message="Aucun groupe disponible." />

  const countByGroup = (groupId: string) =>
    contacts.filter((c) => c.groupId === groupId).length

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Groupes</h2>
      <div className="space-y-2">
        {groups.map((g) => (
          <Card
            key={g.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => navigate({ to: '/groups/$id', params: { id: g.id } })}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div
                className="h-10 w-10 rounded-full shrink-0"
                style={{ backgroundColor: g.color }}
              />
              <div className="flex-1">
                <p className="font-semibold">{g.name}</p>
                <p className="text-sm text-muted-foreground">
                  {countByGroup(g.id)} contact{countByGroup(g.id) > 1 ? 's' : ''}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

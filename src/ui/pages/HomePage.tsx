import { useNavigate } from '@tanstack/react-router'
import { useGetUpcoming } from '@/application/reminder/useGetUpcoming'
import { useGetGroups } from '@/application/group/useGetGroups'
import { useGetContacts } from '@/application/contact/useGetContacts'
import { UpcomingBanner } from '@/ui/components/UpcomingBanner'
import { ContactCard } from '@/ui/components/ContactCard'
import { LoadingSkeleton } from '@/ui/components/states/LoadingSkeleton'
import { ErrorState } from '@/ui/components/states/ErrorState'

export function HomePage() {
  const navigate = useNavigate()
  const { data: upcoming = [], isLoading, isError, refetch } = useGetUpcoming(7)
  const { data: monthly = [] } = useGetUpcoming(30)
  const { data: groups = [] } = useGetGroups()
  const { data: contacts = [] } = useGetContacts()

  const monthlyOnly = monthly.filter((c) => !upcoming.some((u) => u.id === c.id))

  if (isLoading) return <LoadingSkeleton count={4} />
  if (isError) return <ErrorState onRetry={refetch} />

  const getGroup = (groupId: string) => groups.find((g) => g.id === groupId)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Bonjour 👋</h2>
        <p className="text-muted-foreground">{contacts.length} contacts · {groups.length} groupes</p>
      </div>

      <UpcomingBanner contacts={upcoming} />

      {upcoming.length > 0 && (
        <section>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
            Cette semaine
          </h3>
          <div className="space-y-2">
            {upcoming.map((c) => (
              <ContactCard
                key={c.id}
                contact={c}
                group={getGroup(c.groupId)}
                // @ts-ignore - route registered in Task 21
                onClick={() => navigate({ to: '/contacts/$id', params: { id: c.id } })}
              />
            ))}
          </div>
        </section>
      )}

      {monthlyOnly.length > 0 && (
        <section>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
            Ce mois-ci
          </h3>
          <div className="space-y-2">
            {monthlyOnly.map((c) => (
              <ContactCard
                key={c.id}
                contact={c}
                group={getGroup(c.groupId)}
                // @ts-ignore - route registered in Task 21
                onClick={() => navigate({ to: '/contacts/$id', params: { id: c.id } })}
              />
            ))}
          </div>
        </section>
      )}

      {upcoming.length === 0 && monthlyOnly.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          Aucun anniversaire dans les 30 prochains jours.
        </p>
      )}
    </div>
  )
}

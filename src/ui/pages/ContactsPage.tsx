import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Plus, Search } from 'lucide-react'
import { useGetContacts } from '@/application/contact/useGetContacts'
import { useGetGroups } from '@/application/group/useGetGroups'
import { ContactCard } from '@/ui/components/ContactCard'
import { LoadingSkeleton } from '@/ui/components/states/LoadingSkeleton'
import { ErrorState } from '@/ui/components/states/ErrorState'
import { EmptyState } from '@/ui/components/states/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ContactsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)

  const { data: contacts = [], isLoading, isError, refetch } = useGetContacts()
  const { data: groups = [] } = useGetGroups()

  if (isLoading) return <LoadingSkeleton count={5} />
  if (isError) return <ErrorState onRetry={refetch} />

  const filtered = contacts.filter((c) => {
    const matchSearch =
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase())
    const matchGroup = activeGroupId ? c.groupId === activeGroupId : true
    return matchSearch && matchGroup
  })

  const getGroup = (groupId: string) => groups.find((g) => g.id === groupId)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <Button size="sm" onClick={() =>
          navigate({ to: '/contacts/new' })
        }>
          <Plus className="h-4 w-4 mr-1" />
          Ajouter
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveGroupId(null)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            !activeGroupId
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Tous
        </button>
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGroupId(g.id === activeGroupId ? null : g.id)}
            className={`rounded-full px-3 py-1 text-sm font-medium text-white transition-opacity ${
              activeGroupId === g.id ? 'opacity-100' : 'opacity-60 hover:opacity-80'
            }`}
            style={{ backgroundColor: g.color }}
          >
            {g.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          message="Aucun contact trouvé."
          ctaLabel="Ajouter un contact"
          onCta={() => navigate({ to: '/contacts/new' })}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <ContactCard
              key={c.id}
              contact={c}
              group={getGroup(c.groupId)}
              onClick={() => navigate({ to: '/contacts/$id', params: { id: c.id } })}
            />
          ))}
        </div>
      )}
    </div>
  )
}

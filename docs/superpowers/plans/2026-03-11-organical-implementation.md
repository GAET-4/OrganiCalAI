# OrganiCal.ai Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffolfer une application web React de gestion d'anniversaires avec groupes, mock JSON, DDD Léger, et UI ShadCN/TailwindCSS.

**Architecture:** DDD Léger — 4 couches isolées (domain / application / infrastructure / ui). La couche `infrastructure` implémente les interfaces `domain` via fetch de fichiers JSON mock. Le backend se pluggera en remplaçant uniquement `infrastructure/`.

**Tech Stack:** React 18, Vite, TypeScript, TailwindCSS v4, ShadCN/ui, TanStack Router, TanStack Query, Lucide React, Zod, react-hook-form

**Note:** Pas de tests en V1. Les interfaces Repository facilitent les tests ultérieurs.

---

## Chunk 1: Project Setup & Configuration

### Task 1: Scaffold le projet Vite + React + TypeScript

**Files:**
- Create: `OrganiCalAI/` (root du projet via CLI)
- Create: `vite.config.ts`
- Create: `tsconfig.json`

- [ ] **Step 1: Créer le projet Vite**

```bash
cd /Users/gaetan/Documents/VSC_GGR
npm create vite@latest OrganiCalAI -- --template react-ts
cd OrganiCalAI
npm install
```

Expected: dossier `OrganiCalAI/` créé avec structure Vite standard.

- [ ] **Step 2: Supprimer le boilerplate inutile**

Supprimer ou vider :
- `src/App.css`
- `src/assets/react.svg`
- Contenu de `src/App.tsx` (garder un composant vide)
- Contenu de `src/index.css` (garder vide pour TailwindCSS)

Remplacer `src/App.tsx` par :
```tsx
export default function App() {
  return <div>OrganiCal.ai</div>
}
```

- [ ] **Step 3: Commit initial**

```bash
git init
git add .
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

### Task 2: Installer et configurer TailwindCSS v4

**Files:**
- Modify: `src/index.css`
- Modify: `vite.config.ts`

- [ ] **Step 1: Installer TailwindCSS**

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Configurer le plugin Vite**

Remplacer le contenu de `vite.config.ts` :
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 3: Importer TailwindCSS dans le CSS global**

Remplacer `src/index.css` :
```css
@import "tailwindcss";
```

- [ ] **Step 4: Vérifier**

```bash
npm run dev
```

Expected: page blanche sans erreur console.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: configure TailwindCSS v4"
```

---

### Task 3: Configurer les path aliases TypeScript

**Files:**
- Modify: `tsconfig.json`
- Modify: `vite.config.ts`

- [ ] **Step 1: Installer le plugin de résolution de paths**

```bash
npm install -D vite-tsconfig-paths
```

- [ ] **Step 2: Mettre à jour `tsconfig.json`**

Ajouter dans `compilerOptions` :
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 3: Mettre à jour `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
})
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: configure path aliases @/*"
```

---

### Task 4: Installer et configurer ShadCN/ui

**Files:**
- Create: `components.json`
- Create: `src/components/ui/` (généré par ShadCN CLI)
- Modify: `src/index.css`

- [ ] **Step 1: Initialiser ShadCN**

```bash
npx shadcn@latest init
```

Répondre aux questions :
- Which style? → **Default**
- Which color? → **Neutral**
- Use CSS variables? → **Yes**

- [ ] **Step 2: Ajouter les composants nécessaires**

```bash
npx shadcn@latest add button card input label badge skeleton toast dialog sheet tabs separator
```

- [ ] **Step 3: Vérifier que les composants sont dans `src/components/ui/`**

```bash
ls src/components/ui/
```

Expected: `button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx`, `skeleton.tsx`, `toast.tsx`, etc.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: install and configure ShadCN/ui"
```

---

### Task 5: Installer les dépendances restantes

**Files:** `package.json`

- [ ] **Step 1: Installer TanStack Router**

```bash
npm install @tanstack/react-router
npm install -D @tanstack/router-devtools
```

- [ ] **Step 2: Installer TanStack Query**

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-devtools
```

- [ ] **Step 3: Installer Lucide React**

```bash
npm install lucide-react
```

- [ ] **Step 4: Installer Zod + react-hook-form + résolveur**

```bash
npm install zod react-hook-form @hookform/resolvers
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install TanStack Router, Query, Lucide, Zod, react-hook-form"
```

---

### Task 6: Configurer TanStack Router et TanStack Query

**Files:**
- Create: `src/router.tsx`
- Create: `src/lib/queryClient.ts`
- Modify: `src/main.tsx`

- [ ] **Step 1: Créer le QueryClient**

Créer `src/lib/queryClient.ts` :
```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})
```

- [ ] **Step 2: Créer le router (routes vides pour l'instant)**

Créer `src/router.tsx` :
```tsx
import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Home</div>,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

- [ ] **Step 3: Mettre à jour `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { router } from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
```

- [ ] **Step 4: Vérifier**

```bash
npm run dev
```

Expected: page affiche "Home" sans erreur.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: configure TanStack Router and TanStack Query"
```

---

## Chunk 2: Domain Layer

### Task 7: Définir les types et interfaces du domaine

**Files:**
- Create: `src/domain/contact/Contact.ts`
- Create: `src/domain/contact/Group.ts`
- Create: `src/domain/contact/ContactRepository.ts`
- Create: `src/domain/group/GroupRepository.ts`
- Create: `src/domain/reminder/Reminder.ts`

- [ ] **Step 1: Créer la structure de dossiers**

```bash
mkdir -p src/domain/contact src/domain/group src/domain/reminder
```

- [ ] **Step 2: Créer `src/domain/contact/Group.ts`**

```ts
export type Group = {
  id: string
  name: string
  color: string // hex, ex: "#f97316"
}
```

- [ ] **Step 3: Créer `src/domain/contact/Contact.ts`**

```ts
export type Contact = {
  id: string
  firstName: string
  lastName: string
  birthday: string // ISO date "YYYY-MM-DD"
  groupId: string
  notes?: string
}
```

- [ ] **Step 4: Créer `src/domain/contact/ContactRepository.ts`**

```ts
import type { Contact } from './Contact'

export interface ContactRepository {
  getAll(): Promise<Contact[]>
  getById(id: string): Promise<Contact | undefined>
  save(contact: Contact): Promise<void>
  delete(id: string): Promise<void>
}
```

- [ ] **Step 5: Créer `src/domain/group/GroupRepository.ts`**

```ts
import type { Group } from '@/domain/contact/Group'

export interface GroupRepository {
  getAll(): Promise<Group[]>
  getById(id: string): Promise<Group | undefined>
}
```

- [ ] **Step 6: Créer `src/domain/reminder/Reminder.ts`**

```ts
export type ReminderChannel = 'sms' | 'email' | 'push'

export type Reminder = {
  contactId: string
  daysAhead: number
  channel: ReminderChannel
}
```

- [ ] **Step 7: Commit**

```bash
git add src/domain/
git commit -m "feat: define domain types and repository interfaces"
```

---

### Task 8: Logique métier du domaine

**Files:**
- Create: `src/domain/contact/contactUtils.ts`

- [ ] **Step 1: Créer `src/domain/contact/contactUtils.ts`**

```ts
import type { Contact } from './Contact'

/**
 * Nombre de jours jusqu'au prochain anniversaire (ignore l'année).
 * Retourne 0 si c'est aujourd'hui.
 */
export function daysUntilBirthday(contact: Contact): number {
  const today = new Date()
  const birthday = new Date(contact.birthday)

  const next = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())

  if (next < today) {
    next.setFullYear(today.getFullYear() + 1)
  }

  const diff = next.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Vrai si l'anniversaire tombe dans les `days` prochains jours.
 */
export function isUpcoming(contact: Contact, days: number = 30): boolean {
  return daysUntilBirthday(contact) <= days
}

/**
 * Âge que la personne aura à son prochain anniversaire.
 */
export function getNextAge(contact: Contact): number {
  const today = new Date()
  const birthday = new Date(contact.birthday)
  const age = today.getFullYear() - birthday.getFullYear()

  const next = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
  return next <= today ? age : age - 1
}

/**
 * Nom complet formaté.
 */
export function getFullName(contact: Contact): string {
  return `${contact.firstName} ${contact.lastName}`
}
```

- [ ] **Step 2: Vérifier la compilation**

```bash
npx tsc --noEmit
```

Expected: aucune erreur TypeScript.

- [ ] **Step 3: Commit**

```bash
git add src/domain/contact/contactUtils.ts
git commit -m "feat: add domain business logic (daysUntilBirthday, isUpcoming, getNextAge)"
```

---

## Chunk 3: Infrastructure & Mock Data

### Task 9: Créer les fichiers JSON mock

**Files:**
- Create: `public/data/groups.json`
- Create: `public/data/contacts.json`

- [ ] **Step 1: Créer la structure `public/data/`**

```bash
mkdir -p public/data
```

- [ ] **Step 2: Créer `public/data/groups.json`**

```json
[
  { "id": "1", "name": "Famille", "color": "#f97316" },
  { "id": "2", "name": "Amis",    "color": "#3b82f6" },
  { "id": "3", "name": "Travail", "color": "#8b5cf6" }
]
```

- [ ] **Step 3: Créer `public/data/contacts.json`**

```json
[
  {
    "id": "1",
    "firstName": "Marie",
    "lastName": "Dupont",
    "birthday": "1990-03-15",
    "groupId": "1",
    "notes": "Aime le chocolat noir"
  },
  {
    "id": "2",
    "firstName": "Thomas",
    "lastName": "Martin",
    "birthday": "1985-06-22",
    "groupId": "2"
  },
  {
    "id": "3",
    "firstName": "Sophie",
    "lastName": "Leroy",
    "birthday": "1992-12-01",
    "groupId": "2",
    "notes": "Offrir des livres"
  },
  {
    "id": "4",
    "firstName": "Jean",
    "lastName": "Bernard",
    "birthday": "1978-09-10",
    "groupId": "3"
  },
  {
    "id": "5",
    "firstName": "Claire",
    "lastName": "Moreau",
    "birthday": "1995-03-20",
    "groupId": "1"
  }
]
```

- [ ] **Step 4: Commit**

```bash
git add public/data/
git commit -m "feat: add mock JSON data (contacts and groups)"
```

---

### Task 10: Implémenter les repositories JSON

**Files:**
- Create: `src/infrastructure/contact/JsonContactRepository.ts`
- Create: `src/infrastructure/group/JsonGroupRepository.ts`

- [ ] **Step 1: Créer la structure**

```bash
mkdir -p src/infrastructure/contact src/infrastructure/group
```

- [ ] **Step 2: Créer `src/infrastructure/contact/JsonContactRepository.ts`**

```ts
import type { ContactRepository } from '@/domain/contact/ContactRepository'
import type { Contact } from '@/domain/contact/Contact'

export class JsonContactRepository implements ContactRepository {
  private readonly url = '/data/contacts.json'

  async getAll(): Promise<Contact[]> {
    const res = await fetch(this.url)
    if (!res.ok) throw new Error('Failed to fetch contacts')
    return res.json()
  }

  async getById(id: string): Promise<Contact | undefined> {
    const contacts = await this.getAll()
    return contacts.find((c) => c.id === id)
  }

  // Mock V1 : les mutations ne persistent pas
  async save(_contact: Contact): Promise<void> {
    // No-op: persistence handled by TanStack Query cache
  }

  async delete(_id: string): Promise<void> {
    // No-op: persistence handled by TanStack Query cache
  }
}
```

- [ ] **Step 3: Créer `src/infrastructure/group/JsonGroupRepository.ts`**

```ts
import type { GroupRepository } from '@/domain/group/GroupRepository'
import type { Group } from '@/domain/contact/Group'

export class JsonGroupRepository implements GroupRepository {
  private readonly url = '/data/groups.json'

  async getAll(): Promise<Group[]> {
    const res = await fetch(this.url)
    if (!res.ok) throw new Error('Failed to fetch groups')
    return res.json()
  }

  async getById(id: string): Promise<Group | undefined> {
    const groups = await this.getAll()
    return groups.find((g) => g.id === id)
  }
}
```

- [ ] **Step 4: Vérifier la compilation**

```bash
npx tsc --noEmit
```

Expected: aucune erreur.

- [ ] **Step 5: Commit**

```bash
git add src/infrastructure/
git commit -m "feat: implement JSON mock repositories"
```

---

## Chunk 4: Application Layer (Hooks)

### Task 11: Hooks contacts

**Files:**
- Create: `src/application/contact/useGetContacts.ts`
- Create: `src/application/contact/useGetContactById.ts`
- Create: `src/application/contact/useCreateContact.ts`
- Create: `src/application/contact/useUpdateContact.ts`
- Create: `src/application/contact/useDeleteContact.ts`

- [ ] **Step 1: Créer la structure**

```bash
mkdir -p src/application/contact src/application/group src/application/reminder
```

- [ ] **Step 2: Créer les instances de repository partagées**

Créer `src/application/repositories.ts` :
```ts
import { JsonContactRepository } from '@/infrastructure/contact/JsonContactRepository'
import { JsonGroupRepository } from '@/infrastructure/group/JsonGroupRepository'

export const contactRepository = new JsonContactRepository()
export const groupRepository = new JsonGroupRepository()
```

- [ ] **Step 3: Créer `src/application/contact/useGetContacts.ts`**

```ts
import { useQuery } from '@tanstack/react-query'
import { contactRepository } from '@/application/repositories'

export const CONTACTS_QUERY_KEY = ['contacts'] as const

export function useGetContacts() {
  return useQuery({
    queryKey: CONTACTS_QUERY_KEY,
    queryFn: () => contactRepository.getAll(),
  })
}
```

- [ ] **Step 4: Créer `src/application/contact/useGetContactById.ts`**

```ts
import { useQuery } from '@tanstack/react-query'
import { contactRepository } from '@/application/repositories'

export function useGetContactById(id: string) {
  return useQuery({
    queryKey: ['contacts', id],
    queryFn: () => contactRepository.getById(id),
    enabled: !!id,
  })
}
```

- [ ] **Step 5: Créer `src/application/contact/useCreateContact.ts`**

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Contact } from '@/domain/contact/Contact'
import { contactRepository } from '@/application/repositories'
import { CONTACTS_QUERY_KEY } from './useGetContacts'

export function useCreateContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contact: Contact) => contactRepository.save(contact),
    onMutate: async (newContact) => {
      await queryClient.cancelQueries({ queryKey: CONTACTS_QUERY_KEY })
      const previous = queryClient.getQueryData<Contact[]>(CONTACTS_QUERY_KEY)
      queryClient.setQueryData<Contact[]>(CONTACTS_QUERY_KEY, (old = []) => [
        ...old,
        newContact,
      ])
      return { previous }
    },
    onError: (_err, _newContact, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CONTACTS_QUERY_KEY, context.previous)
      }
    },
  })
}
```

- [ ] **Step 6: Créer `src/application/contact/useUpdateContact.ts`**

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Contact } from '@/domain/contact/Contact'
import { contactRepository } from '@/application/repositories'
import { CONTACTS_QUERY_KEY } from './useGetContacts'

export function useUpdateContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contact: Contact) => contactRepository.save(contact),
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: CONTACTS_QUERY_KEY })
      const previous = queryClient.getQueryData<Contact[]>(CONTACTS_QUERY_KEY)
      queryClient.setQueryData<Contact[]>(CONTACTS_QUERY_KEY, (old = []) =>
        old.map((c) => (c.id === updated.id ? updated : c))
      )
      return { previous }
    },
    onError: (_err, _updated, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CONTACTS_QUERY_KEY, context.previous)
      }
    },
  })
}
```

- [ ] **Step 7: Créer `src/application/contact/useDeleteContact.ts`**

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Contact } from '@/domain/contact/Contact'
import { contactRepository } from '@/application/repositories'
import { CONTACTS_QUERY_KEY } from './useGetContacts'

export function useDeleteContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => contactRepository.delete(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: CONTACTS_QUERY_KEY })
      const previous = queryClient.getQueryData<Contact[]>(CONTACTS_QUERY_KEY)
      queryClient.setQueryData<Contact[]>(CONTACTS_QUERY_KEY, (old = []) =>
        old.filter((c) => c.id !== deletedId)
      )
      return { previous }
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CONTACTS_QUERY_KEY, context.previous)
      }
    },
  })
}
```

- [ ] **Step 8: Vérifier la compilation**

```bash
npx tsc --noEmit
```

- [ ] **Step 9: Commit**

```bash
git add src/application/
git commit -m "feat: add contact application hooks (get, create, update, delete)"
```

---

### Task 12: Hooks groupes et rappels

**Files:**
- Create: `src/application/group/useGetGroups.ts`
- Create: `src/application/group/useGetGroupById.ts`
- Create: `src/application/reminder/useGetUpcoming.ts`

- [ ] **Step 1: Créer `src/application/group/useGetGroups.ts`**

```ts
import { useQuery } from '@tanstack/react-query'
import { groupRepository } from '@/application/repositories'

export const GROUPS_QUERY_KEY = ['groups'] as const

export function useGetGroups() {
  return useQuery({
    queryKey: GROUPS_QUERY_KEY,
    queryFn: () => groupRepository.getAll(),
  })
}
```

- [ ] **Step 2: Créer `src/application/group/useGetGroupById.ts`**

```ts
import { useQuery } from '@tanstack/react-query'
import { groupRepository } from '@/application/repositories'

export function useGetGroupById(id: string) {
  return useQuery({
    queryKey: ['groups', id],
    queryFn: () => groupRepository.getById(id),
    enabled: !!id,
  })
}
```

- [ ] **Step 3: Créer `src/application/reminder/useGetUpcoming.ts`**

```ts
import { useMemo } from 'react'
import { useGetContacts } from '@/application/contact/useGetContacts'
import { isUpcoming, daysUntilBirthday } from '@/domain/contact/contactUtils'
import type { Contact } from '@/domain/contact/Contact'

export type UpcomingContact = Contact & { daysUntil: number }

export function useGetUpcoming(days: number = 30) {
  const { data: contacts = [], ...rest } = useGetContacts()

  const upcoming = useMemo<UpcomingContact[]>(() => {
    return contacts
      .filter((c) => isUpcoming(c, days))
      .map((c) => ({ ...c, daysUntil: daysUntilBirthday(c) }))
      .sort((a, b) => a.daysUntil - b.daysUntil)
  }, [contacts, days])

  return { data: upcoming, ...rest }
}
```

- [ ] **Step 4: Compiler et commit**

```bash
npx tsc --noEmit
git add src/application/group/ src/application/reminder/
git commit -m "feat: add group and upcoming reminder hooks"
```

---

## Chunk 5: Shared UI Components

### Task 13: Composants d'états partagés

**Files:**
- Create: `src/ui/components/states/LoadingSkeleton.tsx`
- Create: `src/ui/components/states/ErrorState.tsx`
- Create: `src/ui/components/states/EmptyState.tsx`

- [ ] **Step 1: Créer la structure**

```bash
mkdir -p src/ui/components/states src/ui/components src/ui/pages
```

- [ ] **Step 2: Créer `src/ui/components/states/LoadingSkeleton.tsx`**

```tsx
import { Skeleton } from '@/components/ui/skeleton'

interface LoadingSkeletonProps {
  count?: number
}

export function LoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Créer `src/ui/components/states/ErrorState.tsx`**

```tsx
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Une erreur est survenue.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <AlertCircle className="h-10 w-10 text-destructive" />
      <p className="text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Créer `src/ui/components/states/EmptyState.tsx`**

```tsx
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
```

- [ ] **Step 5: Commit**

```bash
git add src/ui/components/states/
git commit -m "feat: add shared state components (Loading, Error, Empty)"
```

---

### Task 14: Composants partagés (GroupBadge, ContactCard, UpcomingBanner)

**Files:**
- Create: `src/ui/components/GroupBadge.tsx`
- Create: `src/ui/components/ContactCard.tsx`
- Create: `src/ui/components/UpcomingBanner.tsx`

- [ ] **Step 1: Créer `src/ui/components/GroupBadge.tsx`**

```tsx
import type { Group } from '@/domain/contact/Group'

interface GroupBadgeProps {
  group: Group
  size?: 'sm' | 'md'
}

export function GroupBadge({ group, size = 'md' }: GroupBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium text-white ${sizeClass}`}
      style={{ backgroundColor: group.color }}
    >
      {group.name}
    </span>
  )
}
```

- [ ] **Step 2: Créer `src/ui/components/ContactCard.tsx`**

```tsx
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
```

- [ ] **Step 3: Créer `src/ui/components/UpcomingBanner.tsx`**

```tsx
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
```

- [ ] **Step 4: Compiler et commit**

```bash
npx tsc --noEmit
git add src/ui/components/
git commit -m "feat: add shared UI components (GroupBadge, ContactCard, UpcomingBanner)"
```

---

### Task 15: Layout principal + navigation

**Files:**
- Create: `src/ui/components/Layout.tsx`
- Create: `src/ui/components/Sidebar.tsx`
- Create: `src/ui/components/BottomNav.tsx`

- [ ] **Step 1: Créer `src/ui/components/Sidebar.tsx`**

```tsx
import { Link } from '@tanstack/react-router'
import { Home, Users, UsersRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/contacts', label: 'Contacts', icon: Users },
  { to: '/groups', label: 'Groupes', icon: UsersRound },
]

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 border-r bg-background p-4 gap-1">
      <div className="mb-6 px-2">
        <h1 className="text-xl font-bold tracking-tight">OrganiCal.ai</h1>
      </div>
      {navItems.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            '[&.active]:bg-muted [&.active]:text-foreground'
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </aside>
  )
}
```

- [ ] **Step 2: Créer `src/ui/components/BottomNav.tsx`**

```tsx
import { Link } from '@tanstack/react-router'
import { Home, Users, UsersRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/contacts', label: 'Contacts', icon: Users },
  { to: '/groups', label: 'Groupes', icon: UsersRound },
]

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background border-t">
      <div className="flex">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium',
              'text-muted-foreground [&.active]:text-foreground'
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
```

- [ ] **Step 3: Créer `src/ui/components/Layout.tsx`**

```tsx
import { Outlet } from '@tanstack/react-router'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'

export function Layout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="container max-w-2xl mx-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
```

- [ ] **Step 4: Compiler et commit**

```bash
npx tsc --noEmit
git add src/ui/components/Layout.tsx src/ui/components/Sidebar.tsx src/ui/components/BottomNav.tsx
git commit -m "feat: add layout with responsive sidebar and bottom nav"
```

---

## Chunk 6: Pages

### Task 16: HomePage

**Files:**
- Create: `src/ui/pages/HomePage.tsx`

- [ ] **Step 1: Créer `src/ui/pages/HomePage.tsx`**

```tsx
import { useNavigate } from '@tanstack/react-router'
import { useGetUpcoming } from '@/application/reminder/useGetUpcoming'
import { useGetGroups } from '@/application/group/useGetGroups'
import { useGetContacts } from '@/application/contact/useGetContacts'
import { UpcomingBanner } from '@/ui/components/UpcomingBanner'
import { ContactCard } from '@/ui/components/ContactCard'
import { LoadingSkeleton } from '@/ui/components/states/LoadingSkeleton'
import { ErrorState } from '@/ui/components/states/ErrorState'
import { isUpcoming } from '@/domain/contact/contactUtils'

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
```

- [ ] **Step 2: Compiler et commit**

```bash
npx tsc --noEmit
git add src/ui/pages/HomePage.tsx
git commit -m "feat: add HomePage with weekly and monthly upcoming birthdays"
```

---

### Task 17: ContactsPage

**Files:**
- Create: `src/ui/pages/ContactsPage.tsx`

- [ ] **Step 1: Créer `src/ui/pages/ContactsPage.tsx`**

```tsx
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
        <Button size="sm" onClick={() => navigate({ to: '/contacts/new' })}>
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
```

- [ ] **Step 2: Compiler et commit**

```bash
npx tsc --noEmit
git add src/ui/pages/ContactsPage.tsx
git commit -m "feat: add ContactsPage with search and group filter"
```

---

### Task 18: ContactFormPage (création + édition)

**Files:**
- Create: `src/ui/pages/ContactFormPage.tsx`

- [ ] **Step 1: Installer le composant Form ShadCN si pas déjà fait**

```bash
npx shadcn@latest add form select textarea
```

- [ ] **Step 2: Créer `src/ui/pages/ContactFormPage.tsx`**

```tsx
import { useNavigate, useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { useGetGroups } from '@/application/group/useGetGroups'
import { useCreateContact } from '@/application/contact/useCreateContact'
import { useUpdateContact } from '@/application/contact/useUpdateContact'
import { useGetContactById } from '@/application/contact/useGetContactById'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const contactSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  birthday: z.string().min(1, "La date d'anniversaire est requise"),
  groupId: z.string().min(1, 'Le groupe est requis'),
  notes: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormPageProps {
  mode: 'create' | 'edit'
  contactId?: string
}

export function ContactFormPage({ mode, contactId }: ContactFormPageProps) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { data: groups = [] } = useGetGroups()
  const { data: existingContact } = useGetContactById(contactId ?? '')

  const createContact = useCreateContact()
  const updateContact = useUpdateContact()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: existingContact
      ? {
          firstName: existingContact.firstName,
          lastName: existingContact.lastName,
          birthday: existingContact.birthday,
          groupId: existingContact.groupId,
          notes: existingContact.notes ?? '',
        }
      : undefined,
  })

  const onSubmit = async (data: ContactFormData) => {
    const contact = {
      id: contactId ?? crypto.randomUUID(),
      ...data,
    }

    if (mode === 'create') {
      await createContact.mutateAsync(contact)
      toast({ title: 'Contact ajouté avec succès' })
    } else {
      await updateContact.mutateAsync(contact)
      toast({ title: 'Contact mis à jour' })
    }

    navigate({ to: '/contacts' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/contacts' })}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">
          {mode === 'create' ? 'Nouveau contact' : 'Modifier le contact'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" {...register('firstName')} />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" {...register('lastName')} />
            {errors.lastName && (
              <p className="text-xs text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="birthday">Date d'anniversaire</Label>
          <Input id="birthday" type="date" {...register('birthday')} />
          {errors.birthday && (
            <p className="text-xs text-destructive">{errors.birthday.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="groupId">Groupe</Label>
          <select
            id="groupId"
            {...register('groupId')}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
          >
            <option value="">Choisir un groupe</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          {errors.groupId && (
            <p className="text-xs text-destructive">{errors.groupId.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes (optionnel)</Label>
          <textarea
            id="notes"
            {...register('notes')}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
            placeholder="Idées cadeaux, préférences..."
          />
        </div>

        <Button type="submit" className="w-full" disabled={createContact.isPending || updateContact.isPending}>
          {mode === 'create' ? 'Ajouter le contact' : 'Enregistrer les modifications'}
        </Button>
      </form>
    </div>
  )
}
```

- [ ] **Step 3: Compiler et commit**

```bash
npx tsc --noEmit
git add src/ui/pages/ContactFormPage.tsx
git commit -m "feat: add ContactFormPage with Zod validation (create + edit)"
```

---

### Task 19: ContactDetailPage

**Files:**
- Create: `src/ui/pages/ContactDetailPage.tsx`

- [ ] **Step 1: Créer `src/ui/pages/ContactDetailPage.tsx`**

```tsx
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Pencil, Trash2, Cake, Users } from 'lucide-react'
import { useGetContactById } from '@/application/contact/useGetContactById'
import { useDeleteContact } from '@/application/contact/useDeleteContact'
import { useGetGroupById } from '@/application/group/useGetGroupById'
import { getFullName, getNextAge, daysUntilBirthday } from '@/domain/contact/contactUtils'
import { GroupBadge } from '@/ui/components/GroupBadge'
import { LoadingSkeleton } from '@/ui/components/states/LoadingSkeleton'
import { ErrorState } from '@/ui/components/states/ErrorState'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

interface ContactDetailPageProps {
  contactId: string
}

export function ContactDetailPage({ contactId }: ContactDetailPageProps) {
  const navigate = useNavigate()
  const { toast } = useToast()
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
    toast({ title: 'Contact supprimé' })
    navigate({ to: '/contacts' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/contacts' })}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold flex-1">{getFullName(contact)}</h2>
        <Button
          variant="outline"
          size="icon"
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
```

- [ ] **Step 2: Compiler et commit**

```bash
npx tsc --noEmit
git add src/ui/pages/ContactDetailPage.tsx
git commit -m "feat: add ContactDetailPage with edit and delete actions"
```

---

### Task 20: GroupsPage + GroupDetailPage

**Files:**
- Create: `src/ui/pages/GroupsPage.tsx`
- Create: `src/ui/pages/GroupDetailPage.tsx`

- [ ] **Step 1: Créer `src/ui/pages/GroupsPage.tsx`**

```tsx
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
```

- [ ] **Step 2: Créer `src/ui/pages/GroupDetailPage.tsx`**

```tsx
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
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/groups' })}>
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
          onCta={() => navigate({ to: '/contacts/new' })}
        />
      ) : (
        <div className="space-y-2">
          {members.map((c) => (
            <ContactCard
              key={c.id}
              contact={c}
              group={group}
              onClick={() => navigate({ to: '/contacts/$id', params: { id: c.id } })}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Compiler et commit**

```bash
npx tsc --noEmit
git add src/ui/pages/GroupsPage.tsx src/ui/pages/GroupDetailPage.tsx
git commit -m "feat: add GroupsPage and GroupDetailPage"
```

---

## Chunk 7: Wiring Final — Router + Layout

### Task 21: Brancher toutes les routes dans le router

**Files:**
- Modify: `src/router.tsx`
- Modify: `src/main.tsx` (ajouter Toaster)

- [ ] **Step 1: Remplacer `src/router.tsx` avec toutes les routes**

```tsx
import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { Layout } from '@/ui/components/Layout'
import { HomePage } from '@/ui/pages/HomePage'
import { ContactsPage } from '@/ui/pages/ContactsPage'
import { ContactFormPage } from '@/ui/pages/ContactFormPage'
import { ContactDetailPage } from '@/ui/pages/ContactDetailPage'
import { GroupsPage } from '@/ui/pages/GroupsPage'
import { GroupDetailPage } from '@/ui/pages/GroupDetailPage'

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const contactsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts',
  component: ContactsPage,
})

const contactNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts/new',
  component: () => <ContactFormPage mode="create" />,
})

const contactDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts/$id',
  component: function ContactDetailRoute() {
    const { id } = contactDetailRoute.useParams()
    return <ContactDetailPage contactId={id} />
  },
})

const contactEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts/$id/edit',
  component: function ContactEditRoute() {
    const { id } = contactEditRoute.useParams()
    return <ContactFormPage mode="edit" contactId={id} />
  },
})

const groupsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/groups',
  component: GroupsPage,
})

const groupDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/groups/$id',
  component: function GroupDetailRoute() {
    const { id } = groupDetailRoute.useParams()
    return <GroupDetailPage groupId={id} />
  },
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  contactsRoute,
  contactNewRoute,
  contactDetailRoute,
  contactEditRoute,
  groupsRoute,
  groupDetailRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

- [ ] **Step 2: Ajouter le Toaster dans `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { router } from './router'
import { Toaster } from '@/components/ui/toaster'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
)
```

- [ ] **Step 3: Vérifier la compilation complète**

```bash
npx tsc --noEmit
```

Expected: aucune erreur TypeScript.

- [ ] **Step 4: Lancer l'app et vérifier manuellement**

```bash
npm run dev
```

Vérifier :
- [ ] Page d'accueil charge et affiche des contacts à venir
- [ ] Navigation sidebar fonctionne (desktop)
- [ ] Navigation bottom nav fonctionne (mobile, resize fenêtre)
- [ ] `/contacts` affiche la liste avec filtre groupe
- [ ] `/contacts/new` ouvre le formulaire, soumission redirige
- [ ] Cliquer un contact ouvre `/contacts/$id`
- [ ] `/groups` affiche les groupes avec compteurs
- [ ] Cliquer un groupe ouvre `/groups/$id` avec membres

- [ ] **Step 5: Commit final**

```bash
git add src/router.tsx src/main.tsx
git commit -m "feat: wire all routes and complete app integration"
```

---

### Task 22: Build de production

- [ ] **Step 1: Vérifier le build**

```bash
npm run build
```

Expected: dossier `dist/` généré sans erreur.

- [ ] **Step 2: Tester le build en local**

```bash
npm run preview
```

Expected: app fonctionne sur le port preview.

- [ ] **Step 3: Commit final**

```bash
git add .
git commit -m "chore: verify production build"
```

---

## Récapitulatif des fichiers créés

### Domain
- `src/domain/contact/Contact.ts`
- `src/domain/contact/Group.ts`
- `src/domain/contact/ContactRepository.ts`
- `src/domain/contact/contactUtils.ts`
- `src/domain/group/GroupRepository.ts`
- `src/domain/reminder/Reminder.ts`

### Infrastructure
- `src/infrastructure/contact/JsonContactRepository.ts`
- `src/infrastructure/group/JsonGroupRepository.ts`

### Application
- `src/application/repositories.ts`
- `src/application/contact/useGetContacts.ts`
- `src/application/contact/useGetContactById.ts`
- `src/application/contact/useCreateContact.ts`
- `src/application/contact/useUpdateContact.ts`
- `src/application/contact/useDeleteContact.ts`
- `src/application/group/useGetGroups.ts`
- `src/application/group/useGetGroupById.ts`
- `src/application/reminder/useGetUpcoming.ts`

### UI
- `src/ui/components/states/LoadingSkeleton.tsx`
- `src/ui/components/states/ErrorState.tsx`
- `src/ui/components/states/EmptyState.tsx`
- `src/ui/components/GroupBadge.tsx`
- `src/ui/components/ContactCard.tsx`
- `src/ui/components/UpcomingBanner.tsx`
- `src/ui/components/Layout.tsx`
- `src/ui/components/Sidebar.tsx`
- `src/ui/components/BottomNav.tsx`
- `src/ui/pages/HomePage.tsx`
- `src/ui/pages/ContactsPage.tsx`
- `src/ui/pages/ContactFormPage.tsx`
- `src/ui/pages/ContactDetailPage.tsx`
- `src/ui/pages/GroupsPage.tsx`
- `src/ui/pages/GroupDetailPage.tsx`

### Config
- `src/router.tsx`
- `src/lib/queryClient.ts`
- `public/data/contacts.json`
- `public/data/groups.json`

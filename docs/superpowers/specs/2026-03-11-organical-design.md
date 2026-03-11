# OrganiCal.ai — Design Spec
**Date:** 2026-03-11
**Approche:** BMAD / DDD Léger
**Stack:** React, Vite, ShadCN, TailwindCSS, TanStack Router, TanStack Query, Lucide React, Zod, react-hook-form

---

## 1. Vision

Application web front de gestion d'anniversaires. Permet de suivre les dates d'anniversaire de ses contacts, de les organiser par groupe (Famille, Amis, Travail), d'être rappelé à l'avance, et à terme de s'intégrer aux calendriers et canaux de notification externes.

**V1 scope :** frontend uniquement, données mockées en JSON, backend pluggable ultérieurement.

---

## 2. Architecture — DDD Léger

### Principe
4 couches isolées. Chaque couche ne connaît que celle du dessous. Le backend se plugge en remplaçant uniquement `infrastructure/`.

```
domain/        ← entités, value objects, interfaces repository (aucune dépendance externe)
application/   ← use cases via TanStack Query hooks (connaît domain/)
infrastructure/ ← implémentations concrètes des repositories (JSON mock → API future)
ui/            ← pages et composants ShadCN (consomme application/)
```

### Structure de fichiers

```
OrganiCalAI/
├── src/
│   ├── domain/
│   │   ├── contact/
│   │   │   ├── Contact.ts
│   │   │   ├── ContactRepository.ts
│   │   │   └── Group.ts
│   │   └── reminder/
│   │       └── Reminder.ts
│   ├── application/
│   │   ├── contact/
│   │   │   ├── useGetContacts.ts
│   │   │   ├── useGetContactById.ts
│   │   │   ├── useCreateContact.ts
│   │   │   ├── useUpdateContact.ts
│   │   │   └── useDeleteContact.ts
│   │   ├── group/
│   │   │   ├── useGetGroups.ts
│   │   │   └── useGetGroupById.ts
│   │   └── reminder/
│   │       └── useGetUpcoming.ts
│   ├── infrastructure/
│   │   ├── contact/
│   │   │   └── JsonContactRepository.ts
│   │   └── group/
│   │       └── JsonGroupRepository.ts
│   ├── ui/
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ContactsPage.tsx
│   │   │   ├── ContactDetailPage.tsx
│   │   │   ├── ContactFormPage.tsx
│   │   │   ├── GroupsPage.tsx
│   │   │   └── GroupDetailPage.tsx
│   │   └── components/
│   │       ├── ContactCard.tsx
│   │       ├── GroupBadge.tsx
│   │       ├── UpcomingBanner.tsx
│   │       └── states/
│   │           ├── LoadingSkeleton.tsx
│   │           ├── ErrorState.tsx
│   │           └── EmptyState.tsx
│   ├── router.tsx
│   └── main.tsx
├── public/
│   └── data/
│       ├── contacts.json
│       └── groups.json
└── docs/
    └── superpowers/specs/
```

---

## 3. Modèle de données

### Entités

```typescript
// domain/contact/Group.ts
type Group = {
  id: string
  name: string      // "Famille", "Amis", "Travail"
  color: string     // hex "#f97316"
}

// domain/contact/Contact.ts
type Contact = {
  id: string
  firstName: string
  lastName: string
  birthday: string  // ISO "1990-03-15"
  groupId: string
  notes?: string
}

// domain/reminder/Reminder.ts
type Reminder = {
  contactId: string
  daysAhead: number
  channel: 'sms' | 'email' | 'push'
}
```

### Logique métier (domain pur)

- `daysUntilBirthday(contact): number` — calcul ignorant l'année
- `isUpcoming(contact, days = 30): boolean` — filtre dashboard
- `getNextAge(contact): number` — âge au prochain anniversaire

### Mock data

```json
// public/data/groups.json
[
  { "id": "1", "name": "Famille", "color": "#f97316" },
  { "id": "2", "name": "Amis",    "color": "#3b82f6" },
  { "id": "3", "name": "Travail", "color": "#8b5cf6" }
]
```

---

## 4. Routing (TanStack Router)

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Upcoming 7j + ce mois-ci par groupe |
| `/contacts` | ContactsPage | Liste cards, filtre groupe, recherche |
| `/contacts/new` | ContactFormPage | Création contact |
| `/contacts/$id` | ContactDetailPage | Fiche + édition |
| `/groups` | GroupsPage | Liste groupes avec compteur membres |
| `/groups/$id` | GroupDetailPage | Nom du groupe + contacts membres |

---

## 5. Data Flow (TanStack Query)

- **Lecture :** `useQuery` → `Repository.getAll()` → fetch JSON mock
- **Mutations :** `useMutation` → no-op mock V1 → `invalidateQueries` sur succès
- **QueryClient config :** `staleTime: 5min`, `retry: 1`
- **Remplacement backend :** swap `JsonRepository` → `ApiRepository` sans toucher `application/` ni `ui/`

---

## 6. UI & Composants

- **ShadCN** : tous les composants de base (Button, Card, Input, Form, Toast, Skeleton, Badge)
- **Lucide React** : toutes les icônes
- **TailwindCSS** : styles utilitaires
- **Navigation :** sidebar fixe desktop / bottom nav mobile
- **Formulaires :** Zod + react-hook-form (natif ShadCN)

---

## 7. Gestion d'états UI

Chaque page gère systématiquement :
- `isLoading` → `<LoadingSkeleton />`
- `isError` → `<ErrorState />` avec retry
- `data.length === 0` → `<EmptyState />` avec CTA contextuel
- Succès mutations → Toast ShadCN

---

## 8. Intégrations futures (hors V1)

- Rappels : SMS, Email via API backend
- Calendriers : Google Agenda, Apple Calendar, Outlook (récurrence annuelle)
- Authentification utilisateur

---

## 9. Décisions techniques

| Décision | Choix | Raison |
|---|---|---|
| Architecture | DDD Léger | Discipline sans overhead, backend pluggable |
| Data V1 | JSON mock via fetch | Simple, remplaçable |
| Mutations V1 | Cache-only | Pas de backend, UX fluide |
| Icons | Lucide React | Cohérent ShadCN, tree-shakeable |
| Validation | Zod + react-hook-form | Natif ShadCN, typesafe |

import { Home, Users, UsersRound } from 'lucide-react'

export const navItems = [
  { to: '/', label: 'Accueil', icon: Home },
  // @ts-expect-error - routes /contacts and /groups added in Task 21
  { to: '/contacts', label: 'Contacts', icon: Users },
  // @ts-expect-error - routes /contacts and /groups added in Task 21
  { to: '/groups', label: 'Groupes', icon: UsersRound },
] as const

import { Home, Users, UsersRound } from 'lucide-react'

export const navItems = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/contacts', label: 'Contacts', icon: Users },
  { to: '/groups', label: 'Groupes', icon: UsersRound },
] as const

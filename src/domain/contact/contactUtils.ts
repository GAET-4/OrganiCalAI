import type { Contact } from './Contact'

/**
 * Nombre de jours jusqu'au prochain anniversaire (ignore l'année).
 * Retourne 0 si c'est aujourd'hui.
 */
export function daysUntilBirthday(contact: Contact): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
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

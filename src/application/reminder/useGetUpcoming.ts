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

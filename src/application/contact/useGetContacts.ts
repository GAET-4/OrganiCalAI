import { useQuery } from '@tanstack/react-query'
import { contactRepository } from '@/application/repositories'

export const CONTACTS_QUERY_KEY = ['contacts'] as const

export function useGetContacts() {
  return useQuery({
    queryKey: CONTACTS_QUERY_KEY,
    queryFn: () => contactRepository.getAll(),
  })
}

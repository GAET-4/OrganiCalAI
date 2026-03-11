import { useQuery } from '@tanstack/react-query'
import { contactRepository } from '@/application/repositories'
import { CONTACTS_QUERY_KEY } from './useGetContacts'

export function useGetContactById(id: string) {
  return useQuery({
    queryKey: [...CONTACTS_QUERY_KEY, id],
    queryFn: () => contactRepository.getById(id),
    enabled: !!id,
  })
}

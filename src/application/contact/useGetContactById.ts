import { useQuery } from '@tanstack/react-query'
import { contactRepository } from '@/application/repositories'

export function useGetContactById(id: string) {
  return useQuery({
    queryKey: ['contacts', id],
    queryFn: () => contactRepository.getById(id),
    enabled: !!id,
  })
}

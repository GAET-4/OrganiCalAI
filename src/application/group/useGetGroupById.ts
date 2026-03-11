import { useQuery } from '@tanstack/react-query'
import { groupRepository } from '@/application/repositories'

export function useGetGroupById(id: string) {
  return useQuery({
    queryKey: ['groups', id],
    queryFn: () => groupRepository.getById(id),
    enabled: !!id,
  })
}

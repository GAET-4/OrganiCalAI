import { useQuery } from '@tanstack/react-query'
import { groupRepository } from '@/application/repositories'
import { GROUPS_QUERY_KEY } from './useGetGroups'

export function useGetGroupById(id: string) {
  return useQuery({
    queryKey: [...GROUPS_QUERY_KEY, id],
    queryFn: () => groupRepository.getById(id),
    enabled: !!id,
  })
}

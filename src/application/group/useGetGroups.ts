import { useQuery } from '@tanstack/react-query'
import { groupRepository } from '@/application/repositories'

export const GROUPS_QUERY_KEY = ['groups'] as const

export function useGetGroups() {
  return useQuery({
    queryKey: GROUPS_QUERY_KEY,
    queryFn: () => groupRepository.getAll(),
  })
}

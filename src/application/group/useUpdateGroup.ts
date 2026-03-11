import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Group } from '@/domain/contact/Group'
import { groupRepository } from '@/application/repositories'
import { GROUPS_QUERY_KEY } from './useGetGroups'

export function useUpdateGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (group: Group) => groupRepository.save(group),
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: GROUPS_QUERY_KEY })
      const previous = queryClient.getQueryData<Group[]>(GROUPS_QUERY_KEY)
      queryClient.setQueryData<Group[]>(GROUPS_QUERY_KEY, (old = []) =>
        old.map((g) => (g.id === updated.id ? updated : g))
      )
      return { previous }
    },
    onError: (_err, _updated, context) => {
      if (context?.previous) {
        queryClient.setQueryData(GROUPS_QUERY_KEY, context.previous)
      }
    },
  })
}

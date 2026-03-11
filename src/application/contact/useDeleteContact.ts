import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Contact } from '@/domain/contact/Contact'
import { contactRepository } from '@/application/repositories'
import { CONTACTS_QUERY_KEY } from './useGetContacts'

export function useDeleteContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => contactRepository.delete(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: CONTACTS_QUERY_KEY })
      const previous = queryClient.getQueryData<Contact[]>(CONTACTS_QUERY_KEY)
      queryClient.setQueryData<Contact[]>(CONTACTS_QUERY_KEY, (old = []) =>
        old.filter((c) => c.id !== deletedId)
      )
      return { previous }
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CONTACTS_QUERY_KEY, context.previous)
      }
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Contact } from '@/domain/contact/Contact'
import { contactRepository } from '@/application/repositories'
import { CONTACTS_QUERY_KEY } from './useGetContacts'

export function useCreateContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contact: Contact) => contactRepository.save(contact),
    onMutate: async (newContact) => {
      await queryClient.cancelQueries({ queryKey: CONTACTS_QUERY_KEY })
      const previous = queryClient.getQueryData<Contact[]>(CONTACTS_QUERY_KEY)
      queryClient.setQueryData<Contact[]>(CONTACTS_QUERY_KEY, (old = []) => [
        ...old,
        newContact,
      ])
      return { previous }
    },
    onError: (_err, _newContact, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CONTACTS_QUERY_KEY, context.previous)
      }
    },
  })
}

import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useGetGroups } from '@/application/group/useGetGroups'
import { useCreateContact } from '@/application/contact/useCreateContact'
import { useUpdateContact } from '@/application/contact/useUpdateContact'
import { useGetContactById } from '@/application/contact/useGetContactById'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const contactSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  birthday: z.string().min(1, "La date d'anniversaire est requise"),
  groupId: z.string().min(1, 'Le groupe est requis'),
  notes: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormPageProps {
  mode: 'create' | 'edit'
  contactId?: string
}

export function ContactFormPage({ mode, contactId }: ContactFormPageProps) {
  const navigate = useNavigate()
  const { data: groups = [] } = useGetGroups()
  const { data: existingContact, isLoading: contactLoading } = useGetContactById(contactId ?? '')

  const createContact = useCreateContact()
  const updateContact = useUpdateContact()

  // Wait for existing contact data before rendering form to ensure defaultValues are set
  if (mode === 'edit' && contactLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </div>
    )
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: existingContact
      ? {
          firstName: existingContact.firstName,
          lastName: existingContact.lastName,
          birthday: existingContact.birthday,
          groupId: existingContact.groupId,
          notes: existingContact.notes ?? '',
        }
      : undefined,
  })

  const onSubmit = async (data: ContactFormData) => {
    const contact = {
      id: contactId ?? crypto.randomUUID(),
      ...data,
    }

    if (mode === 'create') {
      await createContact.mutateAsync(contact)
      toast.success('Contact ajouté avec succès')
    } else {
      await updateContact.mutateAsync(contact)
      toast.success('Contact mis à jour')
    }

    // @ts-ignore - route registered in Task 21
    navigate({ to: '/contacts' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() =>
          // @ts-ignore
          navigate({ to: '/contacts' })
        }>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">
          {mode === 'create' ? 'Nouveau contact' : 'Modifier le contact'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" {...register('firstName')} />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" {...register('lastName')} />
            {errors.lastName && (
              <p className="text-xs text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="birthday">Date d'anniversaire</Label>
          <Input id="birthday" type="date" {...register('birthday')} />
          {errors.birthday && (
            <p className="text-xs text-destructive">{errors.birthday.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="groupId">Groupe</Label>
          <select
            id="groupId"
            {...register('groupId')}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
          >
            <option value="">Choisir un groupe</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          {errors.groupId && (
            <p className="text-xs text-destructive">{errors.groupId.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes (optionnel)</Label>
          <textarea
            id="notes"
            {...register('notes')}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
            placeholder="Idées cadeaux, préférences..."
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={createContact.isPending || updateContact.isPending}
        >
          {mode === 'create' ? 'Ajouter le contact' : 'Enregistrer les modifications'}
        </Button>
      </form>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ChevronDown, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useGetGroups } from '@/application/group/useGetGroups'
import { useCreateContact } from '@/application/contact/useCreateContact'
import { useUpdateContact } from '@/application/contact/useUpdateContact'
import { useDeleteContact } from '@/application/contact/useDeleteContact'
import { useGetContactById } from '@/application/contact/useGetContactById'
import { AvatarPicker } from '@/ui/components/AvatarPicker'
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
  const deleteContact = useDeleteContact()

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(existingContact?.avatarUrl)

  // useForm must be called unconditionally (Rules of Hooks)
  // defaultValues is set after the loading guard renders, so existingContact is defined when the form mounts
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

  const onSubmit = async (data: ContactFormData) => {
    const contact = {
      id: contactId ?? crypto.randomUUID(),
      ...data,
      avatarUrl,
    }

    if (mode === 'create') {
      await createContact.mutateAsync(contact)
      toast.success('Personne ajoutée avec succès')
    } else {
      await updateContact.mutateAsync(contact)
      toast.success('Personne mise à jour')
    }

    navigate({ to: '/contacts' })
  }

  const handleDelete = async () => {
    if (!contactId) return
    await deleteContact.mutateAsync(contactId)
    toast.success('Personne supprimée')
    navigate({ to: '/contacts' })
  }

  const firstName = existingContact?.firstName ?? ''
  const lastName = existingContact?.lastName ?? ''
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || '?'

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() =>
          navigate({ to: '/contacts' })
        }>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">
          {mode === 'create' ? 'Nouvelle personne' : 'Modifier la personne'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center pb-2">
          <AvatarPicker
            value={avatarUrl}
            initials={initials}
            onChange={setAvatarUrl}
          />
        </div>

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
          <div className="relative">
            <select
              id="groupId"
              {...register('groupId')}
              className="flex h-10 w-full appearance-none rounded-xl border border-input bg-card px-4 py-2 pr-10 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
            >
              <option value="">Choisir un groupe</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          {errors.groupId && (
            <p className="text-xs text-destructive">{errors.groupId.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes (optionnel)</Label>
          <textarea
            id="notes"
            {...register('notes')}
            className="flex min-h-[100px] w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50 resize-none"
            placeholder="Idées cadeaux, préférences..."
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={createContact.isPending || updateContact.isPending}
        >
          {mode === 'create' ? 'Ajouter la personne' : 'Enregistrer les modifications'}
        </Button>

        {mode === 'edit' && (
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
            disabled={deleteContact.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer cette personne
          </Button>
        )}
      </form>
    </div>
  )
}

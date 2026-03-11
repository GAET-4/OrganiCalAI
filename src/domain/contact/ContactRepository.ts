import type { Contact } from './Contact'

export interface ContactRepository {
  getAll(): Promise<Contact[]>
  getById(id: string): Promise<Contact | undefined>
  save(contact: Contact): Promise<void>
  delete(id: string): Promise<void>
}

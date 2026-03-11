import type { ContactRepository } from '@/domain/contact/ContactRepository'
import type { Contact } from '@/domain/contact/Contact'

export class JsonContactRepository implements ContactRepository {
  private readonly url = '/data/contacts.json'

  async getAll(): Promise<Contact[]> {
    const res = await fetch(this.url)
    if (!res.ok) throw new Error('Failed to fetch contacts')
    return res.json()
  }

  async getById(id: string): Promise<Contact | undefined> {
    const contacts = await this.getAll()
    return contacts.find((c) => c.id === id)
  }

  // Mock V1 : les mutations ne persistent pas
  async save(_contact: Contact): Promise<void> {
    // No-op: persistence handled by TanStack Query cache
  }

  async delete(_id: string): Promise<void> {
    // No-op: persistence handled by TanStack Query cache
  }
}

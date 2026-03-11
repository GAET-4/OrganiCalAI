import type { GroupRepository } from '@/domain/group/GroupRepository'
import type { Group } from '@/domain/contact/Group'

export class JsonGroupRepository implements GroupRepository {
  private readonly url = '/data/groups.json'

  async getAll(): Promise<Group[]> {
    const res = await fetch(this.url)
    if (!res.ok) throw new Error('Failed to fetch groups')
    return res.json()
  }

  async getById(id: string): Promise<Group | undefined> {
    const groups = await this.getAll()
    return groups.find((g) => g.id === id)
  }

  // Mock V1 : persistence handled by TanStack Query cache
  async save(_group: Group): Promise<void> {}
}

import type { Group } from '@/domain/contact/Group'

export interface GroupRepository {
  getAll(): Promise<Group[]>
  getById(id: string): Promise<Group | undefined>
  save(group: Group): Promise<void>
}

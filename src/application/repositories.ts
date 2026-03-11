import { JsonContactRepository } from '@/infrastructure/contact/JsonContactRepository'
import { JsonGroupRepository } from '@/infrastructure/group/JsonGroupRepository'

export const contactRepository = new JsonContactRepository()
export const groupRepository = new JsonGroupRepository()

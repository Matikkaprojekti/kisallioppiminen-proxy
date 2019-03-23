import { client } from '../clients/apiClient'
import Teachinginstance from '../models/TeachingInstance'
import User from '../models/User'
import { ApiTeachingInstanceObject } from '../types/apiTypes'

const { userJoinsTeachingInstance, findOrCreateTeachinginstance, findUserById, findTeachingInstanceByCourseKey } = client

export function userJoinsTeachingInstanceService(user: User, teachingInstance: Teachinginstance): any {
  return userJoinsTeachingInstance(user, teachingInstance)
}

export function findOrCreateTeachingInstanceService(nt: Teachinginstance, token: string) {
  return findOrCreateTeachinginstance(nt, token)
}

export function findUserByIdService(userId: number): User {
  console.log('kutsuttu')
  return findUserById(userId)
}

export function findTeachingInstanceByCourseKeyService(key: string): any {
  return findTeachingInstanceByCourseKey()
}

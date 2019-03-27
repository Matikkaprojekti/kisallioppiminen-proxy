import { client } from '../clients/apiClient'
import Teachinginstance from '../models/TeachingInstance'
import User from '../models/User'
import { ApiTeachingInstanceObject } from '../types/apiTypes'

const { userJoinsTeachingInstance, findOrCreateTeachinginstance, findUserById, findTeachingInstanceByCourseKey } = client

export function userJoinsTeachingInstanceService(user: User, courseKey: string) {
  return userJoinsTeachingInstance(user, courseKey)
}

export function findOrCreateTeachingInstanceService(nt: Teachinginstance, token: string) {
  return findOrCreateTeachinginstance(nt, token)
}

export function findUserByIdService(userId: number): User {
  return findUserById(userId)
}

export function findTeachingInstanceByCourseKeyService(courseKey: string): any {
  return findTeachingInstanceByCourseKey(courseKey)
}

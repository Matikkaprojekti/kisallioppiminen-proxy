import { client } from '../clients/apiClient'
import Teachinginstance from '../models/TeachingInstance'
import User from '../models/User'
import { ApiTeachingInstanceObject } from '../types/apiTypes'

const {
  teacherCreatesTeachingInstance,
  getTeachingInstancesForUser,
  userJoinsTeachingInstance,
  userLeavesTeachingInstance,
  findOrCreateTeachinginstance,
  findUserById,
  findTeachingInstanceByCourseKey
} = client

export function teacherCreatesTeachingInstanceService(teachingInstance: Teachinginstance, token: string) {
  return teacherCreatesTeachingInstance(teachingInstance, token)
}

export function getTeachingInstancesForUserService(token: string, teacher: boolean) {
  return getTeachingInstancesForUser(token, teacher)
}
export function userJoinsTeachingInstanceService(token: string, user: User, coursekey: string) {
  return userJoinsTeachingInstance(token, user, coursekey)
}
export function userLeavesTeachingInstanceService(token: string, coursekey: string) {
  return userLeavesTeachingInstance(token, coursekey)
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

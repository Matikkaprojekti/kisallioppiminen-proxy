import { client } from '../clients/apiClient'
import Teachinginstance from '../models/TeachingInstance'

const {
  teacherCreatesTeachingInstance,
  getTeachingInstancesForUser,
  userJoinsTeachingInstance,
  userLeavesTeachingInstance,
  findOrCreateTeachinginstance,
  findTeachingInstanceByCourseKey,
  teacherDeletesTeachingInstance
} = client

export function teacherCreatesTeachingInstanceService(teachingInstance: Teachinginstance, token: string) {
  return teacherCreatesTeachingInstance(teachingInstance, token)
}

export function getTeachingInstancesForUserService(token: string, teacher: boolean) {
  return getTeachingInstancesForUser(token, teacher)
}
export function userJoinsTeachingInstanceService(token: string, coursekey: string) {
  return userJoinsTeachingInstance(token, coursekey)
}
export function userLeavesTeachingInstanceService(token: string, coursekey: string, teacher: string) {
  return userLeavesTeachingInstance(token, coursekey, teacher)
}

export function findOrCreateTeachingInstanceService(nt: Teachinginstance, token: string) {
  return findOrCreateTeachinginstance(nt, token)
}

export function findTeachingInstanceByCourseKeyService(courseKey: string): any {
  return findTeachingInstanceByCourseKey(courseKey)
}

export function teacherDeletesTeachingInstanceService(token: string, coursekey: string, teacher: string) {
  return teacherDeletesTeachingInstance(token, coursekey, teacher)
}

import { client } from '../clients/apiClient'
import Teachinginstance from '../models/TeachingInstance'

const {
  teacherCreatesTeachingInstance,
  getTeachingInstancesForUser,
  userJoinsTeachingInstance,
  findOrCreateTeachinginstance,
  findTeachingInstanceByCourseKey,
  leaveOrDeleteTeachingInstance
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

export function findOrCreateTeachingInstanceService(nt: Teachinginstance, token: string) {
  return findOrCreateTeachinginstance(nt, token)
}

export function findTeachingInstanceByCourseKeyService(courseKey: string): any {
  return findTeachingInstanceByCourseKey(courseKey)
}

export function leaveOrDeleteTeachingInstanceService(token: string, coursekey: string, teacher: boolean) {
  return leaveOrDeleteTeachingInstance(token, coursekey, teacher)
}

import { UserApiResponse, ApiCourseObject, ApiNewCoursePostObject } from '../types/apiTypes'
import user from '../mockdata/user.json'
import Bluebird from 'bluebird'
import allScoreboards from '../mockdata/allScoreboards.json'
import userCourses from '../mockdata/userCourses.json'
import courses from '../mockdata/courses.json'
import teachingInstances from '../mockdata/teachingInstances.json'
import Teachinginstance from '../models/TeachingInstance'

export function findUserById(__: number) {
  return Bluebird.resolve(user as UserApiResponse)
}

export function findTeachingInstanceByCourseKey() {
  return Bluebird.resolve(teachingInstances['1'] as Teachinginstance[])
}

export function findOrCreateTeachinginstance(newTeachingInstance: Teachinginstance, token: string): Bluebird<Teachinginstance[]> {
  return Bluebird.resolve(teachingInstances['1'] as Teachinginstance[])
}

export function getUserWithToken(_: string): Bluebird<UserApiResponse> {
  return Bluebird.resolve(user as UserApiResponse)
}

export function getAllScoreboards(_: string, __: number): Bluebird<ApiCourseObject[]> {
  return Bluebird.resolve(allScoreboards as ApiCourseObject[])
}

export function getUserCourses(_: string): Bluebird<ApiCourseObject[]> {
  return Bluebird.resolve(userCourses['420'] as ApiCourseObject[])
}

export function createCourseInstance(_: string, course: ApiNewCoursePostObject) {
  const nextId = courses['53'][courses['53'].length - 1].id + 1
  courses['53'].push({
    id: nextId,
    archived: false,
    ...course
  })
  return Bluebird.resolve(courses['53'])
}

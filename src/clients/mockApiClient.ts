import { UserApiResponse, ApiCourseObject, ApiNewCoursePostObject } from '../types/apiTypes'
import user from '../mockdata/user.json'
import Bluebird from 'bluebird'
import allScoreboards from '../mockdata/allScoreboards.json'
import courses from '../mockdata/courses.json'

export function getUserWithSessionCookie(_: string): Bluebird<UserApiResponse> {
  return Bluebird.resolve(user as UserApiResponse)
}

export function getAllScoreboards(_: string): Bluebird<ApiCourseObject[]> {
  return Bluebird.resolve(allScoreboards as ApiCourseObject[])
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

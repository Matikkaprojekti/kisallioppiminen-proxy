import request from 'request-promise'
import Bluebird from 'bluebird'
import { UserApiResponse, ApiNewCoursePostObject, ApiCourseObject, ApiTeachingInstanceObject } from '../types/apiTypes'
import { resolveEnvVar } from '../utils/resolveEnvironmentVariable'
import Teachinginstance from '../models/TeachingInstance'
import User from '../models/User'
import UsersTeachingInstance from '../models/UsersTeachingInstance'

const ENTRYPOINT = resolveEnvVar('BACKEND_ENTRYPOINT')

const resolveUrl = (endpoint: string) => ENTRYPOINT + endpoint

export function findUserById(__: number): any {
  return null
}

export function findTeachingInstanceByCourseKey(courseKey: string): any {
  return null
}

export function userJoinsTeachingInstance(user: User, courseKey: string): Bluebird<UsersTeachingInstance> {
  return null
}

export function findOrCreateTeachinginstance(newTeachingInstance: Teachinginstance, token: string) {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    },
    json: newTeachingInstance.courseKey
  }
  return request
    .post(resolveUrl('/teachinginstances/join' + newTeachingInstance.courseKey), opts)
    .then(JSON.parse)
    .then(res => res)
}

export function getUserCourses(token: string): Bluebird<UsersTeachingInstance[]> {
  return Bluebird.resolve([])
}

export function getUserWithToken(token: string): Bluebird<UserApiResponse> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    }
  }
  return request
    .get(resolveUrl('/users/me'), opts)
    .then(JSON.parse)
    .then(res => res as UserApiResponse)
    .catch(e => {
      console.error(e)
      return null
    })
}

export function getAllScoreboards(token: string, teacherId: number): Bluebird<ApiCourseObject[]> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    }
  }
  return request
    .get(resolveUrl(`/teachers/${teacherId}/scoreboards`), opts) // 43 on kovakoodattu ja tulee muuttaa tähän oman tunnuksen id...
    .then(JSON.parse)
    .then(res => res)
    .catch(e => {
      console.error(e)
      return { has_sign_in: null }
    })
}

export function createCourseInstance(token: string, course: ApiNewCoursePostObject): Bluebird<any> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    },
    json: course
  }
  return request
    .post(resolveUrl('/courses/newcourse'), opts) // 43 on kovakoodattu ja tulee muuttaa tähän oman tunnuksen id... -Entä jossei muista omaa id:tä?
    .then(JSON.parse)
    .then(res => res)
}

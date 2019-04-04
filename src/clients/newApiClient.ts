import request from 'request-promise'
import Bluebird from 'bluebird'
import { UserApiResponse, ApiNewCoursePostObject, ApiCourseObject, ApiTeachingInstanceObject } from '../types/apiTypes'
import { resolveEnvVar } from '../utils/resolveEnvironmentVariable'
import Teachinginstance from '../models/TeachingInstance'
import User from '../models/User'
import UsersTeachingInstance from '../models/UsersTeachingInstance'

const ENTRYPOINT = resolveEnvVar('BACKEND_ENTRYPOINT')

const resolveUrl = (endpoint: string) => ENTRYPOINT + endpoint

export function updateOrCreateTrafficlight(token: string, exercise_uuid: string, coursekey: string, status: string, user_id: number): Bluebird<{}> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    },
    json: { status, coursekey }
  }
  return request.put(resolveUrl('/trafficlights/' + exercise_uuid), opts).then(res => {
    console.log(res)
    return res
  })
}

export function getTeachingInstancesForUser(token: string, teacher: string): Bluebird<UsersTeachingInstance[]> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    }
  }
  const pathparam = teacher === 'true' ? '?teacher=true' : '?teacher=false'
  return request
    .get(resolveUrl(`/teachinginstances${pathparam}`), opts)
    .then(res => res)
    .then(JSON.parse)
    .then(res => res as UsersTeachingInstance[])
    .catch(e => {
      console.error(e)
      return null
    })
}

export function findUserById(id: number): any {
  console.log('menee123456')
  return null
}

export function findTeachingInstanceByCourseKey(courseKey: string): any {
  return null
}

export function teacherCreatesTeachingInstance(teachingInstance: Teachinginstance, token: string): Bluebird<Teachinginstance> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    },
    json: teachingInstance
  }
  return (
    request
      .post(resolveUrl('/teachinginstances'), opts)
      // .then(JSON.parse)
      .then(res => res)
  )
}

export function userJoinsTeachingInstance(token: string, user: User, coursekey: string): Bluebird<UsersTeachingInstance> {
  console.log('pitäis tulla tänne')
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    },
    json: { coursekey }
  }
  console.log('coursekey = ', coursekey)
  return (
    request
      .patch(resolveUrl('/teachinginstances'), opts)
      // .then(JSON.parse)
      .then(res => res)
  )
}

export function findOrCreateTeachinginstance(newTeachingInstance: Teachinginstance, token: string) {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Authorization: token
    },
    json: newTeachingInstance.coursekey
  }
  return request
    .post(resolveUrl('/teachinginstances'), opts)
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

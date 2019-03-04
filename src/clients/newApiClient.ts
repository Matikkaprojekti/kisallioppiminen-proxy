import request from 'request-promise'
import Bluebird from 'bluebird'
import { UserApiResponse, ApiNewCoursePostObject, ApiCourseObject } from '../types/apiTypes'

const ENTRYPOINT = process.env.NODE_ENV === 'staging' ? process.env.STAGING_BACKEND_ENTRYPOINT : process.env.PROD_BACKEND_ENTRYPOINT

const resolveUrl = (endpoint: string) => ENTRYPOINT + endpoint

export function getUserWithSessionCookie(userSessionCookie: string): Bluebird<UserApiResponse> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Cookie: `connect.sid=${userSessionCookie}`
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

export function getAllScoreboards(userSessionCookie: string, teacherId: number): Bluebird<ApiCourseObject[]> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Cookie: `_kisallioppiminen_server_session=${userSessionCookie}`
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

export function createCourseInstance(userSessionCookie: string, course: ApiNewCoursePostObject): Bluebird<any> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Cookie: `_kisallioppiminen_server_session=${userSessionCookie}`
    },
    json: course
  }
  return request
    .post(resolveUrl('/courses/newcourse'), opts) // 43 on kovakoodattu ja tulee muuttaa tähän oman tunnuksen id...
    .then(JSON.parse)
    .then(res => res)
}

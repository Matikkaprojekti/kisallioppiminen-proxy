import { UserApiResponse, ApiCourseObject } from './apiClient'
import user from '../mockdata/user.json'
import Bluebird from 'bluebird'
import allScoreboards from '../mockdata/allScoreboards.json'
import scoreboard from '../mockdata/scoreboard.json'

export function getUserWithSessionCookie(_: string): Bluebird<UserApiResponse> {
  return Bluebird.resolve(user as UserApiResponse)
}

export function getAllScoreboards(_: string): Bluebird<ApiCourseObject[]> {
  return Bluebird.resolve(allScoreboards as ApiCourseObject[])
}

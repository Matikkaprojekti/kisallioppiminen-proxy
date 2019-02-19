import { UserApiResponse } from './apiClient'
import user from '../mockdata/user.json'
import Bluebird from 'bluebird'

export function getUserWithSessionCookie(_: string): Bluebird<UserApiResponse> {
  return Bluebird.resolve(user as UserApiResponse)
}

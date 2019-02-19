import request from 'request-promise'
import Bluebird from 'bluebird'
import { UserApiResponse } from './apiClient'

const ENTRYPOINT = process.env.NODE_ENV === 'staging' ? process.env.STAGING_BACKEND_ENTRYPOINT : process.env.PROD_BACKEND_ENTRYPOINT

const resolveUrl = (endpoint: string) => ENTRYPOINT + endpoint

export function getUserWithSessionCookie(userSessionCookie: string): Bluebird<UserApiResponse> {
  const opts: request.RequestPromiseOptions = {
    headers: {
      Cookie: `_kisallioppiminen_server_session=${userSessionCookie}`
    }
  }
  console.log(opts)
  return request
    .get(resolveUrl('/user/get_session_user'), opts)
    .then(JSON.parse)
    .then(res => res as UserApiResponse)
    .catch(e => {
      console.error(e)
      return {has_sign_in: null}
    })
}

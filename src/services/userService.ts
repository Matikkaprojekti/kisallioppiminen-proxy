import request from 'request-promise'
import {getUserWithSessionCookie} from '../clients/oldApiClient'

export function getUser(sessionCookie: string) {
  return getUserWithSessionCookie(sessionCookie)
    .then(({has_sign_in}) => has_sign_in)
}

import request from 'request-promise'
import {client} from '../clients/apiClient'

const {getUserWithSessionCookie} = client

export function getUser(sessionCookie: string) {
  return getUserWithSessionCookie(sessionCookie)
    .then(({has_sign_in}) => has_sign_in)
}

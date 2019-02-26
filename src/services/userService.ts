import {client} from '../clients/apiClient'

const {getUserWithSessionCookie} = client

export function getUser(sessionCookie: string) {
  return getUserWithSessionCookie(sessionCookie)
}

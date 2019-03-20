import {client} from '../clients/apiClient'

const {getUserWithSessionCookie} = client

export function getUser(token: string) {
  return getUserWithSessionCookie(token)
}

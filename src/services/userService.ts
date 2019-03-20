import { client } from '../clients/apiClient'

const { getUserWithToken } = client

export function getUser(token: string) {
  return getUserWithToken(token)
}

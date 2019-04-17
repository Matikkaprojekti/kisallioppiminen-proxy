import { client } from '../clients/apiClient'

const { updateOrCreateTrafficlight } = client

export function updateOrCreateTrafficlightService(token: string, exercise_uuid: string, coursekey: string, status: string) {
  return updateOrCreateTrafficlight(token, exercise_uuid, coursekey, status)
}

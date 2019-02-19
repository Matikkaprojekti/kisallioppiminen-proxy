import * as OldApiClient from './oldApiClient'

export interface UserApiResponse {
  has_sign_in: {
    id: number,
    first_name: string,
    teacher: boolean,
    student: boolean
  } | null
}

const clients: typeof OldApiClient = {
  getUserWithSessionCookie: OldApiClient.getUserWithSessionCookie
}

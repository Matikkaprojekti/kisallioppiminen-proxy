import * as OldApiClient from './oldApiClient'
import * as MockApiClient from './mockApiClient'

export interface UserApiResponse {
  has_sign_in: {
    id: number
    first_name: string
    teacher: boolean
    student: boolean
  } | null
}

export interface ApiCourseObject {
  id: number
  coursekey: string
  html_id: string
  startdate: string
  enddate: string
  name: string
  students: any[]
}

const selectedClient = process.env.NODE_ENV === 'test' ? MockApiClient : OldApiClient

export const client: typeof OldApiClient & typeof MockApiClient = {
  getUserWithSessionCookie: selectedClient.getUserWithSessionCookie,
  getAllScoreboards: selectedClient.getAllScoreboards
}

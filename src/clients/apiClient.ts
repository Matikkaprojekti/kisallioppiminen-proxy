import * as OldApiClient from './oldApiClient'
import * as MockApiClient from './mockApiClient'

const selectedClient = process.env.NODE_ENV === 'test' ? MockApiClient : OldApiClient

export const client: typeof OldApiClient & typeof MockApiClient = {
  getUserWithSessionCookie: selectedClient.getUserWithSessionCookie,
  getAllScoreboards: selectedClient.getAllScoreboards,
  createCourseInstance: selectedClient.createCourseInstance
}

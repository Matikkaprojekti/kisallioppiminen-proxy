import * as newApiClient from './newApiClient'
import * as MockApiClient from './mockApiClient'

const selectedClient = process.env.NODE_ENV === 'test' ? MockApiClient : newApiClient

export const client: typeof newApiClient & typeof MockApiClient = {
  userJoinsTeachingInstance: selectedClient.userJoinsTeachingInstance,
  findUserById: selectedClient.findUserById,
  findTeachingInstanceByCourseKey: selectedClient.findTeachingInstanceByCourseKey,
  findOrCreateTeachinginstance: selectedClient.findOrCreateTeachinginstance,
  getUserWithToken: selectedClient.getUserWithToken,
  getAllScoreboards: selectedClient.getAllScoreboards,
  createCourseInstance: selectedClient.createCourseInstance,
  getUserCourses: selectedClient.getUserCourses
}

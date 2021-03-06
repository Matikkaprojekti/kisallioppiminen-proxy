import * as newApiClient from './newApiClient'
import * as MockApiClient from './mockApiClient'

const selectedClient = process.env.NODE_ENV === 'test' ? MockApiClient : newApiClient

export const client: typeof newApiClient & typeof MockApiClient = {
  updateOrCreateTrafficlight: selectedClient.updateOrCreateTrafficlight,
  teacherCreatesTeachingInstance: selectedClient.teacherCreatesTeachingInstance,
  getTeachingInstancesForUser: selectedClient.getTeachingInstancesForUser,
  userJoinsTeachingInstance: selectedClient.userJoinsTeachingInstance,
  findTeachingInstanceByCourseKey: selectedClient.findTeachingInstanceByCourseKey,
  findOrCreateTeachinginstance: selectedClient.findOrCreateTeachinginstance,
  getUserWithToken: selectedClient.getUserWithToken,
  getAllScoreboards: selectedClient.getAllScoreboards,
  createCourseInstance: selectedClient.createCourseInstance,
  getUserCourses: selectedClient.getUserCourses,
  leaveOrDeleteTeachingInstance: selectedClient.leaveOrDeleteTeachingInstance
}

import { UserApiResponse, ApiCourseObject, ApiNewCoursePostObject, ApiTeachingInstanceObject, ApiCourseStudent } from '../types/apiTypes'
import userMock from '../mockdata/user.json'
import Bluebird from 'bluebird'
import allScoreboards from '../mockdata/allScoreboards.json'
import courses from '../mockdata/courses.json'
import teachingInstanceMock from '../mockdata/teachingInstances.json'
import usersTeachingInstancesMock from '../mockdata/usersTeachingInstances.json'
import TeachingInstance from '../models/TeachingInstance'
import User from '../models/User'
import UsersTeachingInstance from '../models/UsersTeachingInstance'

const teachingInstancesMockData = teachingInstanceMock
const usersTeachingInstancesMockData = usersTeachingInstancesMock

export function userJoinsTeachingInstance(student: User, courseKey: string): Bluebird<UsersTeachingInstance> {
  const ti = teachingInstancesMockData.find(e => e.courseKey === courseKey)
  if (ti) {
    const uti = <UsersTeachingInstance> {
      coursekey: ti.name,
      courseinfo: ti.courseKey,
      coursematerial_name: ti.coursematerial_version,
      version: ti.startdate,
      name: ti.enddate,
      startdate: ti.startdate,
      enddate: ti.enddate,
      owner_id: 1,
      students: [
        {
          firstname: student.name,
          lastname: student.name,
          exercises: []
        }
      ]
    }
    usersTeachingInstancesMockData['420'].push(uti)
    return Bluebird.resolve(uti as UsersTeachingInstance)
  }
  return null
}

export function findUserById(__: number) {
  const student = userMock.id === __ ? userMock : null
  console.log(student)
  return Bluebird.resolve(student as UserApiResponse)
}

export function findTeachingInstanceByCourseKey(courseKey: string): Bluebird<TeachingInstance> {
  const ti = teachingInstanceMock.find(e => e.courseKey === courseKey)
  return Bluebird.resolve(ti as TeachingInstance)
}

export function findOrCreateTeachinginstance(newTeachingInstance: TeachingInstance, token: string) {
  return Bluebird.resolve(teachingInstanceMock as TeachingInstance[])
}

export function getUserWithToken(_: string): Bluebird<UserApiResponse> {
  return Bluebird.resolve(userMock as UserApiResponse)
}

export function getAllScoreboards(_: string, __: number): Bluebird<ApiCourseObject[]> {
  // return Bluebird.resolve(allScoreboards as ApiCourseObject[])
  return null
}

export function getUserCourses(_: string): Bluebird<UsersTeachingInstance[]> {
  return Bluebird.resolve(usersTeachingInstancesMockData['420'] as UsersTeachingInstance[])
}

export function createCourseInstance(_: string, course: ApiNewCoursePostObject) {
  const nextId = courses['53'][courses['53'].length - 1].id + 1
  courses['53'].push({
    id: nextId,
    archived: false,
    ...course
  })
  return Bluebird.resolve(courses['53'])
}

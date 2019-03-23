import { UserApiResponse, ApiCourseObject, ApiNewCoursePostObject, ApiTeachingInstanceObject } from '../types/apiTypes'
import userMock from '../mockdata/user.json'
import Bluebird from 'bluebird'
import allScoreboards from '../mockdata/allScoreboards.json'
import courses from '../mockdata/courses.json'
import teachingInstanceMock from '../mockdata/teachingInstances.json'
import usersTeachingInstances from '../mockdata/usersTeachingInstances.json'
import TeachingInstance from '../models/TeachingInstance'
import User from '../models/User'
import UsersTeachingInstance from '../models/UsersTeachingInstance'
import { number, string } from 'joi'

export function userJoinsTeachingInstance(student: User, teachingInstance: TeachingInstance) {
  teachingInstanceMock['1'].forEach(ti => {
    if (ti.coursekey === teachingInstance.coursekey) {
      ti.students.push(student)
    }
  })
  usersTeachingInstances['420'].forEach(ti => {
    if (ti.coursekey === teachingInstance.coursekey) {
      ti.students.push({
        user: student.name,
        exercises: [
          {
            id: '3BA56960-503F-4697-B508-9F4A3EEAC41B',
            status: 'green'
          },
          {
            id: 'CA5CC927-2800-427C-AD31-4FD0DD06C068',
            status: 'yellow'
          },
          {
            id: '12a9f39a-3b49-11e9-a38a-09f848b19644',
            status: 'red'
          }
        ]
    })
  }

  })

  const foo = <UsersTeachingInstance> {
    name: teachingInstance.name,
    coursekey: teachingInstance.coursekey,
    id: '1',
    version: teachingInstance.coursematerial_version,
    startdate: teachingInstance.startdate,
    enddate: teachingInstance.enddate,
    students: teachingInstance.students,
    exerciseNumbers: []
  }

  return Bluebird.resolve(foo as UsersTeachingInstance)
}

export function findUserById(__: number) {
  console.log('kutsuttu 2')
  const student = userMock.id === __ ? userMock : null
  console.log(student)
  return Bluebird.resolve(student as UserApiResponse)
}

export function findTeachingInstanceByCourseKey() {
  return Bluebird.resolve(teachingInstanceMock['1'] as TeachingInstance[])
}

export function findOrCreateTeachinginstance(newTeachingInstance: TeachingInstance, token: string) {
  return Bluebird.resolve(teachingInstanceMock['1'] as TeachingInstance[])
}

export function getUserWithToken(_: string): Bluebird<UserApiResponse> {
  return Bluebird.resolve(userMock as UserApiResponse)
}

export function getAllScoreboards(_: string, __: number): Bluebird<ApiCourseObject[]> {
  return Bluebird.resolve(allScoreboards as ApiCourseObject[])
}

export function getUserCourses(_: string): Bluebird<ApiCourseObject[]> {
  return Bluebird.resolve(usersTeachingInstances['420'] as ApiCourseObject[])
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

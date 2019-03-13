import { client } from '../clients/apiClient'
import { Course, ApiNewCoursePostObject } from '../types/apiTypes'
import courseSchema from '../schemas/course'
import Bluebird from 'bluebird'

const { createCourseInstance, getUserCourses } = client

export function createCourse(sessionCookie: string, course: Course) {
  const validatedCourse = validateCourse(course)
  if (!validatedCourse) {
    return Bluebird.reject({ error: 'Invalid post body', statusCode: 400 })
  }
  return createCourseInstance(sessionCookie, validatedCourse)
}

// export function joinCourse(sessionCookie: string, courseKey: string) {}

export function getCoursesForUser(sessionCookie: string) {
  return getUserCourses(sessionCookie)
}

function validateCourse(course: Course): ApiNewCoursePostObject {
  course = {
    ...course,
    startdate: new Date(course.startdate),
    enddate: new Date(course.enddate)
  }
  const { error, value } = courseSchema.validate(course)
  if (error) {
    return null
  }
  const { startdate, enddate } = value
  return {
    ...value,
    startdate: startdate.toISOString().split('T')[0],
    enddate: enddate.toISOString().split('T')[0]
  }
}

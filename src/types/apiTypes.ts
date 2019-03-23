export interface UserApiResponse {
  id: number
  name: string
}

export interface ApiCourseObject {
  id: number
  coursekey: string
  html_id: string
  teacher: boolean
  version: string
  startdate: string
  enddate: string
  name: string
  students: ApiCourseStudent[]
}

export interface ApiCourseStudent {
  user: string
  exercises: Array<{ id: string; status: string }>
}

export interface ApiNewCoursePostObject {
  coursekey: string
  name: string
  html_id: string
  startdate: string
  enddate: string
}

export interface ApiTeachingInstanceObject {
  coursekey: string
  courseinfo: string
  name: string
  startdate: string
  enddate: string
  coursematerial_name: string
  coursematerial_version: number
  students: ApiCourseStudent[]
}

export interface Course {
  coursekey: string
  name: string
  html_id: string
  startdate: Date
  enddate: Date
}

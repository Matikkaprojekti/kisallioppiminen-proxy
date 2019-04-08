import Student from './Student'

export default interface Teachinginstance {
  coursekey: string
  name: string
  startdate: string
  enddate: string
  coursematerial_name: string
  version: string
  owner_id: number
  students: Student[]
}

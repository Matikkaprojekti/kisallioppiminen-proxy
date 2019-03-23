import User from './User'

export default interface UsersTeachingInstance {
  name: string
  coursekey: string
  id: string
  version: string
  startdate: string
  enddate: string
  students: User[]
  exerciseNumbers: string[]
}

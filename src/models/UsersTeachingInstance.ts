export default interface UsersTeachingInstance {
  name: string
  courseKey: string
  id: number,
  html_id: string
  teacher: boolean
  version: string
  startdate: string
  enddate: string
  students: [
    {
      username: string,
      exercises: Array<{ id: string; status: string }>
    }
  ]
}

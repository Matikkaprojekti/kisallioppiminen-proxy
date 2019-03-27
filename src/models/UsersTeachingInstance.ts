export default interface UsersTeachingInstance {
  coursekey: string
  courseinfo: string
  coursematerial_name: string
  version: string
  name: string
  startdate: string
  enddate: string
  owner_id: number
  students: [
    {
      firstname: string
      lastname: string
      exercises: Array<{ id: string; status: string }>
    }
  ]
}

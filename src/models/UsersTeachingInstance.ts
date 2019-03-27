export default interface UsersTeachingInstance {
  coursekey: string
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
      exercises: Array<{ uuid: string; status: string }>
    }
  ]
}

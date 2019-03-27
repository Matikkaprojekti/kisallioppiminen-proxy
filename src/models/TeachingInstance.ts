export default interface Teachinginstance {
  courseKey: string
  courseinfo: string
  name: string
  startdate: string
  enddate: string
  coursematerial_name: string
  coursematerial_version: string
  students: Array<{ user_id: number; username: string }>
}

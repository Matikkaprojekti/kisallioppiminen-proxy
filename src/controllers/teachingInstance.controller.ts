import { Router, Request, Response } from 'express'
import {
  userJoinsTeachingInstanceService,
  findUserByIdService,
  // findOrCreateTeachingInstanceService,
  findTeachingInstanceByCourseKeyService,
  getTeachingInstancesForUserService,
  teacherCreatesTeachingInstanceService
} from '../services/teachingInstanceService'
import { UserRequest } from '../middlewares/userAuthMiddleware'
import { fetchUser } from '../middlewares/userAuthMiddleware'
import Student from '../models/Student'

const router: Router = Router()

router.get('/', fetchUser, (req: UserRequest, res: Response) => {
  console.log('gettii tulee')
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const studentId = req.user.id
  const token = req.get('Authorization')
  const teacher = req.query.teacher === 'true'
  getTeachingInstancesForUserService(token, teacher).then(teachingInstances => res.json(teachingInstances))
})

router.post('/', fetchUser, async (req: UserRequest, res: Response) => {
  console.log('se on tää')
  const { coursekey, courseinfo, name, startdate, enddate, coursematerial_name, version } = req.body
  console.log(req.body)
  const students: Student[] = []

  const token = req.get('Authorization')
  console.log('token = ', token)
  console.log('coursekey = ', coursekey)
  console.log('coursematerial_name = ', coursematerial_name)
  console.log('version = ', version)
  console.log('name = ', name)
  console.log('startdate = ', startdate)
  console.log('enddate = ', enddate)
  const ownerId = req.user.id
  console.log('ownerId = ', ownerId)

  // const teachingInstance = {
  //   coursekey,
  //   name,
  //   startdate,
  //   enddate,
  //   coursematerial_name,
  //   version,
  //   owner_id: req.user.user_id
  //   students
  // }
  // console.log(teachingInstance)

  // Check that required params are present
  if (coursekey && coursematerial_name && version && name && startdate && enddate) {
    console.log('eka')
    const result = await teacherCreatesTeachingInstanceService(req.body, token).catch(response => {
      res.status(400).json({ error: response.error.error })
    })
    // const jsonresult = res.json(result)
    console.log('result:::::::::::::::::::::::::::::::::::::::::::::::::::::: ', result)
    res.json(result)
  } else {
    res.status(400)
    res.json({ error: 'Please check your input!' })
  }
})
router.patch('/', fetchUser, async (req: UserRequest, res: Response) => {
  console.log('tulee patchii')
  const studentId = req.user.id
  const coursekey = req.body.coursekey
  const user = await findUserByIdService(studentId)
  const token = req.get('Authorization')
  if (coursekey) {
    // userJoinsTeachingInstanceService(token, user, coursekey).then(teachingInstance => res.json(teachingInstance))
    const result = await userJoinsTeachingInstanceService(token, user, coursekey)
    res.send(result)
  } else {
    res.status(400)
    res.json({ error: 'Bad request' })
  }
})

export const teachingInstanceController: Router = router

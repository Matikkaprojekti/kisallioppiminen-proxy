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

const router: Router = Router()

router.get('/', fetchUser, (req: UserRequest, res: Response) => {
  const studentId = req.user.id
  const token = req.get('Authorization')
  getTeachingInstancesForUserService(token).then(teachingInstances => res.json(teachingInstances))
})

router.post('/', (req: Request, res: Response) => {
  const { courseKey, courseinfo, name, startdate, enddate, coursematerial_name, coursematerial_version } = req.body

  const token = req.get('Authorization')
  const teachingInstance = {
    coursekey: req.body.coursekey,
    name: req.body.name,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    coursematerial_name: req.body.coursematerial_name,
    coursematerial_version: req.body.coursematerial_version,
    owner_id: req.body.user.id
  }

  // Check that required params are present
  if (courseKey && coursematerial_name && coursematerial_version && name && startdate && enddate) {
    const result = teacherCreatesTeachingInstanceService(teachingInstance, token)
    const jsonresult = res.json(result)
    res.json(jsonresult)
  } else {
    res.status(400)
    res.json({ error: 'Bad request' })
  }
})
router.patch('/', fetchUser, (req: UserRequest, res: Response) => {
  const studentId = req.user.id
  const coursekey = req.body.coursekey
  const user = findUserByIdService(studentId)
  const token = req.get('Authorization')
  console.log('user = ', user)
  console.log('coursekey = ', coursekey)
  console.log('token = ', token)
  if (user && coursekey) {
    userJoinsTeachingInstanceService(token, user, coursekey).then(teachingInstance => res.json(teachingInstance))
  } else {
    res.status(400)
    res.json({ error: 'Bad request' })
  }
})

export const TeachingInstanceController: Router = router

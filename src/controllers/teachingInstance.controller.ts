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

router.post('/', fetchUser, (req: UserRequest, res: Response) => {
  console.log('se on tää')
  const { coursekey, courseinfo, name, startdate, enddate, coursematerial_name, version } = req.body
  console.log(req.body)

  const token = req.get('Authorization')
  console.log('token = ', token)
  console.log('coursekey = ', coursekey)
  console.log('coursematerial_name = ', coursematerial_name)
  console.log('coursematerial_version = ', version)
  console.log('name = ', name)
  console.log('startdate = ', startdate)
  console.log('enddate = ', enddate)
  const ownerId = req.user.id
  console.log('ownerId = ', ownerId)

  const teachingInstance = {
    coursekey,
    name,
    startdate,
    enddate,
    coursematerial_name,
    version,
    owner_id: ownerId
  }
  console.log(teachingInstance)

  // Check that required params are present
  if (coursekey && coursematerial_name && version && name && startdate && enddate) {
    console.log('eka')
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

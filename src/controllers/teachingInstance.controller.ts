import { Router, Request, Response } from 'express'
import {
  userJoinsTeachingInstanceService,
  userLeavesTeachingInstanceService,
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
  const token = req.get('Authorization')
  const teacher = req.query.teacher === 'true'
  getTeachingInstancesForUserService(token, teacher).then(teachingInstances => res.json(teachingInstances))
})

router.post('/', fetchUser, async (req: UserRequest, res: Response) => {
  const { coursekey, name, startdate, enddate, coursematerial_name, version } = req.body

  const token = req.get('Authorization')

  if (coursekey && coursematerial_name && version && name && startdate && enddate) {
    const result = await teacherCreatesTeachingInstanceService(req.body, token)
    res.json(result)
  } else {
    res.status(400)
    res.json({ error: 'Bad request' })
  }
})
router.patch('/', fetchUser, async (req: UserRequest, res: Response) => {
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

router.delete('/:coursekey', fetchUser, async (req: UserRequest, res: Response) => {
  const studentId = req.user.id
  const coursekey = req.params.coursekey
  // const user = await findUserByIdService(studentId)
  const token = req.get('Authorization')
  if (coursekey) {
    try {
      const result = await userLeavesTeachingInstanceService(token, coursekey)
      res.json(result)
    } catch (e) {
      console.log(e)
      return res.status(500)
    }
  } else {
    res.status(400)
    res.json({ error: 'Bad request' })
  }
})
export const teachingInstanceController: Router = router

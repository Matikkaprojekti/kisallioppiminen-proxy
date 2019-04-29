import { Router, Request, Response } from 'express'
import {
  userJoinsTeachingInstanceService,
  userLeavesTeachingInstanceService,
  getTeachingInstancesForUserService,
  teacherCreatesTeachingInstanceService,
  teacherDeletesTeachingInstanceService
} from '../services/teachingInstanceService'
import { UserRequest } from '../middlewares/userAuthMiddleware'
import { fetchUser } from '../middlewares/userAuthMiddleware'

const router: Router = Router()

router.post('/', fetchUser, async (req: UserRequest, res: Response) => {
  // const { coursekey, name, startdate, enddate, coursematerial_name, version } = req.body
  const token = req.get('Authorization')

  const result = await teacherCreatesTeachingInstanceService(req.body, token).catch(response => {
    res.status(400).json({ error: response.error.error })
  })
  res.json(result)
})

router.get('/', fetchUser, (req: UserRequest, res: Response) => {
  const token = req.get('Authorization')
  const teacher = req.query.teacher === 'true'
  getTeachingInstancesForUserService(token, teacher).then(teachingInstances => res.json(teachingInstances))
})

router.patch('/', fetchUser, async (req: UserRequest, res: Response) => {
  const coursekey = req.body.coursekey
  const token = req.get('Authorization')

  userJoinsTeachingInstanceService(token, coursekey)
    .then(result => res.json(result))
    .catch(({ statusCode, error }) => res.status(statusCode).json(error))
})

router.delete('/:coursekey', fetchUser, async (req: UserRequest, res: Response) => {
  const coursekey = req.params.coursekey
  const teacher = req.query.teacher
  const token = req.get('Authorization')

  if (teacher !== 'true' && teacher !== 'false') {
    return res.status(400).json({ error: 'Virheelliset roolitiedot' })
  }

  const isTeacher = teacher === 'true'

  if (isTeacher) {
    teacherDeletesTeachingInstanceService(token, coursekey, isTeacher)
      .then(result => res.json(result))
      .catch(({ statusCode, error }) => res.status(statusCode).json(error))
  } else {
    userLeavesTeachingInstanceService(token, coursekey, isTeacher)
      .then(result => res.json(result))
      .catch(({ statusCode, error }) => res.status(statusCode).json(error))
  }
})
export const teachingInstanceController: Router = router

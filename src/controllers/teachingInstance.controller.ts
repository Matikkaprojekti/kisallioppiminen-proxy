import { Router, Request, Response } from 'express'
import {
  userJoinsTeachingInstanceService,
  userLeavesTeachingInstanceService,
  getTeachingInstancesForUserService,
  teacherCreatesTeachingInstanceService
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
  const token = req.get('Authorization')

  userLeavesTeachingInstanceService(token, coursekey)
    .then(result => res.json(result))
    .catch(({ statusCode, error }) => res.status(statusCode).json(error))
  // if (coursekey) {
  //   try {
  //     const result = await userLeavesTeachingInstanceService(token, coursekey)
  //     res.json(result)
  //   } catch (e) {
  //     console.log(e)
  //     return res.status(500)
  //   }
  // } else {
  //   res.status(400)
  //   res.json({ error: 'Bad request' })
  // }
})
export const teachingInstanceController: Router = router

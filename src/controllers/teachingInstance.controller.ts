import { Router, Request, Response } from 'express'
import {
  userJoinsTeachingInstanceService,
  userLeavesTeachingInstanceService,
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
    const result = await teacherCreatesTeachingInstanceService(req.body, token).catch(response => {
      res.status(400).json({ error: response.error.error })
    })
    res.json(result)
  } else {
    res.status(400)
    res.json({ error: 'Tarkista syötteen arvot!' })
  }
})
router.patch('/', fetchUser, async (req: UserRequest, res: Response) => {
  const coursekey = req.body.coursekey
  const token = req.get('Authorization')
  if (coursekey) {
    userJoinsTeachingInstanceService(token, coursekey)
      .then(result => res.json(result))
      .catch(({ statusCode, error }) => res.status(statusCode).json(error))
  } else {
    res.status(400)
    res.json({ error: 'Pyyntöä ei voida toteuttaa' })
  }
})

router.delete('/:coursekey', fetchUser, async (req: UserRequest, res: Response) => {
  const coursekey = req.params.coursekey
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
    res.json({ error: 'Pyyntöä ei voida toteuttaa' })
  }
})
export const teachingInstanceController: Router = router

import { Router, Response } from 'express'
import { fetchUser, UserRequest } from '../middlewares/userAuthMiddleware'
import { getCoursesForUser } from '../services/courseService'

const router: Router = Router()

/**
 * Gets authorized user
 */
router.get('/me', fetchUser, (req: UserRequest, res: Response) => {
  res.json(req.user)
})

// DEPRECATED
router.get('/courses', fetchUser, (req: UserRequest, res: Response) => {
  getCoursesForUser(req.cookies['connect.sid']).then(courses => res.json(courses))
})

export const userController: Router = router

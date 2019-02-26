import { Router, Request, Response } from 'express'
import { fetchUser, UserRequest } from '../middlewares/userAuthMiddleware'

const router: Router = Router()

/**
 * Gets authorized user
 */
router.get('/me', fetchUser, (req: UserRequest, res: Response) => {
  res.json(req.user)
})

export const UserController: Router = router

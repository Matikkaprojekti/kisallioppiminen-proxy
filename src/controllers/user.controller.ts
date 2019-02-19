import { Router, Request, Response } from 'express'
import { getUser } from '../services/userService'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  console.log(req.cookies)
  getUser(req.cookies._kisallioppiminen_server_session)
    .then(user => res.json(user))
    .catch(e => res.status(401).json(e))
})

export const UserController: Router = router

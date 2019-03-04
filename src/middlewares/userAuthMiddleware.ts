import { getUser } from '../services/userService'
import { Request, Response, NextFunction } from 'express'

export interface UserRequest extends Request {
  user: {
    id: number
    name: string
  }
}

export function fetchUser(req: UserRequest, res: Response, next: NextFunction) {
  if (!req.cookies['connect.sid'] && process.env.NODE_ENV !== 'test') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const cookie = req.cookies['connect.sid']
  getUser(cookie)
    .then(user => {
      req.user = user
      next()
    })
    .catch(e => {
      console.log(e)
      return res.status(401).json({ error: 'Unauthorized' })
    })
}

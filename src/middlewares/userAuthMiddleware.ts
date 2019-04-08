import { getUser } from '../services/userService'
import { Request, Response, NextFunction } from 'express'
import { UserApiResponse } from '../types/apiTypes'

export interface UserRequest extends Request {
  user: UserApiResponse
}

export function fetchUser(req: UserRequest, res: Response, next: NextFunction) {
  if (!req.get('Authorization') && process.env.NODE_ENV !== 'test') {
    console.log('Eioo authii')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = req.get('Authorization')
  getUser(token)
    .then(user => {
      req.user = user
      next()
    })
    .catch(e => {
      console.log(e)
      return res.status(401).json({ error: 'Unauthorized' })
    })
}

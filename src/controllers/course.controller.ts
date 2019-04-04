import { Router, Request, Response } from 'express'
import { createCourse } from '../services/courseService'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  const { body } = req
  console.log(req.body)
  createCourse(req.cookies._kisallioppiminen_server_session, body)
    .then(() => res.status(200).send(''))
    .catch((e: any) => {
      console.error(e)
      res.status(e.statusCode || 500).json(e.body)
    })
})

// router.put('/:id', (req: Request, res: Response) => {})

export const courseController: Router = router

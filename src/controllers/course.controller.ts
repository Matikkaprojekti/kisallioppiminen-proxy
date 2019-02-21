import { Router, Request, Response } from 'express'
import { createCourse } from '../services/courseService'

const router: Router = Router()

router.post('/', (req: Request, res: Response) => {
  const {body} = req
  console.log(req.body)
  createCourse(req.cookies._kisallioppiminen_server_session, body)
    .catch((e: any) => {
      console.error(e)
      res.status(e.statusCode || 500).json(e.body)
    })
})

export const CourseController: Router = router

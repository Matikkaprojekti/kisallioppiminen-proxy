import { Router, Request, Response } from 'express'
import { userJoinsTeachingInstanceService, findUserByIdService, findOrCreateTeachingInstanceService, findTeachingInstanceByCourseKeyService } from '../services/teachingInstanceService'

const router: Router = Router()

router.post('/', (req: Request, res: Response) => {
  const { courseKey, courseinfo, name, startdate, enddate, coursematerial_name, coursematerial_version } = req.body

  // Check that required params are present
  if (courseKey && coursematerial_name && coursematerial_version && name && startdate && enddate) {
    const result = findOrCreateTeachingInstanceService(req.body, req.body.token)
    const jsonresult = res.json(result)
    res.json(jsonresult)
  } else {
    res.status(400)
    res.json({ error: 'Bad request' })
  }
})

router.post('/join/:coursekey', async (req: Request, res: Response) => {
  console.log(req.body)
  const { courseKey, userId, teacher } = req.body

  console.log(courseKey, userId, teacher)

  if (courseKey && userId && teacher !== undefined) {
    const user = await findUserByIdService(userId)
    const teachingInstance = await findTeachingInstanceByCourseKeyService(courseKey)

    if (user && teachingInstance) {
      const usersTeachingInstance = await userJoinsTeachingInstanceService(user, courseKey)
      await console.log('usersteachingInsntance = ', usersTeachingInstance)
      await res.send(usersTeachingInstance)
    } else {
      res.status(400)
      res.send('no user or teachingInstance in database')
    }
  } else if (!userId) {
    res.status(400)
    res.send('No user_id')
  } else if (!courseKey) {
    res.status(400)
    res.send('No coursekey')
  } else {
    res.status(400)
    res.send('Very BAD request.')
  }
})

// export const CourseController: Router = router
export const TeachingInstanceController: Router = router

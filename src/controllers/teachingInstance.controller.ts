import { Router, Request, Response } from 'express'
import { userJoinsTeachingInstanceService, findUserByIdService, findOrCreateTeachingInstanceService, findTeachingInstanceByCourseKeyService } from '../services/teachingInstanceService'

const router: Router = Router()

router.post('/', (req: Request, res: Response) => {
  const { coursekey, courseinfo, name, startdate, enddate, coursematerial_name, coursematerial_version } = req.body

  // Check that required params are present
  if (coursekey && coursematerial_name && coursematerial_version && name && startdate && enddate) {
    const result = findOrCreateTeachingInstanceService(req.body, req.body.token)
    const jsonresult = res.json(result)
    res.json(jsonresult)
  } else {
    res.status(400)
    res.json({ error: 'Bad request' })
  }
})

router.post('/join/:coursekey', async (req: Request, res: Response) => {
  const coursekey = req.params.coursekey
  const { userId, teacher } = req.body

  console.log(coursekey, userId, teacher)

  if (coursekey && userId && teacher !== undefined) {
    console.log('Required params are present.')
    console.log('Checking if coursekey and user_id exists...')

    const user = await findUserByIdService(userId)
    console.log(user)
    const teachingInstance = await findTeachingInstanceByCourseKeyService(coursekey)
    console.log(teachingInstance)

    if (user && teachingInstance) {
      const updatedTeachingInstance = await userJoinsTeachingInstanceService(user, teachingInstance)
      await res.send(updatedTeachingInstance)
    } else {
      res.status(400)
      res.send('no user or teachingInstance in database')
    }
  } else if (!userId) {
    res.status(400)
    res.send('No user_id')
  } else if (!coursekey) {
    res.status(400)
    res.send('No coursekey')
  } else {
    res.status(400)
    res.send('Very BAD request.')
  }
})

// export const CourseController: Router = router
export const TeachingInstanceController: Router = router

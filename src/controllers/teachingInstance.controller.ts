import { Router, Request, Response } from 'express'
import { findUserByIdPlaah, findOrCreateTeachinginstancePlaah, findTeachingInstanceByCourseKeyPlaah } from '../services/teachingInstanceService'

const router: Router = Router()

router.post('/', (req: Request, res: Response) => {
  const { coursekey, courseinfo, name, startdate, enddate, coursematerial_name, coursematerial_version } = req.body

  // Check that required params are present
  if (coursekey && coursematerial_name && coursematerial_version && name && startdate && enddate) {
    const result = findOrCreateTeachinginstance(req.body, req.body.token).then(r => res.json(r))
    res.json(result)
  } else {
    res.status(400)
    res.json({ error: 'Bad request' })
  }
})

router.post('/join/:coursekey', async (req: Request, res: Response) => {
  const coursekey = req.params.coursekey
  const { user_id, teacher } = req.body

  console.log(coursekey, user_id, teacher)

  if (coursekey && user_id && teacher !== undefined) {
    console.log('Required params are present.')
    console.log('Checking if coursekey and user_id exists...')

    const user = await findUserById(user_id)
    const teachinginstance = await findTeachinginstanceByCoursekey(coursekey)

    console.log('user ', user)
    console.log('teachinginstance', teachinginstance)
    if (user && teachinginstance) {
      console.log('Lisätään käyttäjä opetusinstanssiin...')

      const newInstances = { user_id, course_coursekey: coursekey, teacher }

      const result = await findOrCreateUsersTeachinginstance(newInstances)

      res.json({ teachinginstance: result })
    } else {
      res.status(400)
      res.send('User or Teachinginstance not found!')
    }
  } else {
    res.status(400)
    res.send('Very BAD request.')
  }
})

// export const CourseController: Router = router
export const TeachingInstanceController: Router = router

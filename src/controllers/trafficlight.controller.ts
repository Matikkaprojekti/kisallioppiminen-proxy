import { Router, Request, Response } from 'express'
import { UserRequest } from '../middlewares/userAuthMiddleware'
import { fetchUser } from '../middlewares/userAuthMiddleware'
import { updateOrCreateTrafficlightService } from '../services/trafficlightService'

const router: Router = Router()

router.put('/:uuid', fetchUser, async (req: UserRequest, res: Response) => {
  const uuid = req.params.uuid // = tehtävän yksilövä UUID
  const { status, coursekey } = req.body
  const { user } = req
  console.log('user: ', user)

  // Luodaan exercise jos sitä ei ole olemassa...
  const newExercise = { uuid, coursekey }
  const exercise_uuid = uuid

  updateOrCreateTrafficlightService(req.get('Authorization'), exercise_uuid, coursekey, status)
    .then(result => res.json(result))
    .catch(({ statusCode, error }) => res.status(statusCode).json(error))
})

export const trafficlightController: Router = router

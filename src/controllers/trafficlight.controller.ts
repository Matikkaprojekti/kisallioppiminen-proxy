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

  // tslint:disable-next-line
  const user_id = user.id

  // Luodaan exercise jos sitä ei ole olemassa...
  const newExercise = { uuid, coursekey }
  //   const result = await findOrCreateExercise(newExercise)

  // Päivitetään tai luodaan uusi tietokantamerkintä tälle yksilöidylle nappulalle.
  // tslint:disable-next-line
  const exercise_uuid = uuid
  //   const newTrafficlightEntry = { exercise_uuid, coursekey, status, user_id }
  await updateOrCreateTrafficlightService(req.get('Authorization'), exercise_uuid, coursekey, status, user_id)

  return res.status(200).json({ message: 'Update finished.' })
})

export const trafficlightController: Router = router

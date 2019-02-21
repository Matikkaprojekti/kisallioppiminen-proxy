import { Router, Request, Response } from 'express'
import { client } from '../clients/apiClient'
import { fetchUser, UserRequest } from '../middlewares/userAuthMiddleware'

const { getAllScoreboards } = client

const router: Router = Router()

/* Return all scoreboards of teacher with certain id */
router.get('/teachers/me/scoreboards', fetchUser, (req: UserRequest, res: Response) => {
  const teacherId = req.user.id
  getAllScoreboards(req.cookies._kisallioppiminen_server_session, teacherId).then(scoreboards => res.json(scoreboards))
})

/*
Returns scoreboad of a specific course, IF user that requested the scoreboard
is a teacher of the course with id:id.
*/
// router.get('/courses/:id/scoreboard', (req: Request, res: Response) => {
//   const courseId = req.params.id
//   res.json(scoreboard)
// })

export const ScoreboardController: Router = router

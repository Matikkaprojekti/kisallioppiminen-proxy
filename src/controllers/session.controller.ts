import { Router, Request, Response } from 'express'

const router: Router = Router()

router.post('/logout', (req, res) => {
  req.clearCookie('connect.sid')
  res.redirect(req.query.redirect)
})

export const SessionController: Router = router

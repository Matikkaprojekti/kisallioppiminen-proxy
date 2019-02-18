import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Login with POST')
})

router.post('/', (req: Request, res: Response) => {
  console.log(req.body)
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
    console.log('Logging in...')
  } else {
    res.json({ error: 'Username or password missing...' })
  }
})

export const LoginController: Router = router

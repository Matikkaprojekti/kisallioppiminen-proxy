import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import { LoginController, UserController, ScoreboardController } from './controllers'
import cp from 'cookie-parser'

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cp())

app.use('/login', LoginController)
app.use('/user', UserController)
app.use('/', ScoreboardController)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

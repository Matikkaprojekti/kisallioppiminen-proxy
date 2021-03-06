import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import { sessionController, userController, scoreboardController, courseController, teachingInstanceController, trafficlightController } from './controllers'
import cp from 'cookie-parser'
import cors from 'cors'
import { resolveEnvVar } from './utils/resolveEnvironmentVariable'

const app = express()
const port = process.env.PORT || 8080

app.use(
  cors({
    origin: resolveEnvVar('CORS_ORIGIN'),
    credentials: true
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cp())

app.use('/session', sessionController)
app.use('/users', userController)
app.use('/', scoreboardController)
app.use('/courses', courseController)
app.use('/teachinginstances', teachingInstanceController)
app.use('/trafficlights', trafficlightController)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

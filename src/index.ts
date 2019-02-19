import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
<<<<<<< HEAD
import { LoginController, MockController } from './controllers'
=======
import { LoginController } from './controllers'
import { UserRouter } from './controllers/user.controller'
import cp from 'cookie-parser'
>>>>>>> 5f6e1ae... Clients and services for user

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cp())

app.use('/login', LoginController)
<<<<<<< HEAD
app.use('/mock', MockController)
=======
app.use('/user', UserRouter)
>>>>>>> 5f6e1ae... Clients and services for user

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

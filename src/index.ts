import express from 'express'
import bodyParser from 'body-parser'
import { LoginController, MockController } from './controllers'

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', LoginController)
app.use('/mock', MockController)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

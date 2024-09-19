import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Logger } from './configurations/logger-middleware'
import { serverPort } from './configurations/configurations'
import corsOptions from './configurations/cors-middleware'
import errorHandler from './configurations/error-handler-middleware'
import loginRoutes from './users/routes/user-routes'
import { mongooseConnectDB } from './configurations/mongoose-connection'

const app = express()
dotenv.config()

//middleware's
app.use(morgan('dev'))
app.use(bodyParser.json()) // to allow json capabilities
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

//endpoints
app.use('/api/users', loginRoutes)

//Global error handler
app.use(errorHandler)

//start
const port = serverPort()

app.listen(port, async () => {
  await mongooseConnectDB()
  Logger.info(`Server running on port ${port}`)
})
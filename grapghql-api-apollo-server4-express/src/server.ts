import 'reflect-metadata'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import helmet from 'helmet'

import corsOptions from './common/configurations/cors-options.js'
import gracefulShutdown from './common/configurations/graceful-shutdown.js'
import { mongooseConnectDB } from './common/configurations/mongoose-connection.js'
import morganMiddleware from './common/middlewares/morgan-middleware.js'
import createApolloSetup from './common/services/apollo-setup.js'
import WinstonLogger from './common/utils/logger-service.js'

dotenv.config()

const startServer = async (): Promise<void> => {
  const PORT = Number(process.env.PORT) || 3010
  const app: Application = express()

  app.use(cors(corsOptions))
  app.use(helmet())

  app.use(express.json())
  app.use(morganMiddleware)

  await mongooseConnectDB()
  const apolloSetup = await createApolloSetup()

  app.use('/graphql', apolloSetup.middleware)

  const httpServer = app.listen(PORT, () => {
    WinstonLogger.info(`Server is running at http://localhost:${PORT}`)
  })

  // Handle termination signals for graceful shutdown
  process.on('SIGINT', gracefulShutdown(httpServer, apolloSetup.server))
  process.on('SIGTERM', gracefulShutdown(httpServer, apolloSetup.server))
}

startServer().catch((err) => {
  WinstonLogger.error(`Error when starting the server. ${err}`)
  process.exit(1)
})

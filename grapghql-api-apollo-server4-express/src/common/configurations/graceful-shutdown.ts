// utils/gracefulShutdown.ts

import WinstonLogger from '../utils/logger-service.js'

import { mongooseDisconnectDB } from './mongoose-connection.js'

import type { GraphQLContext } from './graphql-context.js'
import type { ApolloServer } from '@apollo/server'
import type { Server } from 'http'

const gracefulShutdown = (
  httpServer: Server,
  apolloServer: ApolloServer<GraphQLContext>,
): (() => Promise<void>) => {
  return async (): Promise<void> => {
    WinstonLogger.info('Shutting down server...')

    // Stop Apollo Server
    try {
      await apolloServer.stop()
      WinstonLogger.info('Apollo Server stopped.')
    } catch (error) {
      WinstonLogger.error('Error stopping Apollo Server:', error)
    }

    // Close HTTP server
    httpServer.close(async () => {
      WinstonLogger.info('HTTP server closed.')

      // Disconnect MongoDB
      try {
        await mongooseDisconnectDB()
        WinstonLogger.info('MongoDB connection closed.')
      } catch (error) {
        WinstonLogger.error('Error during MongoDB disconnection:', error)
      }

      process.exit(0)
    })
  }
}

export default gracefulShutdown

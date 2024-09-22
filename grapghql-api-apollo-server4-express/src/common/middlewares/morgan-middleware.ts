import morgan from 'morgan'

import WinstonLogger from '../utils/logger-service.js'

import type { Request } from 'express'
import type { StreamOptions } from 'morgan'

const stream: StreamOptions = {
  write: (message) => WinstonLogger.http(message.trim()),
}

morgan.token('graphql-query', (req) => {
  const { body } = req as Request

  const { query, operationName } = body || {}
  return operationName || (query ? query.split('{')[1].split('(')[0].trim() : '')
})

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms :graphql-query',
  { stream },
)

export default morganMiddleware

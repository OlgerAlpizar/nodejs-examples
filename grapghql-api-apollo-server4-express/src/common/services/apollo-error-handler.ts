// services/ApolloErrorHandler.ts

import ErrorCode from '../configurations/error-code.js'
import { generateUniqueUUID } from '../utils/guid-generator.js'
import WinstonLogger from '../utils/logger-service.js'

import type { GraphQLError, GraphQLFormattedError } from 'graphql'

// Log error function
export const logError = (error: GraphQLError): void => {
  const isClientError =
    error.extensions?.code === 'BAD_USER_INPUT' || error.extensions?.code === 'VALIDATION_FAILED'

  if (isClientError) {
    WinstonLogger.info({
      message: 'Client error encountered',
      details: {
        message: error.message,
        path: error.path,
        extensions: error.extensions,
      },
    })
  } else if (error.extensions?.code === 'INTERNAL_SERVER_ERROR') {
    WinstonLogger.error({
      message: 'Internal server error occurred',
      details: {
        message: error.message,
        stack: error.originalError?.stack,
        extensions: error.extensions,
      },
    })
  } else {
    WinstonLogger.warn({
      message: 'Other error occurred',
      details: {
        message: error.message,
        path: error.path,
        extensions: error.extensions,
      },
    })
  }
}

// Customize error function
export const customizeError = (
  formattedError: GraphQLFormattedError,
  graphQLError: GraphQLError,
): GraphQLFormattedError => {
  const errorId = generateUniqueUUID()

  if (graphQLError.extensions?.code === ErrorCode.INTERNAL_ERROR) {
    WinstonLogger.error({
      message: 'Internal server error',
      details: {
        message: graphQLError.message,
        stack: graphQLError.originalError?.stack,
        errorId,
      },
    })

    return {
      ...formattedError,
      message: 'An unexpected error occurred. Please try again later.',
      extensions: {
        code: ErrorCode.INTERNAL_ERROR,
        timestamp: new Date().toISOString(),
        errorId,
      },
    }
  } else if (graphQLError.extensions?.code === ErrorCode.USER_INPUT_ERROR) {
    return {
      ...formattedError,
      message: 'Invalid input provided.',
      extensions: {
        code: ErrorCode.USER_INPUT_ERROR,
        timestamp: new Date().toISOString(),
        errorId,
      },
    }
  }

  return {
    ...formattedError,
    extensions: {
      ...formattedError.extensions,
      errorId,
      timestamp: new Date().toISOString(),
    },
  }
}

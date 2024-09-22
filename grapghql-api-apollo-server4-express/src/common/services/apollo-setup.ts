// apollo-server.ts
import { writeFileSync } from 'fs'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { printSchema } from 'graphql'

import diContainer from '../configurations/inversify.config.js'

import { customizeError, logError } from './apollo-error-handler.js'
import { createApolloSchema } from './apollo-schemas.js'

import type ApolloSetupResponse from './apollo-setup-response.js'
import type { GraphQLContext } from '../configurations/graphql-context.js'
import type { GraphQLRequestContext } from '@apollo/server'
import type { GraphQLError, GraphQLFormattedError } from 'graphql'

const createApolloSetup = async (): Promise<ApolloSetupResponse> => {
  const apolloSchema = await createApolloSchema()

  const schemaFile = './generated-schema-not-required.graphql'
  writeFileSync(schemaFile, printSchema(apolloSchema))

  const server = new ApolloServer<GraphQLContext>({
    schema: apolloSchema,
    introspection: true, 
    plugins: [
      {
        requestDidStart: async (): Promise<{
          didEncounterErrors: (
            requestContext: GraphQLRequestContext<GraphQLContext>,
          ) => Promise<void>
        }> => {
          return {
            async didEncounterErrors(
              requestContext: GraphQLRequestContext<GraphQLContext>,
            ): Promise<void> {
              const errors = requestContext.errors || []
              errors.forEach((error) => {
                logError(error)
              })
            },
          }
        },
      },
    ],
    formatError: (formattedError: GraphQLFormattedError, error: unknown): GraphQLFormattedError => {
      const graphQLError = error as GraphQLError
      logError(graphQLError)
      return customizeError(formattedError, graphQLError)
    },
  })

  await server.start()

  // Return both the server instance and the middleware
  return {
    server,
    middleware: expressMiddleware(server, {
      context: async () => ({
        diContainer,
      }),
    }),
  }
}

export default createApolloSetup

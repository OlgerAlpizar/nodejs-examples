import type { GraphQLContext } from '../configurations/graphql-context'
import type { ApolloServer } from '@apollo/server'
import type { expressMiddleware } from '@apollo/server/express4'

export default interface ApolloSetupResponse {
  server: ApolloServer<GraphQLContext>
  middleware: ReturnType<typeof expressMiddleware>
}

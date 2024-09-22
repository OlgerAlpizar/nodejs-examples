import { buildSchema } from 'type-graphql'

import ProductResolver from '../../domains/products/graphql/resolvers/product-resolver.js'

import type diContainer from '../configurations/inversify.config.js'
import type { GraphQLSchema } from 'graphql'

export const createApolloSchema = async (): Promise<GraphQLSchema> => {
  const resolvers: [Function, ...Function[]] = [ProductResolver]

  if (resolvers.length === 0) {
    throw new Error('No resolvers found! At least one resolver is required.')
  }

  return await buildSchema({
    resolvers: resolvers,
    container: ({ context }: { context: typeof diContainer }) => context,
  })
}
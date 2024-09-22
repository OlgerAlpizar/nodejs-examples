import type diContainer from './inversify.config.js'

export interface GraphQLContext {
  diContainer: typeof diContainer
}

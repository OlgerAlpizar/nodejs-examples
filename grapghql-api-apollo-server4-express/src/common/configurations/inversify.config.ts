// configurations/inversify.config.ts
import { Container } from 'inversify'

import ProductRepository from '../../domains/products/repositories/product-repository.js'
import ProductService from '../../domains/products/services/product-service.js'

import InversifyTypes from './inversify-types.js'

const diContainer = new Container()

diContainer.bind<ProductService>(InversifyTypes.ProductService).to(ProductService)
diContainer.bind<ProductRepository>(InversifyTypes.ProductRepository).to(ProductRepository)

export default diContainer

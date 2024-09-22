import { inject, injectable } from 'inversify'
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'

import InversifyTypes from '../../../../common/configurations/inversify-types.js'
import IProduct from '../../models/product.js'
import { ProductInput } from '../inputs/product-input.js'
import { ProductSearchInput } from '../inputs/product-search-input.js'
import { ProductType } from '../types/product-type.js'
import ProductService from '../../services/product-service.js'
import ProductsPaginationOutput from '../outputs/product-pagination-output.js'

@injectable()
@Resolver()
export default class ProductResolver {
  constructor(@inject(InversifyTypes.ProductService) private productService: ProductService) {}

  @Query(() => ProductType, { nullable: true })
  async getProductById(@Arg('id', () => ID) id: string): Promise<ProductType | null> {
    const product = await this.productService.getProductById(id)

    const productType = product?.toObject()

    return productType
  }

  @Query(() => [ProductType])
  async getAllProducts(): Promise<ProductType[]> {
    const products = await this.productService.getAllProducts()

    return products.map((product) => product.toObject())
  }

  @Mutation(() => ProductType)
  async createProduct(
    @Arg('data', () => ProductInput) productData: ProductInput,
  ): Promise<ProductType> {
    const product = await this.productService.createProduct(productData)

    return product.toObject()
  }

  @Mutation(() => ProductType, { nullable: true })
  async updateProduct(
    @Arg('id', () => ID) id: string,
    @Arg('data', () => ProductInput) productData: Partial<ProductInput>,
  ): Promise<ProductType | null> {
    const updatedProduct = await this.productService.updateProduct(id, productData)

    return updatedProduct?.toObject()
  }

  @Mutation(() => ProductType, { nullable: true })
  async patchProduct(
    @Arg('id', () => ID) id: string,
    @Arg('data', () => ProductInput) productData: Partial<ProductInput>,
  ): Promise<ProductType | null> {
    const patchedProduct = await this.productService.patchProduct(id, productData)

    return patchedProduct?.toObject()
  }

  @Mutation(() => ProductType, { nullable: true })
  async deleteProduct(@Arg('id', () => ID) id: string): Promise<ProductType | null> {
    const deletedProduct = await this.productService.deleteProduct(id)

    return deletedProduct?.toObject()
  }

  @Query(() => ProductsPaginationOutput)
  async searchProducts(
    @Arg('search', () => ProductSearchInput) search: ProductSearchInput,
  ): Promise<ProductsPaginationOutput> {
    const paginatedResults = await this.productService.searchProducts(search)

    const recordsMapped: ProductType[] = paginatedResults.records.map((product: IProduct) =>
      product.toObject(),
    )

    const page = new ProductsPaginationOutput(
      paginatedResults.totalRecords,
      paginatedResults.pageSize,
      paginatedResults.pageNumber,
      recordsMapped,
    )

    return page
  }
}

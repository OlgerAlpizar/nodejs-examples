import { inject, injectable } from 'inversify'

import InversifyTypes from '../../../common/configurations/inversify-types.js'
import ProductRepository from '../repositories/product-repository.js'

import type PaginationResults from '../../../common/models/pagination-results.js'
import type IProduct from '../models/product.js'
import type IProductSearch from '../models/product-search.js'

@injectable()
export default class ProductService {
  constructor(
    @inject(InversifyTypes.ProductRepository) private productRepository: ProductRepository,
  ) {}

  /**
   * Create a new product and handle any business logic around creation
   * @param productData Data for creating a new product
   * @returns The created product document
   */
  createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
    if (!productData.name || !productData.price) {
      throw new Error('Product name and price are required')
    }

    return this.productRepository.create(productData)
  }

  /**
   * Get all products
   * @returns Array of all product documents
   */
  getAllProducts = async (): Promise<IProduct[]> => {
    const results = this.productRepository.findAll()

    return results
  }

  /**
   * Get a product by its ID and handle errors or business logic
   * @param id Product ID
   * @returns The product document or null if not found
   */
  getProductById = async (id: string): Promise<IProduct | null> => {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  /**
   * Update a product by ID
   * @param id Product ID
   * @param productData Data to update the product
   * @returns The updated product document or null if not found
   */
  updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    return this.productRepository.update(id, productData)
  }

  /**
   * Patch (partially update) a product by ID
   * @param id Product ID
   * @param productData Partial data to update the product
   * @returns The updated product document or null if not found
   */
  patchProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    return this.productRepository.patch(id, productData)
  }

  /**
   * Delete a product by ID
   * @param id Product ID
   * @returns The deleted product document or null if not found
   */
  deleteProduct = async (id: string): Promise<IProduct | null> => {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    return this.productRepository.delete(id)
  }

  /**
   * Search for products by a search term and return paginated results
   * @param productSearch Search criteria for products
   * @returns Paginated product results
   */
  searchProducts = async (productSearch: IProductSearch): Promise<PaginationResults<IProduct>> => {
    const results = this.productRepository.findBySearchTerm(productSearch)

    return results
  }
}

import { injectable } from 'inversify'

import PaginationResults from '../../../common/models/pagination-results.js'
import { ProductModel } from '../models/product.js'

import type IProduct from '../models/product.js'
import type IProductSearch from '../models/product-search.js'
import type { FilterQuery, Model } from 'mongoose'

@injectable()
export default class ProductRepository {
  private model: Model<IProduct>

  constructor(model: Model<IProduct> = ProductModel) {
    this.model = model
  }

  create = async (productData: Partial<IProduct>): Promise<IProduct> => {
    const product = new this.model(productData)
    return product.save()
  }

  findAll = async (): Promise<IProduct[]> => {
    return this.model.find().exec()
  }

  findById = async (id: string): Promise<IProduct | null> => {
    return this.model.findById(id).exec()
  }

  update = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    return this.model.findByIdAndUpdate(id, productData, { new: true }).exec()
  }

  patch = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    return this.model.findByIdAndUpdate(id, { $set: productData }, { new: true }).exec()
  }

  delete = async (id: string): Promise<IProduct | null> => {
    return this.model.findByIdAndDelete(id).exec()
  }

  findBySearchTerm = async (
    productSearch: IProductSearch,
  ): Promise<PaginationResults<IProduct>> => {
    const conditions = this.buildSearchConditions(productSearch)

    const requirePagination = this.isPaginationEnabled(
      productSearch.pageNumber,
      productSearch.pageSize,
    )

    const aggregateSearchResults = await this.model.aggregate([
      { $match: conditions },
      { $sort: { name: 1 } },
      {
        $facet: {
          counter: [{ $count: 'totalRecords' }],
          paginatedResults: [
            ...(requirePagination
              ? [
                  {
                    $skip: (productSearch.pageNumber! - 1) * productSearch.pageSize!,
                  },
                  { $limit: productSearch.pageSize! },
                ]
              : []),
          ],
        },
      },
    ])

    const totalRecords = aggregateSearchResults[0].counter[0].totalRecords || 0
    const pageSize = requirePagination ? productSearch.pageSize! : totalRecords
    const pageNumber = requirePagination ? productSearch.pageNumber! : 1
    const records = aggregateSearchResults[0].paginatedResults

    const page = new PaginationResults<IProduct>(totalRecords, pageSize, pageNumber, records)

    return page
  }

  private buildSearchConditions = (productSearch: IProductSearch): FilterQuery<IProduct> => {
    const conditions: FilterQuery<IProduct> = {}

    if (productSearch.name) {
      conditions.name = {
        $regex: new RegExp(`^${productSearch.name}`),
        $options: 'i',
      }
    }

    if (productSearch.description) {
      conditions.description = {
        $regex: new RegExp(`^${productSearch.description}`),
        $options: 'i',
      }
    }

    if (productSearch.price) {
      conditions.price = productSearch.price
    }

    if (productSearch.inStock && productSearch.inStock !== undefined) {
      conditions.inStock = productSearch.inStock
    }

    return conditions
  }

  private isPaginationEnabled = (
    pageNumber: number | undefined,
    pageSize: number | undefined,
  ): boolean => {
    return pageNumber !== undefined && pageSize !== undefined && pageNumber > 0 && pageSize > 0
  }
}

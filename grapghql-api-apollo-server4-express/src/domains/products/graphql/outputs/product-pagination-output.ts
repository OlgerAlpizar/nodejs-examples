import { ObjectType, Field } from 'type-graphql';
import PaginationResults from '../../../../common/models/pagination-results.js';
import { ProductType } from '../types/product-type.js';

@ObjectType()
class ProductsPaginationOutput extends PaginationResults<ProductType> {
  @Field(() => [ProductType])
  records: ProductType[];

  constructor(
    totalRecords: number,
    pageSize: number,
    pageNumber: number,
    records: ProductType[],
  ) {
    super(totalRecords, pageSize, pageNumber, records);
    this.records = records;
  }
}


export default ProductsPaginationOutput
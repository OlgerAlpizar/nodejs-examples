import { Field, Float, InputType, Int } from 'type-graphql'

@InputType()
export class ProductSearchInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  price?: number

  @Field({ nullable: true })
  inStock?: boolean

  @Field(() => Int, { nullable: true })
  pageNumber?: number

  @Field(() => Int, { nullable: true })
  pageSize?: number
}

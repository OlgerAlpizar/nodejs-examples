import { Field, Float, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  description!: string

  @Field(() => Float)
  price!: number

  @Field(() => Boolean)
  inStock!: boolean
}

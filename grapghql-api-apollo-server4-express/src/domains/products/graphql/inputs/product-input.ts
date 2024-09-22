import { Field, Float, InputType } from 'type-graphql'

@InputType()
export class ProductInput {
  @Field(() => String)
  name!: string

  @Field(() => String)
  description!: string

  @Field(() => Float, { defaultValue: 0.0 })
  price!: number

  @Field(() => Boolean, { nullable: true })
  inStock?: boolean
}

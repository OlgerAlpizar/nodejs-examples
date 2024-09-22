import { model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import type { Document } from 'mongoose'

export default interface IProduct extends Document {
  name: string
  description: string
  price: number
  inStock: boolean
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
      unique: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (_doc: Document, ret: Partial<IProduct>): Partial<IProduct> => {
        ret.id = ret._id // Mapear _id a id
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  },
)

ProductSchema.plugin(uniqueValidator)
ProductSchema.index({ name: 1, price: -1 })

export const ProductModel = model<IProduct>('Product', ProductSchema)

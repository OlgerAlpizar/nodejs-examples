import { Document, Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export default interface User extends Document {
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
    avatarUrl: string
}

const UserSchema = new Schema<User>(
    {
      email: {
        type: String,
        index: true,
        required: true,
        unique: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Please use a valid email address',
        ],
      },
      password: {
        type: String,
        required: true,
        minlength: 10,
      },
      firstName: {
        type: String,
        index: true,
        required: true,
      },
      lastName: {
        type: String,
        index: true,
        required: true,
      },
      avatarUrl: {
        type: String,
      },
    },
    {
      timestamps: true, //auto createdAt and updatedAt columns
    }
  ).plugin(uniqueValidator)
  
  export const UserSchemaModel = model<User>('User', UserSchema)
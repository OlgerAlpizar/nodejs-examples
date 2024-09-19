import mongoose from 'mongoose'
import { Logger } from './logger-middleware'

export const mongooseConnectDB = async () => {
    mongoose.set('strictQuery', true)

    await mongoose
        .connect(process.env.MONGO_DB_CONNECTION!)
        .then(() => {
            Logger.info('Mongoose connected!')
        })
        .catch((err: Error) => {
            Logger.error('Error connecting to mongoose', err)
        })
}

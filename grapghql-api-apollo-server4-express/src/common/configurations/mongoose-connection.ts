import mongoose from 'mongoose'

import WinstonLogger from '../utils/logger-service.js'

export const mongooseConnectDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true)

  const connectionString = process.env.MONGO_DB_CONNECTION ?? ''

  await mongoose
    .connect(connectionString)
    .then(() => {
      WinstonLogger.info('Mongoose connected!')
    })
    .catch((err: Error) => {
      WinstonLogger.error('Error connecting to mongoose', err)
    })
}

export const mongooseDisconnectDB = async (): Promise<void> => {
  await mongoose
    .disconnect()
    .then(() => {
      WinstonLogger.info('Mongoose disconnected!')
    })
    .catch((err: Error) => {
      WinstonLogger.error('Error disconnecting from mongoose:', err)
    })
}

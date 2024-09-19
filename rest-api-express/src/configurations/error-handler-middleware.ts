import { Logger } from './logger-middleware'
import { NextFunction, Request, Response } from 'express'

export class HttpError extends Error {
  code: number
  details: string

  constructor(
    message: string,
    details: string,
    code: number
  ) {
    super(message)
    this.code = code
    this.details = details
  }
}

const errorHandler = (
  error: HttpError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  Logger.error(`${error.message} - ${error.details}. code: ${error.code}`)

  res.status(error.code || 500).send({
    message: `${error.message || 'Something went wrong'}`,
    details: `${error.details || ''}`,
    statusCode: error.code || 500
  })
}

export default errorHandler
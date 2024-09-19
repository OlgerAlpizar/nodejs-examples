import { ValidationError } from 'express-validator'
import { Logger } from '../configurations/logger-middleware'

export const getValidationErrors = (errors: ValidationError[]) => {
  const json: any = JSON.parse(JSON.stringify(errors)) // since cannot access to path on ValidationError, then play with dnamic json object

  Logger.error(JSON.stringify(errors))

  return `Validation errors: ${json.map((x:any ) => `[${x.path}|${x.msg}]`)}`
}

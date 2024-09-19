import * as userRepository from '../repositories/user-repository'
import { NextFunction, Request, Response } from 'express'
import User from '../models/user'
import SearchUser from '../models/search-user'
import {validationResult } from 'express-validator'
import { getValidationErrors } from '../../utils/validation-errors'
import { HttpError } from '../../configurations/error-handler-middleware'

const validateRequestsAndThrow = (
  req: Request,
  title: string,
  next: NextFunction
) => {

  const validationErrors = validationResult(req).array()

  if (validationErrors.length > 0) {
    return next(
      new HttpError(
        title,
        getValidationErrors(validationErrors),
        406
      )
    )
  }
}

const buildHttpErrorResponse = (messsage: string, code: number) => {
  return new HttpError(
    messsage,
    '',
    code
  )
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser: User = req.body

  validateRequestsAndThrow(req, `Error creating the user ${newUser.email} due request validations`, next)

  await userRepository
    .create(newUser)
    .then((response) => res.json(response))
    .catch((err) => next(buildHttpErrorResponse(err.message, 400)))
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updatingUser: User = req.body
  updatingUser.id = req.params.id

  validateRequestsAndThrow(req, `Error updating the user ${updatingUser.email}  due request validations`, next)

  await userRepository
    .update(updatingUser)
    .then((response) => res.json(response))
    .catch((err) => next(buildHttpErrorResponse(err.message, 400)))
}

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const removingUserId: String = req.params.id

  validateRequestsAndThrow(req, `Error removing the user ${removingUserId}  due request validations`, next)

  await userRepository
    .remove(removingUserId)
    .then((response) => res.json(response))
    .catch((err) => next(buildHttpErrorResponse(err.message, 400)))
}

export const getSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const gettingUserId: String = req.params.id

  validateRequestsAndThrow(req, `Error getting the user ${gettingUserId}  due request validations`, next)

  await userRepository
    .getSingle(gettingUserId)
    .then((response) => res.json(response))
    .catch((err) => next(buildHttpErrorResponse(err.message, 400)))
}

export const Search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const searchCriteria: SearchUser = req.body

  validateRequestsAndThrow(req, `Error getting users by search due request validations`, next)

  await userRepository
    .search(searchCriteria)
    .then((response) => res.json(response))
    .catch((err) => next(buildHttpErrorResponse(err.message, 400)))
}
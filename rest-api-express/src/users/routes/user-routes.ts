import { Router } from 'express'
import { body, param } from 'express-validator'
import * as controller from '../controllers/user-controller'

const loginRoutes = Router()

const createValidator = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('phone').notEmpty().isString(),
    body('avatarUrl').isString().optional({ nullable: true }).default(''),
]

const updateValidator = [
    param('id').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('firstName').isString(),
    body('password').isString(),
    body('lastName').isString(),
    body('phone').isString(),
    body('avatarUrl').isString().optional({ nullable: true })
]

const deleteValidator = [
    param('id').notEmpty().isString()
]

const getSingleValidator = [
    param('id').notEmpty().isString()
]

const searchValidator = [
    body('email').isString().optional({ nullable: true }),
    body('firstName').isString().optional({ nullable: true }),
    body('lastName').isString().optional({ nullable: true })
]

loginRoutes.route('/').post(createValidator, controller.create)
loginRoutes.route('/search').get(searchValidator, controller.Search)
loginRoutes.route('/:id').put(updateValidator, controller.update)
loginRoutes.route('/:id').delete(deleteValidator, controller.remove)
loginRoutes.route('/:id').get(getSingleValidator, controller.getSingle)

export default loginRoutes
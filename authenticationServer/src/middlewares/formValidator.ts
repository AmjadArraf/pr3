import { body, ValidationChain } from 'express-validator'

const validator: ValidationChain[] = [
  body('email').isEmail().withMessage('Invalid email'),
]

const registerValidator = [
  ...validator,
  body('first name').notEmpty().withMessage('First Name is required').isAlpha()
  .withMessage('First name must contain only letters'),
  body('last name').notEmpty().withMessage('Last Name is required').isAlpha()
  .withMessage('Last name must contain only letters'),
]

export { registerValidator, validator as loginValidator }

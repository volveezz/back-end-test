import { check, header } from 'express-validator';
import { authRequired, validateSchema } from '../../middlewares';

/**
  * @openapi
  * components:
  *   rules:
  *      authorization:
  *          required:
  *             - email
  *             - password
  *          properties:
  *             email:
  *                type: string
  *             password:
  *                type: string
  */
export const authorizationRules = [check('email').exists().isEmail(), check('password').exists().notEmpty().isString(), validateSchema];

/**
  * @openapi
  * components:
  *   rules:
  *      refreshToken:
  *          required:
  *             - refreshToken
  *          properties:
  *             refreshToken:
  *                type: string
  */
export const refreshRules = [check('refreshToken').exists().notEmpty().isString(), validateSchema];

export const getMeRules = [authRequired({}), validateSchema];

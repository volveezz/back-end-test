import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';
import { Authorize, buildAuthorize } from './authorize';
import { GetMe, buildGetMe } from './me';
import { Refresh, buildRefresh } from './refresh';
import { Register, buildRegister } from './register';
import { authorizationRules, getMeRules, refreshRules } from './rules';

type Params = Pick<DeliveryParams, 'auth'>;

export type AuthMethods = {
	getMe: GetMe;
	refresh: Refresh;
	authorize: Authorize;
	register: Register;
};

const buildRegisterRoutes = (methods: AuthMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
		 * @openapi
		 * /auth/authorize:
		 *   post:
		 *     tags: [Auth]
		 *     produces:
		 *       - application/json
		 *     requestBody:
		 *       in: body
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/rules/authorization'
		 *     responses:
		 *        200:
		 *           description: Authorized user.
		 *           content:
		 *              application/json:
		 *                schema:
		 *                  properties:
		 *                    user:
		 *                      $ref: '#/components/entities/User'
		 *                    accessToken:
		 *                      type: string
		 *                    refreshToken:
		 *                      type: string
		 */
    namespace.post('/authorize', authorizationRules, createRouteHandler(methods.authorize));

    /**
		 * @openapi
		 * /auth/register:
		 *   post:
		 *     tags: [Auth]
		 *     produces:
		 *       - application/json
		 *     requestBody:
		 *       in: body
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/rules/authorization'
		 *     responses:
		 *        200:
		 *           description: Created user.
		 *           content:
		 *              application/json:
		 *                schema:
		 *                  properties:
		 *                    user:
		 *                      $ref: '#/components/entities/User'
		 */
    namespace.post('/register', authorizationRules, createRouteHandler(methods.register));

    /**
		 * @openapi
		 * /auth/refresh:
		 *   post:
		 *     tags: [Auth]
		 *     produces:
		 *       - application/json
		 *     requestBody:
		 *       in: body
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/rules/refreshToken'
		 *     responses:
		 *        200:
		 *           description: Authorized user.
		 *           content:
		 *              application/json:
		 *                schema:
		 *                  properties:
		 *                    accessToken:
		 *                      type: string
		 *                    refreshToken:
		 *                      type: string
		 */
    namespace.post('/refresh', refreshRules, createRouteHandler(methods.refresh));

    /**
		 * @openapi
		 * /auth/me:
		 *   get:
		 *     tags: [Auth]
		 *     security:
		 *      - bearerAuth: []
		 *     produces:
		 *       - application/json
		 *     responses:
		 *        200:
		 *           content:
		 *              application/json:
		 *                schema:
		 *                      $ref: '#/components/entities/User'
		 */
    namespace.get('/me', getMeRules, createRouteHandler(methods.getMe));

    root.use('/auth', namespace);
  };
};

export const buildAuthHandler = (params: Params): IHandler => {
  const getMe = buildGetMe(params);
  const refresh = buildRefresh(params);
  const authorize = buildAuthorize(params);
  const register = buildRegister(params);

  return {
    registerRoutes: buildRegisterRoutes({
      getMe,
      refresh,
      authorize,
      register,
    }),
  };
};

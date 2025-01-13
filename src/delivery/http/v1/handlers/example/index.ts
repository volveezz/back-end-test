import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';
import { buildHello, Hello } from './hello';

type Params = Pick<DeliveryParams, 'example'>;

export type ExampleMethods = {
	hello: Hello;
};

const buildRegisterRoutes = (methods: ExampleMethods) => (root: Express.Router) => {
  const namespace = Express.Router();

  /**
	 * @openapi
	 * /example/hello:
	 *   get:
	 *     tags: [Example]
	 */
  namespace.get('/hello', createRouteHandler(methods.hello));

  root.use('/example', namespace);
};

export const buildExampleHandler = (params: Params): IHandler => {
  const hello = buildHello(params);

  return {
    registerRoutes: buildRegisterRoutes({
      hello,
    }),
  };
};

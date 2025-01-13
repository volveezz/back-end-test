import cors from 'cors';
import Express from 'express';
import { errorHandler, loggerMiddleware } from '../middlewares';
import { buildSwagger } from '../swagger';

export const buildRouter = (handler: Express.Router) => {
  const router = Express.Router();

  router.use(cors());
  router.use(Express.json());
  router.use(loggerMiddleware);
  router.use(handler);
  router.use(buildSwagger());
  router.use(errorHandler);

  return router;
};

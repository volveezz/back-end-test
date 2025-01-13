import { DeliveryParams } from '@/delivery/types'
import Express from 'express'
import { buildAuthHandler } from './auth'
import { buildExampleHandler } from './example'
import { IHandler } from './types'

export const buildHandler = (params: DeliveryParams): Express.Router => {
  const router = Express.Router();

  const handlers: Array<IHandler> = [
    buildAuthHandler(params),
    buildExampleHandler(params)
  ]

  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];

    handler.registerRoutes(router);
  }

  return router;
};

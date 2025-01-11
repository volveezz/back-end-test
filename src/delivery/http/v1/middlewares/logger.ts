import { logger } from '@/lib/logger';
import { NextFunction, Request, Response } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const url = req.url
  
  logger.log({
    level: 'info',
    message: `[HTTP Request] ${req.method} ${url} from ${req.ip}`,
    meta: {
      date: new Date()
    }
  });
  
  res.on('close', () => {
    logger.log({
      level: 'info',
      message: `[HTTP Response] ${req.method} ${url} ${res.statusCode}`,
      meta: {
        date: new Date()
      }
    })
  });
  
  next();
}

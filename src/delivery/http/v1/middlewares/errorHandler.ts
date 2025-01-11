import { logger } from '@/lib/logger';
import Express from 'express';
import { HttpError } from '../errors';

export const errorHandler: Express.ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const httpError = new HttpError(error)

  if (!httpError.isKnownError) {
    logger.log({
      level: 'error',
      message: error.stack || 'No stack provided'
    })
  }

  res.status(httpError.statusCode).json({
    status: 'error',
    error: httpError.getError()
  });
}

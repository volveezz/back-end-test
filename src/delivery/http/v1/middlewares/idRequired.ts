import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

export const validateIdParam = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id || typeof id !== 'string' || id === '{id}' || !isUUID(id)) {

      res.status(httpStatus.BAD_REQUEST).json({
        error: {
          message: 'Invalid UUID',
        },
      });
      return;
    }

    next();
  };
};

function isUUID(uuid: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
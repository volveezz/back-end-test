import { verifyJWT } from '@/lib';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

export const authRequired = ({ required = true } = {}): RequestHandler => (
  async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (required && !token) {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: {
          message: 'UNAUTHORIZED'
        }
      });

      return;
    }

    const tokenPayload = token ? (verifyJWT(token) as JwtPayload & { id: string; }) : null

    if (required && !tokenPayload?.id) {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: {
          message: 'UNAUTHORIZED'
        }
      });

      return;
    }

    // @ts-ignore
    req.user = {
      id: tokenPayload?.id
    };
    next();
  }
);

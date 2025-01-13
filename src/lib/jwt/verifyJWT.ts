import { config } from '@/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyJWT = (token: string): JwtPayload | string => {
  try {
    const data = jwt.verify(token, config.jwt.secret);
    return data;
  } catch (_) {
    return {
      id: null,
    };
  }
};

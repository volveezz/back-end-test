import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '@/config';

export const verifyJWT = (token: string): JwtPayload | string => {
  try {
    const data = jwt.verify(token, config.jwt.secret)
    return data
  }catch (e) {
    return {
      id: null
    }
  }
}

import { config } from '@/config';
import jwt from 'jsonwebtoken';

export const getUserIdFromCookie = (token: string): string | null => {
  try {
    const data = jwt.verify(token, config.jwt.secret);

    // If the verified data is a string, return it; otherwise, return id from the JWT payload
    return typeof data === 'string' ? data : data.id;
  } catch (_) {
    return null;
  }
};

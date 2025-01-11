import { Adapter } from '@/domain/types';
import { buildCheckCredentials, CheckCredentials } from './checkCredentials';
import { buildSignAuthTokens, signAuthTokens } from './signAuthTokens';

export type AuthService = {
  checkCredentials: CheckCredentials;
  signAuthTokens: signAuthTokens;
}

export const buildAuthService = (params: Adapter): AuthService => {
  const checkCredentials = buildCheckCredentials(params)
  const signAuthTokens = buildSignAuthTokens()

  return {
    checkCredentials,
    signAuthTokens
  }
}

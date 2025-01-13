import { IUser } from '@/domain/entity/user';
import { signJWT } from '@/lib';

export type signAuthTokens = (params: { user: IUser; immortal?: boolean }) => Promise<
	| {
			accessToken: string;
			refreshToken: string;
	  }
	| never
>;

export const buildSignAuthTokens = (): signAuthTokens => {
  return async ({ user, immortal = false }) => {
    return {
      accessToken: signJWT({
        id: user.id,
        ...(!immortal && { expiresIn: '24h' }),
      }),
      refreshToken: signJWT({
        id: user.id,
        ...(!immortal && { expiresIn: '1y' }),
      }),
    };
  };
};

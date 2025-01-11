import { IUser } from '@/domain/entity/user';
import { NotFoundError } from '@/domain/errors';
import { verifyJWT } from '@/lib';
import { JwtPayload } from 'jsonwebtoken';
import { UseCaseParams } from '../types';

export type Refresh = (data: {
  refreshToken: string
}) =>
    Promise<{
  accessToken: string,
  refreshToken: string
} | never>

export const buildRefresh = ({ service, adapter }: UseCaseParams): Refresh => {
  return async ({ refreshToken }) => {
    const user = verifyJWT(refreshToken) as JwtPayload

    if (!user || !user.id) {
      throw new NotFoundError({
        code: 'USER_NOT_FOUND'
      });
    }

    const dbUser = await adapter.userRepository.get({
      where: {
        id: user.id
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        created_at: true
      }
    })

    if (!dbUser) {
      throw new NotFoundError({
        code: 'USER_NOT_FOUND'
      });
    }

    const { accessToken, refreshToken: newRT } = await service.auth.signAuthTokens({
      user: {
        id: user.id
      } as IUser
    })

    return {
      accessToken,
      refreshToken: newRT
    }
  }
}

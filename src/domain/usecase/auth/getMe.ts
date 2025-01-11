import { UseCaseParams } from '@/domain/usecase/types';
import { IUser } from '@/domain/entity/user';
import { NotFoundError } from '@/domain/errors';

export type GetMe = (data: {
  id: string,
}) =>
    Promise<IUser | never>
export const buildGetMe = ({ adapter }: UseCaseParams): GetMe=>{
  return async ({ id })=>{
    const user = await adapter.userRepository.get({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        created_at: true
      }
    })

    if (!user){
      throw new NotFoundError({
        code: 'USER_NOT_FOUND'
      })
    }

    return user
  }
}

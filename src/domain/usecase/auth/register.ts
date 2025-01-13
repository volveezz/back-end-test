import { IUser } from '@/domain/entity/user';
import { InternalError, InvalidDataError } from '@/domain/errors';
import * as bcrypt from 'bcrypt';
import { UseCaseParams } from '../types';

export type Register = (params: { email: string; password: string }) => Promise<{
	user: IUser;
}>;

export const buildRegister =
	({ adapter }: UseCaseParams): Register =>
	  async ({ email, password }) => {
	    const existingUser = await adapter.userRepository.get({
	      where: {
	        email: {
	          equals: email,
	          mode: 'insensitive',
	        },
	      },
	    });

	    if (existingUser) {
	      throw new InvalidDataError({
	        code: 'USER_FOUND',
	      });
	    }

	    const hash = bcrypt.hashSync(password as string, 10);
	    const user = await adapter.userRepository.create({
	      data: {
	        email: email,
	        password: hash,
	      },
	      select: {
	        id: true,
	        email: true,
	        avatar: true,
	        created_at: true,
	      },
	    });

	    if (!user) {
	      throw new InternalError();
	    }

	    return { user };
	  };

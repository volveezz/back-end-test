import { AdapterParams } from '@/adapter/types';
import { IUser } from '@/domain/entity/user';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Get = (
  params: Prisma.UserFindFirstArgs,
) => Promise<IUser | null | never>;
export const buildGet = ({ db }: Params): Get => {
  return async (getParams) => {
    const user = (await db.client.user.findFirst(getParams)) as IUser | null;

    return user;
  };
};

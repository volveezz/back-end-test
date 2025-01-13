import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IUser } from '@/domain/entity/user';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Delete = (
  data: Prisma.UserDeleteArgs,
  tx?: UnknownTx,
) => Promise<IUser | never>;

export const buildDelete = ({ db }: Params): Delete => {
  return async (data, tx) => {
    return (await db.getContextClient(tx).user.delete(data)) as IUser;
  };
};

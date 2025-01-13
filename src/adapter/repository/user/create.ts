import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IUser } from '@/domain/entity/user';
import { Prisma } from '@prisma/client';
type Params = Pick<AdapterParams, 'db'>;

export type Create = (
  data: Prisma.UserCreateArgs,
  tx?: UnknownTx,
) => Promise<IUser | never>;
export const buildCreate = ({ db }: Params): Create => {
  return async (data, tx) => {
    return (await db.getContextClient(tx).user.create(data)) as IUser;
  };
};

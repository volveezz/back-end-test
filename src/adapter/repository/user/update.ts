import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IUser } from '@/domain/entity/user';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.UserUpdateArgs, tx?: UnknownTx)=>Promise<IUser | never>
export const buildUpdate = ({ db }: Params): Update => {
  return async (getParams, tx) => {
    const user = await db.getContextClient(tx).user.update(getParams) as IUser
    
    return user
  }
}

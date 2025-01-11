import { AdapterParams } from '@/adapter/types';
import { buildCount, Count } from './count';
import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { buildGet, Get } from './get';
import { buildList, List } from './list';
import { buildUpdate, Update } from './update';

type Params = Pick<AdapterParams, 'db'>

export type UserRepository = {
  count: Count,
  create: Create,
  delete: Delete,
  get: Get,
  list: List,
  update: Update,
}
export const buildUserRepository = (params: Params): UserRepository=>{
  const count = buildCount(params)
  const create = buildCreate(params)
  const deleteUser = buildDelete(params)
  const get = buildGet(params)
  const list = buildList(params)
  const update = buildUpdate(params)

  return {
    count,
    create,
    delete: deleteUser,
    get,
    list,
    update,
  }
}

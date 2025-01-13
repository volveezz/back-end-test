import { AdapterParams } from '@/adapter/types';
import { buildFeedbackPostCount, Count } from './count';
import { buildFeedbackPostCreate, Create } from './create';
import { buildFeedbackPostDelete, Delete } from './delete';
import { buildFeedbackPostGet, Get } from './get';
import { buildFeedbackPostList, List } from './list';
import { buildFeedbackPostUpdate, Update } from './update';

type Params = Pick<AdapterParams, 'db'>;

export type FeedbackPostRepository = {
  count: Count;
  create: Create;
  delete: Delete;
  get: Get;
  list: List;
  update: Update;
};
export const buildFeedbackPostRepository = (
  params: Params,
): FeedbackPostRepository => {
  const count = buildFeedbackPostCount(params);
  const create = buildFeedbackPostCreate(params);
  const deleteFeedbackPost = buildFeedbackPostDelete(params);
  const get = buildFeedbackPostGet(params);
  const list = buildFeedbackPostList(params);
  const update = buildFeedbackPostUpdate(params);

  return {
    count,
    create,
    delete: deleteFeedbackPost,
    get,
    list,
    update,
  };
};

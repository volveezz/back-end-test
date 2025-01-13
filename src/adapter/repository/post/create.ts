import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IFeedbackPost } from '@/domain/entity/post';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Create = (
  data: Prisma.FeedbackPostCreateArgs,
  tx?: UnknownTx,
) => Promise<IFeedbackPost | never>;
export const buildFeedbackPostCreate = ({ db }: Params): Create => {
  return async (data, tx) => {
    const createdFeedbackPost = (await db
      .getContextClient(tx)
      .feedbackPost.create(data)) as IFeedbackPost;

    return createdFeedbackPost;
  };
};

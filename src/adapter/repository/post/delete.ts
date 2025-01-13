import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IFeedbackPost } from '@/domain/entity/post';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Delete = (
  data: Prisma.FeedbackPostDeleteArgs,
  tx?: UnknownTx,
) => Promise<IFeedbackPost | never>;
export const buildFeedbackPostDelete = ({ db }: Params): Delete => {
  return async (data, tx) => {
    const deletedFeedbackPost = (await db
      .getContextClient(tx)
      .feedbackPost.delete(data)) as IFeedbackPost;

    return deletedFeedbackPost;
  };
};

import { AdapterParams } from '@/adapter/types';
import { IFeedbackPost } from '@/domain/entity/post';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type List = (
  params: Prisma.FeedbackPostFindManyArgs,
) => Promise<Array<IFeedbackPost> | never>;
export const buildFeedbackPostList = ({ db }: Params): List => {
  return async (getParams) => {
    const feedbackPosts = (await db.client.feedbackPost.findMany(
      getParams,
    )) as Array<IFeedbackPost>;

    return feedbackPosts;
  };
};

import { AdapterParams } from '@/adapter/types';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Count = (
  params: Prisma.FeedbackPostCountArgs,
) => Promise<number | never>;
export const buildFeedbackPostCount = ({ db }: Params): Count => {
  return async (args) => {
    const feedbackPostsCount = await db.client.feedbackPost.count(args);

    return feedbackPostsCount;
  };
};

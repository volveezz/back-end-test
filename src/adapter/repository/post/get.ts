import { AdapterParams } from '@/adapter/types';
import { IFeedbackPost } from '@/domain/entity/post';
import { Prisma } from '@prisma/client';

type Params = Pick<AdapterParams, 'db'>;

export type Get = (
  params: Prisma.FeedbackPostFindFirstArgs,
) => Promise<IFeedbackPost | null | never>;
export const buildFeedbackPostGet = ({ db }: Params): Get => {
  return async (getParams) => {
    const feedbackPost = (await db.client.feedbackPost.findFirst(
      getParams,
    )) as IFeedbackPost | null;

    return feedbackPost;
  };
};

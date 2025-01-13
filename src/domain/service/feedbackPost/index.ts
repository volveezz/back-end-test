import { Adapter } from '@/adapter';
import { buildCreateFeedbackPost, CreateFeedbackPostService } from './create';
import { buildVoteFeedbackPost, VoteFeedbackPost } from './vote';

export type FeedbackPostService = {
	createFeedbackPost: CreateFeedbackPostService;
	voteFeedbackPost: VoteFeedbackPost;
};

export const buildFeedbackPostService = (params: Adapter): FeedbackPostService => {
  const createFeedbackPost = buildCreateFeedbackPost(params);
  const voteFeedbackPost = buildVoteFeedbackPost(params);

  return {
    createFeedbackPost,
    voteFeedbackPost,
  };
};

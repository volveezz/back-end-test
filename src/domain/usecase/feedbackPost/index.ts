import { UseCaseParams } from '@/domain/usecase/types';
import { buildCreateFeedbackPost, CreateFeedbackPost } from './create';
import { buildDeleteFeedbackPost, DeleteFeedbackPost } from './delete';
import { buildEditFeedbackPost, EditFeedbackPost } from './edit';
import { buildGetFeedbackPosts, GetFeedbackPosts } from './get';
import { buildVoteFeedbackPost, VoteFeedbackPost } from './vote';

export type FeedbackPostUseCase = {
	get: GetFeedbackPosts;
	create: CreateFeedbackPost;
	delete: DeleteFeedbackPost;
	edit: EditFeedbackPost;
	vote: VoteFeedbackPost;
};

export const buildFeedbackPostUseCase = (params: UseCaseParams): FeedbackPostUseCase => {
  const get = buildGetFeedbackPosts(params);
  const create = buildCreateFeedbackPost(params);
  const feedbackPostDelete = buildDeleteFeedbackPost(params);
  const edit = buildEditFeedbackPost(params);
  const vote = buildVoteFeedbackPost(params);

  return {
    get,
    create,
    delete: feedbackPostDelete,
    edit,
    vote,
  };
};

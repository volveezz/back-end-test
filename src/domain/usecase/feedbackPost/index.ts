import { UseCaseParams } from '@/domain/usecase/types';
import { buildCreateFeedbackPost, CreateFeedbackPost } from './create';
import { buildDeleteFeedbackPost, DeleteFeedbackPost } from './delete';
import { buildEditFeedbackPost, EditFeedbackPost } from './edit';
import { buildVoteFeedbackPost, VoteFeedbackPost } from './vote';

export type FeedbackPostUseCase = {
	create: CreateFeedbackPost;
	delete: DeleteFeedbackPost;
	edit: EditFeedbackPost;
	vote: VoteFeedbackPost;
};

export const buildFeedbackPostUseCase = (params: UseCaseParams): FeedbackPostUseCase => {
  const create = buildCreateFeedbackPost(params);
  const feedbackPostDelete = buildDeleteFeedbackPost(params);
  const edit = buildEditFeedbackPost(params);
  const vote = buildVoteFeedbackPost(params);

  return {
    create,
    delete: feedbackPostDelete,
    edit,
    vote,
  };
};

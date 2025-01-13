import { IFeedbackPost } from '@/domain/entity/post';
import { UseCaseParams } from '../types';

export type CreateFeedbackPost = (data: {
	title: string;
	description: string;
	category: 'general' | 'performance' | 'bug';
	status: 'idea' | 'planned' | 'in_progress' | 'completed' | 'closed';
	authorId: string;
}) => Promise<IFeedbackPost | never>;

export const buildCreateFeedbackPost = ({ service }: UseCaseParams): CreateFeedbackPost => {
  return async (creationParams) => {
    const createdFeedbackPost = await service.feedbackPost.createFeedbackPost(creationParams);

    return createdFeedbackPost;
  };
};

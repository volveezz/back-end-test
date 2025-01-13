import { IFeedbackPost } from '@/domain/entity/post';
import { InternalError, InvalidDataError, NotFoundError, UnauthorizedError } from '@/domain/errors';
import { UseCaseParams } from '../types';

export type EditFeedbackPost = (params: {
	authorId: string;
	feedbackPostId: string;
	title?: string;
	description?: string;
	category?: 'general' | 'performance' | 'bug';
	status?: 'idea' | 'planned' | 'in_progress' | 'completed' | 'closed';
}) => Promise<{ updatedFeedbackPost: IFeedbackPost }>;

export const buildEditFeedbackPost =
	({ adapter }: UseCaseParams): EditFeedbackPost =>
	  async ({ authorId, feedbackPostId, title, description, category, status }) => {

	    if (!authorId || !feedbackPostId) {
	      throw new InvalidDataError();
	    }

	    // Fetch the feedback post to check if it exists
	    const feedbackPost = await adapter.feedbackPostRepository.get({
	      where: { id: feedbackPostId },
	    });

	    if (!feedbackPost) {
	      throw new NotFoundError({ message: `Feedback post not found with id ${feedbackPostId}` });
	    }

	    // Check if the user is the author of the post
	    if (feedbackPost.author_id !== authorId) {
	      throw new UnauthorizedError();
	    }

	    // Update the feedback post with new values
	    const updatedFeedbackPost = await adapter.feedbackPostRepository.update({
	      where: { id: feedbackPostId },
	      data: {
	        title: title ?? feedbackPost.title,
	        description: description ?? feedbackPost.description,
	        category: category ?? feedbackPost.category,
	        status: status ?? feedbackPost.status,
	      },
	    });

	    if (!updatedFeedbackPost) {
	      throw new InternalError();
	    }

	    return { updatedFeedbackPost };
	  };

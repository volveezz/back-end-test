import { IFeedbackPost } from '@/domain/entity/post';
import { InternalError, InvalidDataError, NotFoundError } from '@/domain/errors';
import { UseCaseParams } from '../types';

export type VoteFeedbackPost = (params: { userId: string; feedbackPostId: string; action: 'upvote' | 'unvote' }) => Promise<IFeedbackPost>;

export const buildVoteFeedbackPost =
	({ adapter }: UseCaseParams): VoteFeedbackPost =>
	  async ({ userId, feedbackPostId, action }) => {

	    if (!userId || !feedbackPostId) {
	      throw new InvalidDataError();
	    }

	    // Fetch the feedback post to verify if it exists
	    const feedbackPost = await adapter.feedbackPostRepository.get({
	      where: { id: feedbackPostId },
	      include: { upvotes: { select: { id: true, avatar: true } } },
	    });

	    if (!feedbackPost) {
	      throw new NotFoundError();
	    }

	    // Verify if the user exists
	    const user = await adapter.userRepository.get({
	      where: { id: userId },
	      select: { id: true, avatar: true }
	    });

	    if (!user) {
	      throw new NotFoundError({
	        code: 'USER_NOT_FOUND',
	      });
	    }

	    // Handle voting action
	    switch (action) {
	    case 'upvote':
	      // If the user has already upvoted the post, do nothing
	      if (feedbackPost.upvotes.some((voter) => voter.id === userId)) {
	        throw new InternalError({ message: 'User has already upvoted this post' });
	      }

	      // Add the user to the upvotes of the post
	      feedbackPost.upvotes.push(user);
	      break;

	    case 'unvote':
	      // If the user has not upvoted the post, we throw an error
	      if (!feedbackPost.upvotes.some((voter) => voter.id === userId)) {
	        throw new InternalError({ message: 'User has not upvoted this post' });
	      }

	      // Remove the user from the upvotes of the post
	      feedbackPost.upvotes = feedbackPost.upvotes.filter((voter) => voter.id !== userId);
	      break;

	    default:
	      throw new InternalError({ message: 'Invalid action' });
	    }

	    // Save the updated post
	    const updatedPost = await adapter.feedbackPostRepository.update({
	      where: { id: feedbackPostId },
	      data: { upvotes: { set: feedbackPost.upvotes } },
	      include: { upvotes: { select: { id: true, avatar: true } } },
	    });

	    if (!updatedPost) {
	      throw new InternalError({ message: 'Failed to update post' });
	    }

	    return updatedPost;
	  };

import { InvalidDataError, NotFoundError, UnauthorizedError } from '@/domain/errors';
import { UseCaseParams } from '../types';

export type DeleteFeedbackPost = (data: { feedbackPostId: string; authorId: string }) => Promise<void>; // Changed to Promise<void>

export const buildDeleteFeedbackPost = ({ adapter }: UseCaseParams): DeleteFeedbackPost => {
  return async ({ feedbackPostId, authorId }) => {
    if (!authorId || !feedbackPostId) {
      throw new InvalidDataError({ message: `Verify provided authorId ${authorId} and feedbackPostId ${feedbackPostId}` });
    }

    // Check if the post exists
    const feedbackPost = await adapter.feedbackPostRepository.get({
      where: {
        id: feedbackPostId,
      },
      select: {
        id: true,
        author_id: true,
      },
    });

    if (!feedbackPost) {
      throw new NotFoundError({ message: `Feedback post with id ${feedbackPostId} not found` });
    }

    // Check if the post author id matches the user id who called the endpoint
    if (feedbackPost.author_id !== authorId) {
      throw new UnauthorizedError({ message: 'You are not allowed to delete this post' });
    }

    // Perform deletion of the post
    await adapter.feedbackPostRepository.delete({
      where: {
        id: feedbackPostId,
      },
    });
  };
};
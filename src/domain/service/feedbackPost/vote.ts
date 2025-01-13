import { IFeedbackPost } from '@/domain/entity/post';
import { NotFoundError, UnauthorizedError } from '@/domain/errors';
import { Adapter } from '@/domain/types';

export type VoteFeedbackPost = (data: {
	userId: string;
	feedbackPostId: string;
	action: 'upvote' | 'unvote';
}) => Promise<{ updatedPost: IFeedbackPost }>;

export const buildVoteFeedbackPost = (adapter: Adapter) => {
  const hasUserVoted = (feedbackPost: IFeedbackPost, userId: string): boolean => {
    return feedbackPost.upvotes.some((voter) => voter.id === userId);
  };

  const handleUpvote = async (feedbackPostId: string, userId: string, feedbackPost: IFeedbackPost) => {
    if (hasUserVoted(feedbackPost, userId)) {
      throw new UnauthorizedError({ message: 'User has already upvoted this feedback post' });
    }

    return await adapter.feedbackPostRepository.update({
      where: { id: feedbackPostId },
      data: {
        upvotes: { connect: { id: userId } },
      },
      select: {
        id: true,
        title: true,
        description: true,
        upvotes: true,
      },
    });
  };

  const handleUnvote = async (feedbackPostId: string, userId: string, feedbackPost: IFeedbackPost) => {
    if (!hasUserVoted(feedbackPost, userId)) {
      throw new UnauthorizedError({ message: 'User not upvoted this feedback post' });
    }

    return await adapter.feedbackPostRepository.update({
      where: { id: feedbackPostId },
      data: {
        upvotes: { disconnect: { id: userId } },
      },
      select: {
        id: true,
        title: true,
        description: true,
        upvotes: true,
      },
    });
  };

  const voteFeedbackPost: VoteFeedbackPost = async ({ userId, feedbackPostId, action }) => {
    const feedbackPost = await adapter.feedbackPostRepository.get({
      where: { id: feedbackPostId },
      include: { upvotes: true },
    });

    if (!feedbackPost) {
      throw new NotFoundError({ message: 'Feedback post not found' });
    }

    const user = await adapter.userRepository.get({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedError({ message: 'User not found' });
    }

    let updatedPost: IFeedbackPost;

    switch (action) {
    case 'upvote':
      updatedPost = await handleUpvote(feedbackPostId, userId, feedbackPost);
      break;

    case 'unvote':
      updatedPost = await handleUnvote(feedbackPostId, userId, feedbackPost);
      break;

    default:
      throw new UnauthorizedError({ message: 'Invalid action for voting' });
    }

    return { updatedPost };
  };

  return voteFeedbackPost;
};

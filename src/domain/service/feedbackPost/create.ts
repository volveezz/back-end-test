import { Adapter } from '@/adapter';
import { IFeedbackPost } from '@/domain/entity/post';
import { UnauthorizedError } from '@/domain/errors';

export type CreateFeedbackPostService = (data: {
	title: string;
	description: string;
	category: 'general' | 'performance' | 'bug';
	status: 'idea' | 'planned' | 'in_progress' | 'completed' | 'closed';
	authorId: string;
}) => Promise<IFeedbackPost | never>;

export const buildCreateFeedbackPost = (adapter: Adapter): CreateFeedbackPostService => {
  return async ({ authorId, category, description, status, title }) => {
    if (!authorId) {
      throw new UnauthorizedError({ message: 'Author Id not found' });
    }

    // Check if the author exists
    const author = await adapter.userRepository.get({
      where: { id: authorId },
      select: { id: true },
    });

    if (!author) {
      throw new UnauthorizedError({ message: 'Author not found' });
    }

    // Create the feedback post
    const feedbackPost = await adapter.feedbackPostRepository.create({
      data: {
        title,
        description,
        category,
        status,
        author: { connect: { id: authorId } },
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        created_at: true,
      },
    });

    return feedbackPost;
  };
};

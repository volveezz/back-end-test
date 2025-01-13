import { IFeedbackPost } from '@/domain/entity/post';
import { FeedbackCategory, FeedbackStatus, Prisma } from '@prisma/client';
import { UseCaseParams } from '../types';

export type GetFeedbackPosts = (data: {
  category?: FeedbackCategory;
  status?: FeedbackStatus;
  sortBy: 'votes' | 'date';
  sortOrder?: Prisma.SortOrder;
  page?: number;
  pageSize?: number; 
}) => Promise<IFeedbackPost[] | null>;

export const buildGetFeedbackPosts = ({
  adapter,
}: UseCaseParams): GetFeedbackPosts => {
  return async ({ category, status, sortBy, sortOrder, page = 1, pageSize = 10 }) => {
    const takeNum = parseInt(pageSize as unknown as string, 10);
    const where: Prisma.FeedbackPostWhereInput = {};
    if (category) {
      where.category = category; 
    }
    if (status) {
      where.status = status;
    }

    const orderBy: Prisma.FeedbackPostOrderByWithRelationInput = {};
    if (sortBy === 'votes') {
      orderBy.upvotes = { _count: sortOrder || 'desc' };
    } else if (sortBy === 'date') {
      orderBy.created_at = sortOrder || 'desc'; 
    }

    // Calculate the offset for pagination
    const skip = (page - 1) * takeNum;

    // Retrieve all feedback posts matching the filter with the amount of upvotes
    const posts = await adapter.feedbackPostRepository.list({ where, orderBy, skip, take: takeNum, include: { _count: true } });

    return posts;
  };
};
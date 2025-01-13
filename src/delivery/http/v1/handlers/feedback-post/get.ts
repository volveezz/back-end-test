import { DeliveryParams } from '@/delivery/types';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'feedbackPost'>;

export type GetFeedbackPosts = (req: Request, res: Response) => Promise<Response>;

export const buildGetFeedbackPosts = ({ feedbackPost }: Params): GetFeedbackPosts => {
  return async (req, res) => {
    try {
      const { category, status, sortBy, sortOrder, page, pageSize } = req.query as any;
    
      const posts = await feedbackPost.get({ category, status, sortBy, sortOrder, page, pageSize });

      return res.status(200).json(posts);
    } catch (_) {
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
  };
};

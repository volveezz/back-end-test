import { DeliveryParams } from '@/delivery/types';
import { getUserIdFromCookie } from '@/lib/jwt/getUserIdFromCookie';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'feedbackPost'>;

export type DeleteFeedbackPost = (req: Request, res: Response) => Promise<Response>;

export const buildDeleteFeedbackPost = ({ feedbackPost }: Params): DeleteFeedbackPost => {
  return async (req, res) => {
    const feedbackPostId = req.params.id;
    const authorId = getUserIdFromCookie(req.cookies.accessToken);
    
    if (!authorId|| !feedbackPostId) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    await feedbackPost.delete({ authorId, feedbackPostId });

    return res.status(204).json({ message: 'Feedback post deleted' });
  };
};

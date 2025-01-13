import { DeliveryParams } from '@/delivery/types';
import { getUserIdFromCookie } from '@/lib/jwt/getUserIdFromCookie';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'feedbackPost'>;

export type VoteFeedbackPost = (req: Request, res: Response) => Promise<Response>;

export const buildVoteFeedbackPost = ({ feedbackPost }: Params): VoteFeedbackPost => {
  return async (req, res) => {
    const { action } = req.body;
    const feedbackPostId = req.params.id;
    const userId = getUserIdFromCookie(req.cookies.accessToken);
    
    if (!userId || !feedbackPostId) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const votedFeedbackPost = await feedbackPost.vote({ action, feedbackPostId, userId });

    return res.status(200).json(votedFeedbackPost);
  };
};

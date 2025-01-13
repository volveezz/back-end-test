import { DeliveryParams } from '@/delivery/types';
import { getUserIdFromCookie } from '@/lib/jwt/getUserIdFromCookie';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'feedbackPost'>;

export type EditFeedbackPost = (req: Request, res: Response) => Promise<Response>;

export const buildEditFeedbackPost = ({ feedbackPost }: Params): EditFeedbackPost => {
  return async (req, res) => {
    const { title, description, category, status, authorId: userId } = req.body;
    const feedbackPostId = req.params.id;

    const authorId = userId || getUserIdFromCookie(req.cookies.accessToken);
 
    const createdFeedbackPost = await feedbackPost.edit({ title, description, category, status, feedbackPostId, authorId });

    return res.status(200).json(createdFeedbackPost);
  };
};

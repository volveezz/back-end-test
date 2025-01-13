import { DeliveryParams } from '@/delivery/types';
import { getUserIdFromCookie } from '@/lib/jwt/getUserIdFromCookie';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'feedbackPost'>;

export type CreateFeedbackPost = (req: Request, res: Response) => Promise<Response>;

export const buildCreateFeedbackPost = ({ feedbackPost }: Params): CreateFeedbackPost => {
  return async (req, res) => {
    const { title, description, category, status, authorId: userId } = req.body;

    const authorId = userId || getUserIdFromCookie(req.cookies.accessToken);

    const createdFeedbackPost = await feedbackPost.create({ title, description, category, status, authorId });

    return res.status(201).json(createdFeedbackPost);
  };
};

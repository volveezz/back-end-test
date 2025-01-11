import { DeliveryParams } from '@/delivery/types';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'auth'>

export type Authorize = (req: Request, res: Response) => Promise<Response>

export const buildAuthorize = ({ auth }: Params): Authorize => {
  return async (req, res) => {
    const data = await auth.authorize({
      email: req.body.email?.toLowerCase(),
      password: req.body.password,
    });

    return res.status(200).json(data)
  }
}

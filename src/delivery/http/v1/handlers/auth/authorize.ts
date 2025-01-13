import { DeliveryParams } from '@/delivery/types';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'auth'>;

export type Authorize = (req: Request, res: Response) => Promise<Response>;

export const buildAuthorize = ({ auth }: Params): Authorize => {
  return async (req, res) => {
    const data = await auth.authorize({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    });

    // Save the access token in user cookies
    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      // Expires in 24 hours
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    return res.status(200).json(data);
  };
};

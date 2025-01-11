import { DeliveryParams } from '@/delivery/types';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'auth'>;

export type Register = (req: Request, res: Response) => Promise<Response>;
export const buildRegister = ({ auth }: Params): Register => {
  return async (req, res) => {
    const data = await auth.register({
      email: req.body.email?.toLowerCase(),
      password: req.body.password,
    });

    return res.status(200).json(data);
  };
};

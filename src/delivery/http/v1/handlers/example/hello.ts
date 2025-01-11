import { DeliveryParams } from '@/delivery/types';
import { Request, Response } from 'express';

type Params = Pick<DeliveryParams, 'example'>;

export type Hello = (req: Request, res: Response) => Promise<Response>;

export const buildHello = ({ example }: Params): Hello => (
  async (req, res) => {
    const data = await example.hello();

    return res.status(200).json(data);
  }
);

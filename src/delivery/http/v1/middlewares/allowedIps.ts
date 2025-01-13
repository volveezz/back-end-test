import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ipaddr from 'ipaddr.js';

export const allowedIps = (ips: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.header('x-real-ip') || req.header('x-forwarded-for') || req.ip;
    const current_ip = ipaddr.process(ip as string).toString();

    if (!ips.includes(current_ip)) {
      return res.status(httpStatus.FORBIDDEN).json({
        error: {
          message: 'FORBIDDEN',
        },
      });
    }
    next();
  };
};

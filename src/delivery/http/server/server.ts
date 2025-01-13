import { config } from '@/config/index';
import cookieParser from 'cookie-parser';
import Express from 'express';

const buildStart = (app: Express.Express) => {
  return (router: Express.Router) => {
    app.use('/api/v1', router);

    const server = app.listen(config.http.port, config.http.host);

    const stop = () => {
      server.close();
    };

    return stop;
  };
};

export const buildServer = () => {
  const app = Express();

  app.use(cookieParser());

  return {
    start: buildStart(app),
  };
};

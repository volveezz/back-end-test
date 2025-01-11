import * as adapter from '@/adapter';
import { config as cfg, config, devMode } from '@/config';
import * as server from '@/delivery/http/server';
import * as httpHandler from '@/delivery/http/v1/handlers';
import { buildRouter } from '@/delivery/http/v1/router';
import * as service from '@/domain/service';
import * as usecase from '@/domain/usecase';
import chalk from 'chalk';
import cluster from 'node:cluster';
import os from 'node:os';
import * as client from './lib/clients';
import { log, logger } from './lib/logger';

process.on('uncaughtException', function(err) { 
  logger.log({
    level: 'error',
    message: err.message,
    stack: err.stack
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
  console.error('Promise:', promise);
});

const entry = async () => {
  if (cluster.isPrimary) {
    log('Server starting...');
  }
  
  const db = client.prismaClient.newClient({
    user: cfg.postgres.user,
    password: cfg.postgres.password,
    host: cfg.postgres.host,
    port: cfg.postgres.port,
    db: cfg.postgres.db
  });

  const example = await client.example.newClient({
    message: config.example.message
  });

  const ad = adapter.buildAdapter({
    db,
    example
  });

  const svc = service.buildService(ad);

  const uc = usecase.buildUseCase({
    service: svc,
    adapter: ad
  });

  if (cluster.isPrimary) {
    if (!devMode) {
      const workerCount = process.env.WORKER_COUNT ? parseInt(process.env.WORKER_COUNT) : os.cpus().length - 1;

      for (let i = 0; i < workerCount; i++) {
        cluster.fork();
      }
    
      cluster.on('exit', (worker) => {
        log(`Worker ${worker.process.pid} died.`);
      });
    }
  }

  if (cluster.isPrimary) {
    const serverPort = cfg.http.port;
    const serverHost = cfg.http.host;

    log(
      `Server started ${chalk.blue(`[Port: ${serverPort}]`)} ${devMode ? chalk.red('[Dev Mode]') : chalk.green('[Prod Mode]')}\n` +
      `\tAPI URL: ${chalk.gray.underline(`http://${serverHost}:${serverPort}/api/v1`)}\n` +
      `\tSwagger URL: ${chalk.gray.underline(`http://${serverHost}:${serverPort}/api/v1/swagger`)} (OpenAPI: ${chalk.gray.underline(`http://${serverHost}:${serverPort}/api/v1/swagger.json`)} )\n`
    );

    if (!devMode) {
      return;
    }
  }

  const routerHandler = httpHandler.buildHandler({ ...uc, ...ad });
  const router = buildRouter(routerHandler);

  const srv = server.buildServer();
  const stopServerFn = srv.start(router);

  if (cluster.isWorker) {
    log(`Worker ${process.pid} started.`);
  }

  const sigListener = () => {
    process.exit(0);
  };
  const stopListener = () => {
    if (cluster.isPrimary) {
      log('Server stoped.');
    }

    stopServerFn();
    process.exit(0);
  };

  process.on('SIGINT', sigListener);
  process.on('SIGQUIT', sigListener);
  process.on('SIGTERM', sigListener);
  process.on('exit', stopListener);
}

entry();

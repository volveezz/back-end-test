import { PrismaClient } from '@prisma/client';

export const newClient = () => {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.POSTGRES_URL}?connection_limit=10`,
      },
    },
  });

  const getContextClient = (tx?: unknown) => {
    if (tx instanceof PrismaClient) {
      return tx;
    }
    return client;
  };

  return {
    client,
    getContextClient,
  };
};

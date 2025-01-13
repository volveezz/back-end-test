import { PrismaClient } from '@prisma/client';

export type AdapterParams = {
	db: {
		client: PrismaClient;
		getContextClient: (tx?: unknown) => PrismaClient;
	};
	example: {
		client: {
			hello: () => void;
		};
	};
};

export type UnknownTx = unknown;

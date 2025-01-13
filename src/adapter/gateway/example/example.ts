import { AdapterParams } from '@/adapter/types';

export type Example = () => Promise<void>;

export const buildExample =
  ({ example }: AdapterParams): Example =>
    async () => {
      example.client.hello();
    };

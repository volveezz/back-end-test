import { IExample } from '@/domain/entity/example';
import { Adapter } from '../../types';

export type Hello = (data: { example: IExample }) => Promise<string>;

export const buildHello =
	({ exampleGateway }: Adapter): Hello =>
	  async ({ example: { hello } }) => {
	    await exampleGateway.example();

	    return hello;
	  };

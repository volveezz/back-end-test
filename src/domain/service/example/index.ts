import { Adapter } from '../../types';
import { buildHello, Hello } from './hello';

export type ExampleService = {
	hello: Hello;
};

export const buildExampleService = (params: Adapter): ExampleService => {
  const hello = buildHello(params);

  return {
    hello,
  };
};

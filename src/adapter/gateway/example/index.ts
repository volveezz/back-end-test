import { AdapterParams } from '@/adapter/types';
import { Example, buildExample } from './example';

export type ExampleGateway = {
  example: Example;
};

export const buildExampleGateway = (params: AdapterParams): ExampleGateway => {
  const example = buildExample(params);

  return {
    example,
  };
};

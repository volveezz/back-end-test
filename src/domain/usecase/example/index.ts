import { UseCaseParams } from '@/domain/usecase/types';
import { buildHello, Hello } from './hello';

export type ExampleUseCase = {
	hello: Hello;
};

export const buildExampleUseCase = (params: UseCaseParams): ExampleUseCase => {
  const hello = buildHello(params);

  return {
    hello,
  };
};

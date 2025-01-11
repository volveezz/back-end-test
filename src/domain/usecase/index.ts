import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildExampleUseCase, ExampleUseCase } from './example';
import { UseCaseParams } from './types';

export type UseCase = {
  auth: AuthUseCase;
  example: ExampleUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    auth,
    example
  }
}

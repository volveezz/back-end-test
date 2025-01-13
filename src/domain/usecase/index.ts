import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildExampleUseCase, ExampleUseCase } from './example';
import { buildFeedbackPostUseCase, FeedbackPostUseCase } from './feedbackPost';
import { UseCaseParams } from './types';

export type UseCase = {
	auth: AuthUseCase;
	feedbackPost: FeedbackPostUseCase;
	example: ExampleUseCase;
};

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const feedbackPost = buildFeedbackPostUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    auth,
    feedbackPost,
    example,
  };
};

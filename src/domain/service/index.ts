import { Adapter } from '../types';
import { AuthService, buildAuthService } from './auth';
import { buildExampleService, ExampleService } from './example';
import { buildFeedbackPostService, FeedbackPostService } from './feedbackPost';

export type Service = {
	auth: AuthService;
	feedbackPost: FeedbackPostService;
	example: ExampleService;
};

export const buildService = (params: Adapter): Service => {
  const auth = buildAuthService(params);
  const feedbackPost = buildFeedbackPostService(params);
  const example = buildExampleService(params);

  return {
    auth,
    feedbackPost,
    example,
  };
};

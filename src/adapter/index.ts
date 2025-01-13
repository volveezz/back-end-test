import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildFeedbackPostRepository, FeedbackPostRepository } from './repository/post';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';

export type Adapter = {
	userRepository: UserRepository;
	feedbackPostRepository: FeedbackPostRepository;
	exampleGateway: ExampleGateway;
};

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const feedbackPostRepository = buildFeedbackPostRepository(params);
  const exampleGateway = buildExampleGateway(params);

  return {
    userRepository,
    feedbackPostRepository,
    exampleGateway,
  };
};

import { ExampleClient } from './types';

type Params = {
	message: string;
};

export const newClient = ({ message }: Params): { client: ExampleClient } => {
  const client: ExampleClient = {
    hello() {
      console.log(message);
    },
  };

  return {
    client,
  };
};

export * from './types';

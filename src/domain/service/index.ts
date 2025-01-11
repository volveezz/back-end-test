import { Adapter } from '../types';
import { AuthService, buildAuthService } from './auth';
import { buildExampleService, ExampleService } from './example';

export type Service = {
  auth: AuthService;
  example: ExampleService;  
}

export const buildService = (params: Adapter): Service => {
  const auth = buildAuthService(params); 
  const example = buildExampleService(params);
  
  return {
    auth,
    example
  }
}
  

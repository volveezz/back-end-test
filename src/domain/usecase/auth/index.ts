import { UseCaseParams } from '@/domain/usecase/types';
import { Authorize, buildAuthorize } from './authorize';
import { buildGetMe, GetMe } from './getMe';
import { buildRefresh, Refresh } from './refresh';
import { buildRegister, Register } from './register';

export type AuthUseCase = {
	getMe: GetMe;
	refresh: Refresh;
	authorize: Authorize;
	register: Register;
};

export const buildAuthUseCase = (params: UseCaseParams): AuthUseCase => {
  const getMe = buildGetMe(params);
  const refresh = buildRefresh(params);
  const authorize = buildAuthorize(params);
  const register = buildRegister(params);

  return {
    getMe,
    refresh,
    authorize,
    register,
  };
};

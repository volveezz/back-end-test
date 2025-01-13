import { Adapter } from '@/adapter';
import { Service } from '@/domain/service';

export type UseCaseParams = {
	service: Service;
	adapter: Adapter;
};

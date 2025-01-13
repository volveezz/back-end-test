import Express from 'express';

export interface IHandler {
	registerRoutes: (root: Express.Router) => void;
}

export interface AuthRequest extends Express.Request {
	user: {
		id: string;
	};
}

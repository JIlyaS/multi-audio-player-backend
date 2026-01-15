import type { NextFunction, Request, Response, Router } from 'express';
import type { IMiddleware } from './middleware.interface.js';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?: IMiddleware[];
	//   method: 'get' | 'post' | 'delete' | 'patch' | 'put';
}

export type ExpressReturnType = Response<any, Record<string, any>>;

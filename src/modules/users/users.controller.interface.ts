import type { Request, Response, NextFunction } from 'express';

export interface IUserController {
	login: (req: Request, response: Response, next: NextFunction) => Promise<void>;
	register: (req: Request, response: Response, next: NextFunction) => Promise<void>;
}

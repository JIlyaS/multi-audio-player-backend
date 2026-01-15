import type { Request, Response, NextFunction } from 'express';
import type { HTTPError } from './httpError.class.js';

export interface IExceptionFilter {
	catch: (err: Error | HTTPError, req: Request, res: Response, next: NextFunction) => void;
}

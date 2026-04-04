import type { Request, Response, NextFunction } from 'express';
import type { IMiddleware } from './middleware.interface.js';
import { type JwtPayload } from 'jsonwebtoken';
import pkg from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			// Bearer JWT
			pkg.verify(req.headers.authorization.split(' ')[1] || '', this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					// TODO: Возможно для security делать запрос в базу - но не использовать глобально
					req.user = (payload as JwtPayload).email;
					next();
				}
			});
		} else {
			next();
		}
	}
}

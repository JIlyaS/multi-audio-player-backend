import type { NextFunction, Request, Response } from 'express';
// import type { LoggerService } from '../logger/logger.service.js';
import type { IExceptionFilter } from './exceptionFilter.interface.js';
import { HTTPError } from './httpError.class.js';
import { inject, injectable } from 'inversify';
import type { ILogger } from '../logger/logger.interface.js';
import { TYPES } from '../types/types.js';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	// private logger: LoggerService;

	// constructor(logger: LoggerService) {
	//   this.logger = logger;
	// }

	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err?.context}] Ошибка ${err.statusCode} ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}

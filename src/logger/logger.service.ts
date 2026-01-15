import { Logger, type ILogObj } from 'tslog';
import type { ILogger } from './logger.interface.js';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger!: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({
			//   displayInstanceName: false,
			//   displayLoggerName: false,
			//   displayFilePath: 'hidden',
			//   displayFunctionName: false,
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		// Отправка в Sentry
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}

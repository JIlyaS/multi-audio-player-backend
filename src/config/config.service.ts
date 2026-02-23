import { inject, injectable } from 'inversify';
import type { IConfigService } from './config.service.interface.js';
import { config, type DotenvConfigOutput, type DotenvError, type DotenvParseOutput } from 'dotenv';
import { TYPES } from '../types/types.js';
import type { ILogger } from '../logger/logger.interface.js';

@injectable()
export class ConfigService implements IConfigService {
	private config!: DotenvConfigOutput;
	constructor(@inject(TYPES.Logger) private readonly logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
		} else {
			this.logger.log('[ConfigService] Конфигурация .env загружена');
			this.config = result.parsed as DotenvConfigOutput;
		}
	}
	get(key: string): DotenvError | DotenvParseOutput | undefined {
		return this.config[key as keyof DotenvConfigOutput];
	}
}

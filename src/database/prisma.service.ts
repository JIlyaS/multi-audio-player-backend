import { inject, injectable } from 'inversify';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { TYPES } from '../types/types.js';
import type { IConfigService } from '../config/config.service.interface.js';

@injectable()
export class PrismaService {
	public readonly client!: PrismaClient;

	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {
		const adapter = new PrismaPg({
			connectionString: String(this.configService.get('DATABASE_URL')),
		});
		this.client = new PrismaClient({ adapter });
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect;
			console.log('[PrismaService] Успешное подключились к базе данных');
		} catch (err) {
			if (err instanceof Error) {
				console.log('[PrismaService] Ошибка подключения к базе данных: ' + err.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect;
	}
}

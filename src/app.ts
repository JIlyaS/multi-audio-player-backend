import express, { Router, type Express } from 'express';
import cors from 'cors';
import type { Server } from 'node:http';
// import { LoggerService } from './logger/logger.service.js';
import type { TrackController } from './modules/tracks/tracks.controller.js';
import type { ExceptionFilter } from './errors/exception.filter.js';
import type { ILogger } from './logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types/types.js';
import 'reflect-metadata';
import type { IConfigService } from './config/config.service.interface.js';
import type { ITrackController } from './modules/tracks/tracks.controller.interface.js';
import type { IExceptionFilter } from './errors/exceptionFilter.interface.js';
import type { PrismaService } from './database/prisma.service.js';
// import { json } from 'body-parser';
// import itemRoutes from './routes/itemRoutes';
// import { errorHandler } from './middlewares/errorHandler';

@injectable()
export class App {
	private app!: Express;
	private server!: Server;
	private port!: number;
	// private logger!: ILogger;
	// private trackController!: TrackController;
	// private exceptionFilter!: ExceptionFilter;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.TrackController) private trackController: TrackController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
		// this.logger = logger;
		// this.trackController = trackController;
		// this.exceptionFilter = exceptionFilter;
	}

	public useRoutes(): void {
		const apiV1Router = Router();
		// Routes
		// app.use('/api/items', itemRoutes);
		this.app.use('/tracks', this.trackController.router);

		// this.app.use('/api/v1', apiV1Router);
	}

	private useMiddleware(): void {
		this.app.use(express.json());
		// this.app.use(json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use('/static', express.static('files'));

		this.app.use(cors());
	}

	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port, () =>
			// console.log(`Сервер запущен на http://localhost:${this.port}`),
			this.logger.log(`Сервер запущен на http://localhost:${this.port}`),
		);
	}
}

// Global error handler (should be after routes)
// app.use(errorHandler);

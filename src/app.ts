import express, { Router, type Express } from 'express';
import cors from 'cors';
import type { Server } from 'node:http';
import type { TrackController } from './modules/tracks/tracks.controller.js';
import type { ExceptionFilter } from './errors/exception.filter.js';
import type { ILogger } from './logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types/types.js';
import 'reflect-metadata';
import type { IConfigService } from './config/config.service.interface.js';
import type { IExceptionFilter } from './errors/exceptionFilter.interface.js';
import type { PrismaService } from './database/prisma.service.js';
import type { UserController } from './modules/users/users.controller.js';
import type { PlaylistController } from './modules/playlists/playlists.controller.js';

@injectable()
export class App {
	private app!: Express;
	private server!: Server;
	private port!: number;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.TrackController) private trackController: TrackController,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.PlaylistController) private playlistController: PlaylistController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	public useRoutes(): void {
		const apiV1Router = Router();
		apiV1Router.use('/tracks', this.trackController.router);
		apiV1Router.use('/auth', this.userController.router);
		apiV1Router.use('/playlists', this.playlistController.router);

		this.app.use('/api/v1', apiV1Router);
	}

	private useMiddleware(): void {
		this.app.use(express.json());
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
			this.logger.log(`Сервер запущен на http://localhost:${this.port}`),
		);
	}
}

// Global error handler (should be after routes)
// app.use(errorHandler);

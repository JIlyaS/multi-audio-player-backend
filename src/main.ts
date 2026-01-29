import { Container, ContainerModule } from 'inversify';
import { App } from './app.js';
import { ExceptionFilter } from './errors/exception.filter.js';
import { LoggerService } from './logger/logger.service.js';
import { TrackController } from './modules/tracks/tracks.controller.js';
import type { ILogger } from './logger/logger.interface.js';
import { TYPES } from './types/types.js';
import type { IExceptionFilter } from './errors/exceptionFilter.interface.js';
import type { ITrackService } from './modules/tracks/tracks.service.interface.js';
import { TrackService } from './modules/tracks/tracks.service.js';
import type { IConfigService } from './config/config.service.interface.js';
import { ConfigService } from './config/config.service.js';
import { PrismaService } from './database/prisma.service.js';
import { TracksRepository } from './modules/tracks/tracks.repository.js';
import type { ITrackRepository } from './modules/tracks/tracks.repository.interface.js';
import type { IUserController } from './modules/users/users.controller.interface.js';
import { UserController } from './modules/users/users.controller.js';
import type { IUserService } from './modules/users/users.service.interface.js';
import { UserService } from './modules/users/users.service.js';
import type { IUserRepository } from './modules/users/users.repository.interface.js';
import { UserRepository } from './modules/users/users.repository.js';
import type { IPlaylistController } from './modules/playlists/playlists.controller.interface.js';
import { PlaylistController } from './modules/playlists/playlists.controller.js';
import type { IPlaylistService } from './modules/playlists/playlists.service.interface.js';
import { PlaylistService } from './modules/playlists/playlists.service.js';
import type { IPlaylistRepository } from './modules/playlists/playlists.repository.interface.js';
import { PlaylistRepository } from './modules/playlists/playlists.repository.js';

export const appBindings = new ContainerModule((container) => {
	container.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
	container.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	container.bind<TrackController>(TYPES.TrackController).to(TrackController);
	container.bind<IPlaylistController>(TYPES.PlaylistController).to(PlaylistController);
	container.bind<IPlaylistService>(TYPES.PlaylistService).to(PlaylistService);
	container.bind<IPlaylistRepository>(TYPES.PlaylistRepository).to(PlaylistRepository);
	container.bind<ITrackService>(TYPES.TrackService).to(TrackService);
	container.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	container.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	container.bind<ITrackRepository>(TYPES.TrackRepository).to(TracksRepository);
	container.bind<IUserController>(TYPES.UserController).to(UserController);
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
	container.bind<App>(TYPES.Application).to(App);
});

export interface IBootsrtrapReturn {
	appContainer: Container;
	app: App;
}

function bootstrap(): IBootsrtrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();

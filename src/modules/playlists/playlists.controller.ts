/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable prettier/prettier */
import type { Request, Response } from 'express';
import { BaseController } from '../../common/base.controller.js';
// import type { LoggerService } from '../../logger/logger.service.js';
// import { HTTPError } from '../../errors/httpError.class.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types/types.js';
import type { ILogger } from '../../logger/logger.interface.js';
import 'reflect-metadata';
import { PlaylistEntity } from './playlist.entity.js';
// import type { ITrackService } from './tracks.service.interface.js';
import { ValidateMiddleware } from '../../common/validate.middleware.js';
import type { IPlaylistController } from './playlists.controller.interface.js';
import type { CreatePlaylistDto } from './dto/create-playlist.dto.js';
import type { IPlaylistService } from './playlists.service.interface.js';
import type { UpdatePlaylistDto } from './dto/update-playlist.dto.js';


type RequestBodyParams<TParams, TBody> = Request<TParams, {}, TBody>
type RequestBody<T> = Request<{}, {}, T>;

@injectable()
export class PlaylistController extends BaseController implements IPlaylistController {
	constructor(
		@inject(TYPES.Logger) private readonly loggerService: ILogger,
		@inject(TYPES.PlaylistService) private readonly playlistService: IPlaylistService,
	) {
		super(loggerService, 'playlists');
		this.bindRoutes([
			// middlewares: [new ValidateMiddleware(dto)]
			{ path: '/', method: 'get', func: this.getPlaylists },
			{ path: '/:id', method: 'get', func: this.getPlaylist },
			{ path: '/', method: 'post', func: this.createPlaylist },
			{ path: '/', method: 'patch', func: this.updatePlaylist },
			{ path: '/:id', method: 'delete', func: this.deletePlaylist },
		]);
	}

	async getPlaylists(req: Request, res: Response): Promise<void> {
		const result = await this.playlistService.index();
		// Request<{}, {}, DTO>
		// console.log('getTracks');
		// const result = await this.trackService.index();
		this.ok(res, result);
		// next(new HTTPError(404, 'Ошибка', 'getTracks'));
	}

	async getPlaylist(req: Request, res: Response): Promise<void> {
		// TODO: Написать логику не верного id
       const id = req.params.id || "";

	   const result = await this.playlistService.get(id);
       
	   this.ok(res, result);
	}

	async createPlaylist({ body }: Request<{}, {}, CreatePlaylistDto>, res: Response): Promise<void> {
		const result = await this.playlistService.create(body);
		// const newTrack = new Track();
		// await this.trackService.load();
		this.ok(res, result);
	}

	async updatePlaylist(
		req: RequestBody<UpdatePlaylistDto>,
		res: Response,
	): Promise<void> {
		// TODO: Нужно проверять корректный ли формат ответа		
		// const id = req.params.id;
		const body = req.body;
		const result = await this.playlistService.update(body);
		
		// const newTrack = new Track();
		// await this.trackService.load();
		this.ok(res, result);
	}

	// experimental
	// TODO: Приватный запрос
	deletePlaylist(req: Request, res: Response): void {
		this.ok(res, 'deletePlaylist');
	}
}

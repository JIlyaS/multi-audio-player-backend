/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/base.controller.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types/types.js';
import type { ILogger } from '../../logger/logger.interface.js';
import 'reflect-metadata';
import { ValidateMiddleware } from '../../common/validate.middleware.js';
import type { IPlaylistController } from './playlists.controller.interface.js';
import type { CreatePlaylistDto } from './dto/create-playlist.dto.js';
import type { IPlaylistService } from './playlists.service.interface.js';
import type { UpdatePlaylistDto } from './dto/update-playlist.dto.js';
import { HTTPError } from '../../errors/httpError.class.js';

type RequestBodyParams<TParams, TBody> = Request<TParams, {}, TBody>;
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
		this.ok(res, result);
	}

	async getPlaylist(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.params.id;

		if (!id) {
			return next(new HTTPError(400, 'Не верный запрос', 'getPlaylist'));
		}

		const result = await this.playlistService.get(id);

		if (!result) {
			return next(new HTTPError(404, 'Такого плейлиста не существует', 'getPlaylist'));
		}

		this.ok(res, result);
	}

	async createPlaylist({ body }: Request<{}, {}, CreatePlaylistDto>, res: Response): Promise<void> {
		// TODO: Нужно проверять корректный ли формат ответа
		const result = await this.playlistService.create(body);
		this.ok(res, result);
	}

	async updatePlaylist(req: RequestBody<UpdatePlaylistDto>, res: Response): Promise<void> {
		// TODO: Нужно проверять корректный ли формат ответа
		const body = req.body;
		const result = await this.playlistService.update(body);

		this.ok(res, result);
	}

	async deletePlaylist(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.params.id;

		if (!id) {
			return next(new HTTPError(400, 'Не верный запрос'));
		}

		const result = await this.playlistService.get(id);

		if (!result) {
			return next(new HTTPError(404, 'Такого плейлиста не существует'));
		}

		const deletedPlaylist = await this.playlistService.delete(id);

		this.ok(res, { id: deletedPlaylist.id });
	}
}

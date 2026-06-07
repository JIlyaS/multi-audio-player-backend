/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/base.controller.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types/types.js';
import type { ILogger } from '../../logger/logger.interface.js';
import 'reflect-metadata';
import { ValidateMiddleware } from '../../common/validate.middleware.js';
import type { IFolderController } from './folders.controller.interface.js';
import type { IFolderService } from './folders.service.interface.js';
import { HTTPError } from '../../errors/httpError.class.js';
import type { CreateFolderDto } from './dto/create-folder.dto.js';
import type { UpdateFolderDto } from './dto/update-folder.dto.js';

type RequestBodyParams<TParams, TBody> = Request<TParams, {}, TBody>;
type RequestBody<T> = Request<{}, {}, T>;

@injectable()
export class FolderController extends BaseController implements IFolderController {
	constructor(
		@inject(TYPES.Logger) private readonly loggerService: ILogger,
		@inject(TYPES.FolderService) private readonly folderService: IFolderService,
	) {
		super(loggerService, 'folders');
		this.bindRoutes([
			// middlewares: [new ValidateMiddleware(dto)]
			{ path: '/', method: 'get', func: this.getFolders },
			{ path: '/:id', method: 'get', func: this.getFolder },
			{ path: '/', method: 'post', func: this.createFolder },
			{ path: '/', method: 'patch', func: this.updateFolder },
			{ path: '/:id', method: 'delete', func: this.deleteFolder },
		]);
	}

	async getFolders(req: Request, res: Response): Promise<void> {
		const global = Boolean(req.query.global);

		const result = await this.folderService.index(global);
		this.ok(res, result);
	}

	async getFolder(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.params.id;

		if (!id) {
			return next(new HTTPError(400, 'Не верный запрос', 'getFolder'));
		}

		const result = await this.folderService.get(id);

		if (!result) {
			return next(new HTTPError(404, 'Такой папки не существует', 'getFolder'));
		}

		this.ok(res, result);
	}

	async createFolder({ body }: Request<{}, {}, CreateFolderDto>, res: Response): Promise<void> {
		// TODO: Нужно проверять корректный ли формат ответа
		const result = await this.folderService.create(body);
		this.ok(res, result);
	}

	async updateFolder(req: RequestBody<UpdateFolderDto>, res: Response): Promise<void> {
		// TODO: Нужно проверять корректный ли формат ответа
		const body = req.body;
		const result = await this.folderService.update(body);

		this.ok(res, result);
	}

	async deleteFolder(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.params.id;

		if (!id) {
			return next(new HTTPError(400, 'Не верный запрос'));
		}

		const result = await this.folderService.get(id);

		if (!result) {
			return next(new HTTPError(404, 'Такой папки не существует'));
		}

		const deletedFolder = await this.folderService.delete(id);

		this.ok(res, { id: deletedFolder.id });
	}
}

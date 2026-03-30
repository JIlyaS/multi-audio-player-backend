import type { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/base.controller.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types/types.js';
import type { ILogger } from '../../logger/logger.interface.js';
import 'reflect-metadata';
import type { ITrackController } from './tracks.controller.interface.js';
import { TrackEntity } from './track.entity.js';
import type { ITrackService } from './tracks.service.interface.js';
import { ValidateMiddleware } from '../../common/validate.middleware.js';
import { AuthGuard } from '../../common/auth.guard.js';
import { HTTPError } from '../../errors/httpError.class.js';

@injectable()
export class TrackController extends BaseController implements ITrackController {
	constructor(
		@inject(TYPES.Logger) private readonly loggerService: ILogger,
		@inject(TYPES.TrackService) private readonly trackService: ITrackService,
	) {
		super(loggerService, 'tracks');
		this.bindRoutes([
			// middlewares: [new ValidateMiddleware(dto)]
			{ path: '/', method: 'get', func: this.getTracks },
			{ path: '/load', method: 'get', func: this.loadTracks },
			{ path: '/:id', method: 'delete', func: this.deleteTrack, middlewares: [new AuthGuard()] },
		]);
	}

	async getTracks(req: Request, res: Response): Promise<void> {
		const result = await this.trackService.index();
		this.ok(res, result);
	}

	// TODO: Стоит ли делать запрос приватным?
	async loadTracks(req: Request, res: Response): Promise<void> {
		await this.trackService.load(req);
		this.ok(res, 'Данные успешно загружены');
	}

	// TODO: Трек удаляется из базы, но не удаляется из файлово системы, при запросе GET /load удалённый трек снова попадет в БД
	async deleteTrack(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.params.id;

		if (!id) {
			return next(new HTTPError(400, 'Не верный запрос'));
		}

		const result = await this.trackService.get(id);

		if (!result) {
			return next(new HTTPError(404, 'Такого трека не существует'));
		}

		const deletedTrack = await this.trackService.delete(id);

		this.ok(res, { id: deletedTrack.id });
	}
}

export async function getTracks(): Promise<void> {
	// _: Request<unknown, unknown, unknown>,
	// res: Response,
	// const limitNum = Number(query?.limit);
	// const limit =
	//   query?.limit && !Number.isNaN(limitNum) && limitNum < MAX_OFFER_COUNT
	//     ? limitNum
	//     : DEFAULT_OFFER_COUNT;
	// const userId = tokenPayload?.sub;
	// if (!Number.isSafeInteger(limit)) {
	//   throw new HttpError(
	//     StatusCodes.BAD_REQUEST,
	//     'Limit param is not correct.',
	//     'OfferController',
	//   );
	// }
	// const tracks = await this.offerService.find(limit, userId);
	// const responseData = fillDTO(FullOfferRDO, offers);
	// res.ok(res, responseData);
	//   try {
	//     res.json(items);
	//   } catch (error) {
	//     next(error);
	//   }
}

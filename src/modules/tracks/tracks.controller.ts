import type { Request, Response } from 'express';
import { BaseController } from '../../common/base.controller.js';
// import type { LoggerService } from '../../logger/logger.service.js';
// import { HTTPError } from '../../errors/httpError.class.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types/types.js';
import type { ILogger } from '../../logger/logger.interface.js';
import 'reflect-metadata';
import type { ITrackController } from './tracks.controller.interface.js';
import { TrackEntity } from './track.entity.js';
import type { ITrackService } from './tracks.service.interface.js';
import { ValidateMiddleware } from '../../common/validate.middleware.js';

@injectable()
export class TrackController extends BaseController implements ITrackController {
	constructor(
		@inject(TYPES.ILogger) private readonly loggerService: ILogger,
		@inject(TYPES.ITrackService) private readonly trackService: ITrackService,
	) {
		super(loggerService);
		this.bindRoutes([
			// middlewares: [new ValidateMiddleware(dto)]
			{ path: '/', method: 'get', func: this.getTracks },
			{ path: '/load', method: 'get', func: this.loadTracks },
			// experimental
			{ path: '/:id', method: 'delete', func: this.deleteTracks },
		]);
	}

	async getTracks(req: Request, res: Response): Promise<void> {
		// Request<{}, {}, DTO>
		// console.log('getTracks');
		const result = await this.trackService.index();
		this.ok(res, result);
		// next(new HTTPError(404, 'Ошибка', 'getTracks'));
	}

	// TODO: Приватный запрос
	async loadTracks(req: Request, res: Response): Promise<void> {
		// const newTrack = new Track();
		await this.trackService.load();
		this.ok(res, 'loadTracks');
	}

	// experimental
	// TODO: Приватный запрос
	deleteTracks(req: Request, res: Response): void {
		this.ok(res, 'deleteTracks');
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

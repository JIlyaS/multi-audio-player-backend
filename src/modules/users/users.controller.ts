import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller.js';
import { TYPES } from '../../types/types.js';
import type { IUserController } from './users.controller.interface.js';
import type { ILogger } from '../../logger/logger.interface.js';
import type { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../../errors/httpError.class.js';
import { UserLoginDto } from './dto/login-user.dto.js';
import { UserRegisterDto } from './dto/register-user.dto.js';
import { UserEntity } from './user.entity.js';
import type { UserService } from './users.service.js';
import { ValidateMiddleware } from '../../common/validate.middleware.js';
import type { ConfigService } from '../../config/config.service.js';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.ConfigService) private configService: ConfigService,
	) {
		super(loggerService, 'users');
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
		]);
	}

	async login(
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, 'Ошибка авторизации', 'login'));
		}

		const jwt = await this.userService.signJWT(
			req.body.email,
			String(this.configService.get('SECRET')),
		);
		this.ok(res, { jwt });
	}

	async register(
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}

import { inject, injectable } from 'inversify';
import pkg from 'jsonwebtoken';

import type { UserLoginDto } from './dto/user-login.dto.js';
import type { UserRegisterDto } from './dto/user-register.dto.js';
import { UserEntity } from './user.entity.js';
import type { IUserService } from './users.service.interface.js';
import { TYPES } from '../../types/types.js';
import type { IConfigService } from '../../config/config.service.interface.js';
import type { IUserRepository } from './users.repository.interface.js';
import type { UserModel } from '../../generated/prisma/client.js';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name);
		await newUser.setPassword(password);
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.userRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new UserEntity(existedUser.email, existedUser.name, existedUser.password);
		return newUser.comparePassword(password);
	}

	signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const { sign } = pkg;
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}

					resolve(token as string);
				},
			);
		});
	}
}

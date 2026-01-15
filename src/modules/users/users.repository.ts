import { inject, injectable } from 'inversify';
import type { UserModel } from '../../generated/prisma/client.js';
import type { UserEntity } from './user.entity.js';
import type { IUserRepository } from './users.repository.interface.js';
import { TYPES } from '../../types/types.js';
import type { PrismaService } from '../../database/prisma.service.js';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async create({ email, password, name }: UserEntity): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}
	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}

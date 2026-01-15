import type { UserModel } from '../../generated/prisma/client.js';
import type { UserEntity } from './user.entity.js';

export interface IUserRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}

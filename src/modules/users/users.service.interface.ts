import type { UserModel } from '../../generated/prisma/client.js';
import type { UserLoginDto } from './dto/login-user.dto.js';
import type { UserRegisterDto } from './dto/register-user.dto.js';
import type { UserEntity } from './user.entity.js';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}

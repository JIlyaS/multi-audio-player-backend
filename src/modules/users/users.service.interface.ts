import type { UserModel } from '../../generated/prisma/client.js';
import type { UserLoginDto } from './dto/user-login.dto.js';
import type { UserRegisterDto } from './dto/user-register.dto.js';
import type { UserEntity } from './user.entity.js';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}

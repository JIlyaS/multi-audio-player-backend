import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Не верно указан email' })
	public email!: string;

	@IsString({ message: 'Не указан пароль' })
	public password!: string;
}

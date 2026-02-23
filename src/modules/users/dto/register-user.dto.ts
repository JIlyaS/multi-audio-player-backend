import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Не верно указан email' })
	public email!: string;

	@IsString({ message: 'Не указан пароль' })
	public password!: string;

	@IsString({ message: 'Не указано имя' })
	public name!: string;
}

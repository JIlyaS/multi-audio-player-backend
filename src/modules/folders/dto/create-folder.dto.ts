import { IsBoolean, IsString } from 'class-validator';

export class CreateFolderDto {
	@IsString({ message: 'Не строка' })
	title!: string;

	@IsString({ message: 'Не строка' })
	name!: string;

	@IsBoolean()
	isPublic!: boolean;

	@IsBoolean()
	isGlobal!: boolean;

	@IsString()
	userId!: string | null;
}

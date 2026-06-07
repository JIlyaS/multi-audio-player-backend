import { IsBoolean, IsString } from 'class-validator';

export class UpdateFolderDto {
	id!: string;

	@IsString({ message: 'Не строка' })
	title!: string;

	@IsString({ message: 'Не строка' })
	name!: string;

	@IsBoolean()
	isPublic!: boolean;

	@IsBoolean()
	isGlobal!: boolean;
}

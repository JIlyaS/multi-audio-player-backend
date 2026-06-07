import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
	id!: string;

	@IsOptional()
	@IsString({ message: 'Не строка' })
	title?: string;

	@IsOptional()
	@IsString({ message: 'Не строка' })
	author?: string;

	@IsOptional()
	@IsString({ message: 'Не строка' })
	folderId?: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true, message: 'Каждый тег должен быть строкой' })
	tags?: string[];
}

import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistDto {
	@IsString({ message: 'Не строка' })
	title!: string;

	@IsString({ message: 'Не строка' })
	author!: string;

	@IsArray()
	trackIds!: string[];

	@IsBoolean()
	isPublic!: boolean;

	@IsOptional()
	@IsString({ message: 'Не строка' })
	folderId?: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true, message: 'Каждый тег должен быть строкой' })
	tags?: string[];

	@IsString()
	userId!: string | null;
}

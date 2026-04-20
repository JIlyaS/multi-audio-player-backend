import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePlaylistDto {
	id!: string;

	@IsString({ message: 'Не строка' })
	title!: string;

	@IsBoolean()
	isPublic!: boolean;

	@IsString({ message: 'Не строка' })
	author!: string;

	@IsArray()
	trackIds!: string[];

	@IsOptional()
	@IsArray()
	@IsString({ each: true, message: 'Каждый тег должен быть строкой' })
	tags?: string[];
}

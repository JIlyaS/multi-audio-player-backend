import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreatePlaylistDto {
	@IsString({ message: 'Не строка' })
	title!: string;

	@IsString({ message: 'Не строка' })
	author!: string;

	@IsArray()
	trackIds!: string[];

	@IsBoolean()
	isPublic!: boolean;

	@IsString()
	userId!: string | null;
}

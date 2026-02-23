import { IsArray, IsString } from 'class-validator';

export class UpdatePlaylistDto {
	id!: string;

	@IsString({ message: 'Не строка' })
	title!: string;

	@IsString({ message: 'Не строка' })
	author!: string;

	@IsArray()
	trackIds!: string[];
}

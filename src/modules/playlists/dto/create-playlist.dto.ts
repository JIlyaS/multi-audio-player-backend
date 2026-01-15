import { IsArray, IsString } from 'class-validator';

export class CreatePlaylistDto {
	@IsString({ message: 'Не строка' })
	name!: string;
	@IsArray()
	tracks!: string[];
}

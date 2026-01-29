import type { PlaylistModel } from '../../generated/prisma/client.js';
import type { CreatePlaylistDto } from './dto/create-playlist.dto.js';
import type { UpdatePlaylistDto } from './dto/update-playlist.dto.js';
import type { PlaylistEntity } from './playlist.entity.js';

export interface IPlaylistService {
	index: () => Promise<PlaylistModel[]>;
	create: (dto: CreatePlaylistDto) => Promise<PlaylistModel | null>;
	get: (id: string) => Promise<PlaylistModel | null>;
	update: (dto: UpdatePlaylistDto) => Promise<PlaylistModel | null>;
	delete: (id: string) => Promise<{ id: string }>;
}

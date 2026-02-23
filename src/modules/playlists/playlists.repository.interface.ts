import type { PlaylistModel, UserModel } from '../../generated/prisma/client.js';
import type { PlaylistEntity } from './playlist.entity.js';

export interface IPlaylistRepository {
	index: () => Promise<PlaylistModel[]>;
	get: (id: string) => Promise<PlaylistModel | null>;
	create: (playlist: PlaylistEntity) => Promise<PlaylistModel>;
	update: (id: string, playlist: PlaylistEntity) => Promise<PlaylistModel>;
	delete: (id: string) => Promise<{ id: string }>;
}

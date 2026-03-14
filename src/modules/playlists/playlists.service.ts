import { inject, injectable } from 'inversify';

import type { PlaylistModel, TrackModel } from '../../generated/prisma/client.js';
import { PlaylistEntity } from './playlist.entity.js';
import type { IPlaylistService } from './playlists.service.interface.js';
import type { IConfigService } from '../../config/config.service.interface.js';
import { TYPES } from '../../types/types.js';
import type { CreatePlaylistDto } from './dto/create-playlist.dto.js';
import type { UpdatePlaylistDto } from './dto/update-playlist.dto.js';
import type { IPlaylistRepository } from './playlists.repository.interface.js';

@injectable()
export class PlaylistService implements IPlaylistService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PlaylistRepository) private playlistRepository: IPlaylistRepository,
	) {}
	async index(): Promise<PlaylistModel[]> {
		return await this.playlistRepository.index();
	}

	async get(id: string): Promise<PlaylistModel | null> {
		return await this.playlistRepository.get(id);
	}

	async create({ title, author, trackIds }: CreatePlaylistDto): Promise<PlaylistModel | null> {
		const newPlaylist = new PlaylistEntity(title, author, trackIds);
		return await this.playlistRepository.create(newPlaylist);
	}

	async update({ id, title, author, trackIds }: UpdatePlaylistDto): Promise<PlaylistModel | null> {
		const updatePlaylist = new PlaylistEntity(title, author, trackIds);
		return await this.playlistRepository.update(id, updatePlaylist);
	}

	async delete(id: string): Promise<{ id: string }> {
		return await this.playlistRepository.delete(id);
	}
}

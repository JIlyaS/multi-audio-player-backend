import { inject, injectable } from 'inversify';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';
import { parseFile } from 'music-metadata';
import { inspect } from 'node:util';
import { v4 as uuidv4 } from 'uuid';

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
		// const port = this.configService.get('PORT');
		// console.log(port);
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

	// async load(): Promise<void> {
	// 	// try {
	// 	// 	const filesPath = path.resolve('files');
	// 	// 	const filePaths = await fsPromises.readdir(filesPath);
	// 	// 	for (const filePath of filePaths) {
	// 	// 		const metadata = await parseFile(path.resolve('files', filePath));
	// 	// 		// const fileMetadata = inspect(metadata, { showHidden: false, depth: null });
	// 	// 		const title = metadata.common?.title || '';
	// 	// 		const author = metadata.common?.artist || '';
	// 	// 		const track = new TrackEntity(title, `localhost:8000/static/${filePath}`, author, []);
	// 	// 		await this.trackRepository.create(track);
	// 	// 	}
	// 	// } catch (err) {
	// 	// 	// TODO: Вывести корректную ошибку
	// 	// 	console.error(err);
	// 	// }
	// }

	async delete(id: string): Promise<{ id: string }> {
		return { id: '' };
	}
}

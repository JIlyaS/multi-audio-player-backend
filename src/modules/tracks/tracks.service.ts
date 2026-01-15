import { inject, injectable } from 'inversify';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';
import { parseFile } from 'music-metadata';
import { inspect } from 'node:util';
import { v4 as uuidv4 } from 'uuid';

import type { TrackModel } from '../../generated/prisma/client.js';
import { TrackEntity } from './track.entity.js';
import type { ITrackService } from './tracks.service.interface.js';
import type { IConfigService } from '../../config/config.service.interface.js';
import { TYPES } from '../../types/types.js';
import type { ITrackRepository } from './tracks.repository.interface.js';

@injectable()
export class TrackService implements ITrackService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.TrackRepository) private trackRepository: ITrackRepository,
	) {}
	async index(): Promise<TrackModel[]> {
		// const port = this.configService.get('PORT');
		// console.log(port);
		return await this.trackRepository.index();
	}

	async load(): Promise<void> {
		try {
			const filesPath = path.resolve('files');

			const filePaths = await fsPromises.readdir(filesPath);

			for (const filePath of filePaths) {
				const metadata = await parseFile(path.resolve('files', filePath));
				// const fileMetadata = inspect(metadata, { showHidden: false, depth: null });
				const title = metadata.common?.title || '';
				const author = metadata.common?.artist || '';
				const track = new TrackEntity(title, `localhost:8000/static/${filePath}`, author, []);
				await this.trackRepository.create(track);
			}
		} catch (err) {
			// TODO: Вывести корректную ошибку
			console.error(err);
		}
	}

	async delete(id: string): Promise<{ id: string }> {
		return { id: '' };
	}
}

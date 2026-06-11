import type { Request } from 'express';
import { inject, injectable } from 'inversify';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';
import { parseFile } from 'music-metadata';

import type { TrackModel } from '../../generated/prisma/client.js';
import { TrackEntity } from './track.entity.js';
import type { ITrackService } from './tracks.service.interface.js';
import type { IConfigService } from '../../config/config.service.interface.js';
import { TYPES } from '../../types/types.js';
import type { ITrackRepository } from './tracks.repository.interface.js';
import {
	DEFAULT_HOST,
	DEFAULT_PORT,
	DEFAULT_PROTOCOL,
	DEFAULT_STATIC_DIRECTORY_PATH,
} from '../../common/base.constants.js';
import { getFileName, getFileNameTrack } from './tracks.utils.js';
import type { UpdateTrackDto } from './dto/update-track.dto.js';

@injectable()
export class TrackService implements ITrackService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.TrackRepository) private trackRepository: ITrackRepository,
	) {}
	async index(): Promise<TrackModel[]> {
		return await this.trackRepository.index();
	}

	async load(req: Request): Promise<void> {
		try {
			const tracks = await this.trackRepository.index();

			const port = this.configService.get('PORT') || DEFAULT_PORT;
			const host = this.configService.get('HOST') || DEFAULT_HOST;
			// TODO: Не верно, нужно чтобы открывалось по https:// протоколу из req.protocol
			const protocol = this.configService.get('PROTOCOL') || DEFAULT_PROTOCOL;

			const staticDirectoryPath =
				String(this.configService.get('STATIC_DIRECTORY_PATH')) || DEFAULT_STATIC_DIRECTORY_PATH;

			const filesPath = path.resolve('files');

			const filePaths = await fsPromises.readdir(filesPath);

			// INFO: Валидация файлов в папке files - возможность добавлять только mp3 файлы
			const validateFilePaths = filePaths.filter((filePath) => {
				const index = filePath.lastIndexOf('.');
				return filePath.slice(index + 1).includes('mp3');
			});

			for (const filePath of validateFilePaths) {
				const metadata = await parseFile(path.resolve('files', filePath));
				// const fileMetadata = inspect(metadata, { showHidden: false, depth: null });
				const title = metadata.common?.title || getFileName(filePath);
				const author = metadata.common?.artist || 'Неизвестно';
				const isTrack = tracks.some((track) => track.title === title);

				if (!isTrack) {
					const track = new TrackEntity(
						title,
						host === 'localhost'
							? `${protocol}://${host}:${port}/${staticDirectoryPath}/${filePath}`
							: `${protocol}://${host}/${staticDirectoryPath}/${filePath}`,
						author,
						[],
					);
					await this.trackRepository.create(track);
				}
			}

			// INFO: Удаление треков из БД, если их нет в файловой системе
			for (const track of tracks) {
				if (!filePaths.includes(getFileNameTrack(track.link))) {
					await this.trackRepository.delete(track.id);
				}
			}
		} catch (err) {
			// TODO: Вывести корректную ошибку
			console.error(err);
		}
	}

	async get(id: string): Promise<TrackModel | null> {
		return await this.trackRepository.get(id);
	}

	// TODO: Доработать обновление треков по всем параметрам + сделать все параметры по умолчанию
	async update({ id, title, author, tags, folderId }: UpdateTrackDto): Promise<TrackModel | null> {
		// const updateTrack = new TrackEntity(title, '', author, tags, folderId);
		return await this.trackRepository.update(id, { folderId: folderId || null });
	}

	async delete(id: string): Promise<{ id: string }> {
		return await this.trackRepository.delete(id);
	}
}

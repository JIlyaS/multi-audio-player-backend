import { inject, injectable } from 'inversify';

import type { FolderModel } from '../../generated/prisma/client.js';
import { FolderEntity } from './folder.entity.js';
import type { IFolderService } from './folders.service.interface.js';
import type { IConfigService } from '../../config/config.service.interface.js';
import { TYPES } from '../../types/types.js';
import type { CreateFolderDto } from './dto/create-folder.dto.js';
import type { UpdateFolderDto } from './dto/update-folder.dto.js';
import type { IFolderRepository } from './folders.repository.interface.js';

@injectable()
export class FolderService implements IFolderService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.FolderRepository) private folderRepository: IFolderRepository,
	) {}
	async index(global: boolean): Promise<FolderModel[]> {
		return await this.folderRepository.index(global);
	}

	async get(id: string): Promise<FolderModel | null> {
		return await this.folderRepository.get(id);
	}

	async create({
		title,
		name,
		isPublic,
		isGlobal,
		userId,
	}: CreateFolderDto): Promise<FolderModel | null> {
		const newFolder = new FolderEntity(title, name, isPublic, isGlobal, userId);
		return await this.folderRepository.create(newFolder);
	}

	async update({
		id,
		title,
		name,
		isPublic,
		isGlobal,
	}: UpdateFolderDto): Promise<FolderModel | null> {
		const updateFolder = new FolderEntity(title, name, isPublic, isGlobal, null);
		return await this.folderRepository.update(id, updateFolder);
	}

	async delete(id: string): Promise<{ id: string }> {
		return await this.folderRepository.delete(id);
	}
}

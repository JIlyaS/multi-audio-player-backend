import type { FolderModel } from '../../generated/prisma/client.js';
import type { CreateFolderDto } from './dto/create-folder.dto.js';
import type { UpdateFolderDto } from './dto/update-folder.dto.js';

export interface IFolderService {
	index: (global: boolean) => Promise<FolderModel[]>;
	create: (dto: CreateFolderDto) => Promise<FolderModel | null>;
	get: (id: string) => Promise<FolderModel | null>;
	update: (dto: UpdateFolderDto) => Promise<FolderModel | null>;
	delete: (id: string) => Promise<{ id: string }>;
}

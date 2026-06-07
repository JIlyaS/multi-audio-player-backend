import type { FolderModel } from '../../generated/prisma/client.js';
import type { FolderEntity } from './folder.entity.js';

export interface IFolderRepository {
	index: (global: boolean) => Promise<FolderModel[]>;
	get: (id: string) => Promise<FolderModel | null>;
	create: (folder: FolderEntity) => Promise<FolderModel>;
	update: (id: string, folder: FolderEntity) => Promise<FolderModel>;
	delete: (id: string) => Promise<{ id: string }>;
}

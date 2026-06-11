import { inject, injectable } from 'inversify';
import type { FolderModel } from '../../generated/prisma/client.js';
import type { PrismaService } from '../../database/prisma.service.js';
import { TYPES } from '../../types/types.js';
import type { FolderEntity } from './folder.entity.js';
import type { IFolderRepository } from './folders.repository.interface.js';

@injectable()
export class FolderRepository implements IFolderRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async index(global: boolean): Promise<FolderModel[]> {
		// TODO: Переделать
		let params = {};

		if (global) {
			params = {
				where: {
					isGlobal: global,
				},
				omit: {
					userId: true,
				},
			};
		}
		// TODO: Переделать
		return this.prismaService.client.folderModel.findMany(params);
	}

	async create({ title, name, isPublic, isGlobal, userId }: FolderEntity): Promise<FolderModel> {
		return this.prismaService.client.folderModel.create({
			data: {
				title,
				name,
				isPublic,
				isGlobal,
				userId,
			},
		});
	}

	async get(id: string): Promise<FolderModel | null> {
		return this.prismaService.client.folderModel.findFirst({
			where: { id },
		});
	}

	async update(
		id: string,
		{ title, name, isPublic, isGlobal }: FolderEntity,
	): Promise<FolderModel> {
		return this.prismaService.client.folderModel.update({
			where: { id },
			data: {
				title,
				name,
				isPublic,
				isGlobal,
			},
		});
	}

	async delete(id: string): Promise<{ id: string }> {
		return this.prismaService.client.folderModel.delete({
			where: { id },
		});
	}
}

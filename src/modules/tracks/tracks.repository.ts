import { inject, injectable } from 'inversify';
import type { TrackModel } from '../../generated/prisma/client.js';
import type { ITrackRepository } from './tracks.repository.interface.js';
import type { PrismaService } from '../../database/prisma.service.js';
import { TYPES } from '../../types/types.js';
import type { TrackEntity } from './track.entity.js';

@injectable()
export class TracksRepository implements ITrackRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async index(): Promise<TrackModel[]> {
		return this.prismaService.client.trackModel.findMany({
			include: {
				folder: true,
			},
			orderBy: {
				title: 'asc',
			},
		});
	}
	async create({ title, link, author, type, tags, folderId }: TrackEntity): Promise<TrackModel> {
		return this.prismaService.client.trackModel.create({
			data: {
				title,
				link,
				author,
				type,
				tags,
				folderId,
			},
		});
	}

	// TODO: Обновление треков исправить
	async update(id: string, { folderId }: { folderId: string | null }): Promise<TrackModel> {
		return this.prismaService.client.trackModel.update({
			where: { id },
			data: {
				// title,
				// author,
				folderId,
				// tags,
			},
		});
	}

	async createMany(tracks: TrackEntity[]): Promise<TrackModel[]> {
		return await this.prismaService.client.$transaction(
			tracks.map((track) =>
				this.prismaService.client.trackModel.create({
					data: {
						title: track.title,
						link: track.link,
						author: track.author,
						type: track.type,
						tags: track.tags,
						folderId: track.folderId,
					},
				}),
			),
		);
	}

	async get(id: string): Promise<TrackModel | null> {
		return this.prismaService.client.trackModel.findFirst({
			where: { id },
		});
	}

	async delete(id: string): Promise<{ id: string }> {
		return this.prismaService.client.trackModel.delete({
			where: { id },
		});
	}

	async deleteMany(): Promise<{ count: number }> {
		return this.prismaService.client.trackModel.deleteMany({});
	}
}

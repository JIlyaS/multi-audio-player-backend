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
		return this.prismaService.client.trackModel.findMany();
	}
	async create({ title, link, author }: TrackEntity): Promise<TrackModel> {
		return this.prismaService.client.trackModel.create({
			data: {
				title,
				link,
				author,
			},
		});
	}

	// experimental
	async createMany(tracks: TrackEntity[]): Promise<TrackModel[]> {
		// const trackList = await this.prismaService.client.track.createMany({
		// 	data: tracks,
		// 	skipDuplicates: true,
		// });

		// return trackList;

		return await this.prismaService.client.$transaction(
			tracks.map((track) =>
				this.prismaService.client.trackModel.create({
					data: {
						title: track.title,
						link: track.link,
						author: track.author,
					},
				}),
			),
		);
	}

	// experimental
	async delete(id: string): Promise<{ id: string }> {
		return this.prismaService.client.trackModel.delete({
			where: { id },
		});
	}

	// // experimental
	// async deleteMany(id: string[]): Promise<{ id: string[] }> {
	// 	return this.prismaService.client.track.deleteMany({
	// 		where: { id },
	// 	});
	// }
}

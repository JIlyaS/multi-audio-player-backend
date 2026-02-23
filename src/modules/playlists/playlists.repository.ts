import { inject, injectable } from 'inversify';
import type { PlaylistModel } from '../../generated/prisma/client.js';
import type { PrismaService } from '../../database/prisma.service.js';
import { TYPES } from '../../types/types.js';
import type { PlaylistEntity } from './playlist.entity.js';
import type { IPlaylistRepository } from './playlists.repository.interface.js';

@injectable()
export class PlaylistRepository implements IPlaylistRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async index(): Promise<PlaylistModel[]> {
		return this.prismaService.client.playlistModel.findMany({
			include: {
				tracks: true,
			},
		});
	}

	async create({ title, author, type, trackIds }: PlaylistEntity): Promise<PlaylistModel> {
		const trackIdList = trackIds.map((trackId) => ({ id: trackId }));
		return this.prismaService.client.playlistModel.create({
			data: {
				title,
				author,
				type,
				tracks: {
					connect: trackIdList,
				},
			},
			include: {
				tracks: true,
			},
		});
	}

	async get(id: string): Promise<PlaylistModel | null> {
		return this.prismaService.client.playlistModel.findFirst({
			where: { id },
			include: {
				tracks: true,
			},
		});
	}

	async update(
		id: string,
		{ title, author, type, trackIds }: PlaylistEntity,
	): Promise<PlaylistModel> {
		const trackIdList = trackIds.map((trackId) => ({ id: trackId }));
		return this.prismaService.client.playlistModel.update({
			where: { id },
			data: {
				title,
				author,
				type,
				tracks: {
					set: trackIdList,
				},
			},
			include: {
				tracks: true,
			},
		});
	}

	// private
	async delete(id: string): Promise<{ id: string }> {
		return this.prismaService.client.playlistModel.delete({
			where: { id },
		});
	}
}

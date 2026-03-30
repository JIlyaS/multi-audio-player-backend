import type { TrackModel } from '../../generated/prisma/client.js';
import type { TrackEntity } from './track.entity.js';

export interface ITrackRepository {
	index: () => Promise<TrackModel[]>;
	get: (id: string) => Promise<TrackModel | null>;
	create: (track: TrackEntity) => Promise<TrackModel>;
	delete: (id: string) => Promise<{ id: string }>;
	deleteMany: () => Promise<{ count: number }>;
}

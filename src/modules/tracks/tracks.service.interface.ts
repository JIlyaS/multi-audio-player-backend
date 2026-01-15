import type { TrackModel } from '../../generated/prisma/client.js';
import type { TrackEntity } from './track.entity.js';

export interface ITrackService {
	index: () => Promise<TrackModel[]>;
	load: () => Promise<void>;
	delete: (id: string) => Promise<{ id: string }>;
}

import type { Request } from 'express';
import type { TrackModel } from '../../generated/prisma/client.js';

export interface ITrackService {
	index: () => Promise<TrackModel[]>;
	get: (id: string) => Promise<TrackModel | null>;
	load: (req: Request) => Promise<void>;
	delete: (id: string) => Promise<{ id: string }>;
}

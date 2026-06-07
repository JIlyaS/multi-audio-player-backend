import type { Request } from 'express';
import type { TrackModel } from '../../generated/prisma/client.js';
import type { UpdateTrackDto } from './dto/update-track.dto.js';

export interface ITrackService {
	index: () => Promise<TrackModel[]>;
	get: (id: string) => Promise<TrackModel | null>;
	update: (dto: UpdateTrackDto) => Promise<TrackModel | null>;
	load: (req: Request) => Promise<void>;
	delete: (id: string) => Promise<{ id: string }>;
}

import type { Request, Response, NextFunction } from 'express';
import type { UpdatePlaylistDto } from './dto/update-playlist.dto.js';

export interface IPlaylistController {
	getPlaylists: (req: Request, res: Response, next: NextFunction) => void;
	getPlaylist: (req: Request, res: Response, next: NextFunction) => void;
	createPlaylist: (req: Request, res: Response, next: NextFunction) => void;
	updatePlaylist: (
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		req: Request<{ id: string }, {}, UpdatePlaylistDto>,
		res: Response,
		next: NextFunction,
	) => void;
	deletePlaylist: (req: Request, res: Response, next: NextFunction) => void;
}

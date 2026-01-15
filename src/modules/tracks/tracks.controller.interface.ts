import type { Request, Response, NextFunction } from 'express';

export interface ITrackController {
	getTracks: (req: Request, res: Response, next: NextFunction) => void;
	loadTracks: (req: Request, res: Response, next: NextFunction) => void;
	deleteTracks: (req: Request, res: Response, next: NextFunction) => void;
}

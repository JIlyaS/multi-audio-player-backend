import type { Request, Response, NextFunction } from 'express';
import type { UpdateFolderDto } from './dto/update-folder.dto.js';
import type { CreateFolderDto } from './dto/create-folder.dto.js';

export interface IFolderController {
	getFolders: (req: Request, res: Response, next: NextFunction) => void;
	getFolder: (req: Request, res: Response, next: NextFunction) => void;
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	createFolder: (req: Request<{}, {}, CreateFolderDto>, res: Response, next: NextFunction) => void;
	updateFolder: (
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		req: Request<{ id: string }, {}, UpdateFolderDto>,
		res: Response,
		next: NextFunction,
	) => void;
	deleteFolder: (req: Request, res: Response, next: NextFunction) => void;
}

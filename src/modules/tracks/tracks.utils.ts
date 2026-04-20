import path from 'path';

export const getFileName = (fileName: string): string => {
	const normalizeFileName = path.normalize(fileName);
	const index = normalizeFileName.lastIndexOf('.');
	return normalizeFileName.slice(0, index) || 'Неизвестно';
};

export const getFileNameTrack = (trackLink: string): string => {
	const index = trackLink.lastIndexOf('/');
	return trackLink.slice(index + 1);
};

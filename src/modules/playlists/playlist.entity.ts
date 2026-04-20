export class PlaylistEntity {
	private _type: string;
	constructor(
		private _title: string,
		private _isPublic: boolean,
		private _author?: string,
		private _trackIds?: string[],
		private _tags?: string[],
		private _userId?: string | null,
	) {
		this._type = 'playlist';
	}

	get title(): string {
		return this._title;
	}

	set title(title: string) {
		this._title = title;
	}

	set isPublic(isPublic: boolean) {
		this._isPublic = isPublic;
	}

	get isPublic(): boolean {
		return this._isPublic;
	}

	set userId(userId: string | null) {
		this._userId = userId;
	}

	get userId(): string | null {
		return this._userId || null;
	}

	get author(): string {
		return this._author || '';
	}

	set author(author: string) {
		this._author = author;
	}

	get trackIds(): string[] {
		return this._trackIds || [];
	}

	get type(): string {
		return this._type;
	}

	set playlists(playlists: string[]) {
		this._trackIds = playlists;
	}

	get tags(): string[] {
		return this._tags || [];
	}

	set tags(tags: string[]) {
		this._tags = tags;
	}
}

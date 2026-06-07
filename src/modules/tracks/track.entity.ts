export class TrackEntity {
	private _type: string;

	constructor(
		private _title: string,
		private _link: string,
		private _author: string,
		private _tags: string[] = [],
		private _folderId?: string | null,
		private _playlists?: string[],
	) {
		this._type = 'track';
	}

	get title(): string {
		return this._title;
	}

	set title(title: string) {
		this._title = title;
	}

	get link(): string {
		return this._link;
	}

	set link(link: string) {
		this._link = link;
	}

	get author(): string {
		return this._author;
	}

	set author(author: string) {
		this._author = author;
	}

	get tags(): string[] {
		return this._tags;
	}

	set tags(tags: string[]) {
		this._tags = tags;
	}

	get type(): string {
		return this._type;
	}

	set folderId(folderId: string | null) {
		this._folderId = folderId;
	}

	get folderId(): string | null {
		return this._folderId || null;
	}

	set playlists(playlists: string[]) {
		this._playlists = playlists;
	}

	get playlists(): string[] {
		return this._playlists || [];
	}
}

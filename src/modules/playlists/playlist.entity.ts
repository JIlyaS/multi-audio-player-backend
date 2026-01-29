export class PlaylistEntity {
	private _type: string;
	constructor(
		private _title: string,
		private _author?: string,
		private _trackIds?: string[],
	) {
		this._type = 'playlist';
	}

	get title(): string {
		return this._title;
	}

	set title(title: string) {
		this._title = title;
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
}

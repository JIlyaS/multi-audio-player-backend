export class FolderEntity {
	constructor(
		private _title: string,
		private _name: string,
		private _isPublic: boolean,
		private _isGlobal: boolean,
		private _userId?: string | null,
	) {}

	get title(): string {
		return this._title;
	}

	set title(title: string) {
		this._title = title;
	}

	get name(): string {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
	}

	set isPublic(isPublic: boolean) {
		this._isPublic = isPublic;
	}

	get isPublic(): boolean {
		return this._isPublic;
	}

	set isGlobal(isGlobal: boolean) {
		this._isGlobal = isGlobal;
	}

	get isGlobal(): boolean {
		return this._isGlobal;
	}

	set userId(userId: string | null) {
		this._userId = userId;
	}

	get userId(): string | null {
		return this._userId || null;
	}
}

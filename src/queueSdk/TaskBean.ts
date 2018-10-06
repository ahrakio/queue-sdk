

export class TaskBean {

	private _isTaskExist;
	private _className;
	private _fileName;

	constructor( isTaskExist, className, fileName) {
		this._isTaskExist = isTaskExist;
		this._className = className;
		this._fileName = fileName;
	}

	get isTaskExist() {
		return this._isTaskExist;
	}

	get className() {
		return this._className;
	}

	get fileName() {
		return this._fileName;
	}

}

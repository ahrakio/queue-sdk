export class TaskBean {
	get options() {
		return this._options;
	}

	private _isTaskExist;
	private _className;
	private _fileName;
	private _options;

	constructor(isTaskExist, className, fileName, options = {}) {
		this._isTaskExist = isTaskExist;
		this._className = className;
		this._fileName = fileName;
		this._options = options;
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

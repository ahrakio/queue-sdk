import {sep} from "path";


export class Consts {
	static get taskZipPath(): string {
		return this._taskZipPath;
	}
	static get taskZipName(): string {
		return this._taskZipName;
	}

	static get taskWorkingDir(): string {
		return this._taskWorkingDir;
	}

	private static readonly _taskWorkingDir = process.cwd() + sep + 'queue';
	private static readonly _taskZipName = 'taskZip.zip';
	private static readonly _taskZipPath = process.cwd() + sep + Consts.taskZipName;

}

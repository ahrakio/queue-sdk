import {Task} from "../Task";
import {Utils} from "./Utils";


export class TaskCacheImple {

	private static instance;
	private map = new Map<string, boolean>();

	public static getInstance(): TaskCacheImple {
		if (!this.instance) {
			this.instance = new TaskCacheImple()
		}
		return this.instance;
	}

	private constructor() {
	}

	addTask(task: Task): void {
		const path = this.getTaskPath(task);
		if (path) {
			this.map.set(path, true);
		}
	}

	removeTask(task: Task) {
		const path = this.getTaskPath(task);
		if (path) {
			this.map.delete(path)
		}
	}

	private getTaskPath(task: Task) {
		const name = task.fileName;
		if (!name) {
			console.log('missing @task annotation');
			return;
		}
		return Utils.findFile(name);
	}

	checkTask(task: Task): boolean {
		if (!task.fileName) {
			return false
		}
		const path = Utils.findFile(task.fileName);
		return path !== null && this.map.has(path);
	}
}

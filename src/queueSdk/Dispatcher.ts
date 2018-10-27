import {Task} from "../Task";
import {Compiler} from "./Compiler";
import {WebpackCompiler} from "./WebpackCompiler";
import {TaskHandler} from "./TaskHandler";
import {QueueApiImpl} from "./QueueApiImpl";
import {TaskBean} from "./TaskBean";
import {Consts} from "./Consts";
import {TaskCacheImple} from "./TaskCacheImpl";
import {ConnectionInfoBean} from "./ConnectionInfoBean";

export class Dispatcher {

	private compiler: Compiler;
	private connection: ConnectionInfoBean;

	constructor(connection: ConnectionInfoBean) {
		this.compiler = new WebpackCompiler();
		this.connection = connection;
	}

	private compileAndSendTask(task: Task, taskExist) {
		let promise = this.compiler.compile(task);
		if (promise) {
			promise.then((success: Boolean) => {
				if (success) {
					TaskHandler.createZip(Consts.taskZipPath, Consts.taskWorkingDir)
						.then(success => {
							if (success) {
								try {
									QueueApiImpl.sendTask(Consts.taskZipPath, new TaskBean(taskExist, task.constructor.name, task.fileName), task, this.connection);
									TaskHandler.cleanFiles();
								} catch (e) {
									console.log('failed to clean files');
								}
							}
						}).catch(err => {
						console.log('failed to create zip file');
						TaskHandler.cleanFiles();
					});
				}
			}).catch(error => {
				console.log('failed to compile class')
			})
		}
	}

	private sendTask(task: Task, taskExist) {
		QueueApiImpl.sendTask(Consts.taskZipPath, new TaskBean(taskExist, task.constructor.name, task.fileName), task, this.connection);
		TaskHandler.cleanFiles();
	}

	public dispatch(task: Task) {
		let taskExist = TaskCacheImple.getInstance().checkTask(task);
		if (!taskExist) {
			this.compileAndSendTask(task, false);
		} else {
			this.sendTask(task, true);
		}
	}
}

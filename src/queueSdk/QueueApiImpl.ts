import {QueueApi} from "./QueueApi";
import {TaskBean} from "./TaskBean";
import {QueueApiInterface} from "./QueueApiAnotation";
import {Task} from "../Task";
import * as os from "os";
import {TaskCacheImple} from "./TaskCacheImpl";
import {ConnectionInfoBean} from "./ConnectionInfoBean";
import {sep} from "path";
import {Dispatcher} from "./Dispatcher";

const request = require('request');
const fs = require('fs');

@QueueApiInterface<QueueApi>()
export class QueueApiImpl {

	private static extractTaskFormData(path: string, taskInfo: TaskBean, task: Task) {
		return {
			taskFileName: taskInfo.fileName,
			taskClassName: taskInfo.className,
			options: JSON.stringify({
				numberOfTries: taskInfo.options.numberOfTries || 1,
				receiveFeedback: taskInfo.options.receiveFeedback || false
			}),
			serverName: os.hostname(),
			isTaskExist: taskInfo.isTaskExist.toString(),
			taskState: JSON.stringify(task),
			task_zip_file: fs.createReadStream(path),
		};
	}

	static sendTask(path: string, taskInfo: TaskBean, task: Task, connection: ConnectionInfoBean) {
		const formData = this.extractTaskFormData(path, taskInfo, task);
		const url = `${connection.remoteAddress}:${connection.remotePort}${sep}${connection.remoteHttpPath}`;
		request.post({
			url: url,
			formData: formData,
		}, function (error, response, body) {
			if (!error) {
				TaskCacheImple.getInstance().addTask(task);
			} else {
				const parsedBody = JSON.parse(body);
				console.log(error);
				if (parsedBody.reSendTask) {
					QueueApiImpl.compileAndSend(task, connection)
				}
			}
		});
	}

	private static compileAndSend(task: Task, connection: ConnectionInfoBean) {
		TaskCacheImple.getInstance().removeTask(task);
		let dispatcher = new Dispatcher(connection);
		dispatcher.dispatch(task);
	}
}

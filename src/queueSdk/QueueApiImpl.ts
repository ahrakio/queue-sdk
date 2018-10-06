import {QueueApi} from "./QueueApi";
import {TaskBean} from "./TaskBean";
import {QueueApiInterface} from "./QueueApiAnotation";
import {Task} from "../Task";
import * as os from "os";
import {TaskCacheImple} from "./TaskCacheImpl";

const request = require('request');


@QueueApiInterface<QueueApi>()
export class QueueApiImpl {

	static sendTask(path: string, taskInfo: TaskBean, task: Task) {
		let fs = require('fs');
		const formData = {
			taskFileName: taskInfo.fileName,
			taskClassName: taskInfo.className,
			serverName: os.hostname(),
			isTaskExist: taskInfo.isTaskExist.toString(),
			taskState: JSON.stringify(task),
			task_zip_file: fs.createReadStream(path),
		};
		request.post({
			url: 'http://localhost:3000/queue/addTask',
			formData: formData,
		}, function (error, response, body) {
			if (!error) {
				TaskCacheImple.getInstance().addTask(task);
			} else {
				console.log(error)
			}
		});
	}
}

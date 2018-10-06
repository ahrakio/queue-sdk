import {TaskBean} from "./TaskBean";
import {Task} from "../Task";

export interface QueueApi {
	sendTask(path: string, taskInfo: TaskBean, task: Task);
}

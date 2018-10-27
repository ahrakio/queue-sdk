import {TaskBean} from "./TaskBean";
import {Task} from "../Task";
import {ConnectionInfoBean} from "./ConnectionInfoBean";

export interface QueueApi {
	sendTask(path: string, taskInfo: TaskBean, task: Task, connection: ConnectionInfoBean);
}

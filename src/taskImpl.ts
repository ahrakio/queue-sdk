import {Task} from "./Task";
import {task} from "./queueSdk/TaskAnnotation";

var _ = require('lodash');

@task()
export class TaskImpl extends Task {

	private h = 4;
	numOfReTry = 444;

	run(): void | boolean | Promise<boolean> {
		let a = [1, 2];
		let b = [3, 4];
		let d = [5, 6, 7];
		let c = _.concat(a, b,d);
		console.log('task impl to ship ' + c);
		console.log('task impl state ' + this.numOfReTry);
	}

	test() {
		console.log('task impl test compile');
	}
}
